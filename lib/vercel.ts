interface VercelProject {
  id: string;
  name: string;
  updatedAt: number;
  accountId: string;
}

interface VercelDeployment {
  uid: string;
  name: string;
  url: string;
  state: 'READY' | 'BUILDING' | 'ERROR' | 'QUEUED' | 'CANCELED';
  target: 'production' | 'staging' | null;
  createdAt: number;
  projectId: string;
}

interface VercelDomain {
  name: string;
  projectId: string;
  verified: boolean;
}

export interface VercelProjectWithDomains extends VercelProject {
  domains: string[];
  productionUrl?: string;
}

export interface DetectedProject {
  title: string;
  description: string;
  url: string;
  detected: boolean;
  // githubUrl is not included - kept server-side only for security
}

export async function fetchVercelProjects(): Promise<VercelProjectWithDomains[]> {
  const token = process.env.VERCEL_TOKEN;

  if (!token) {
    return [];
  }

  try {
    // First, try to get teams to see if we need to fetch from specific teams
    const teamsResponse = await fetch('https://api.vercel.com/v2/teams', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    let allProjects: VercelProject[] = [];
    
    // Fetch projects from personal account (with pagination)
    let personalProjects: VercelProject[] = [];
    let personalPage = 0;
    let hasMorePersonal = true;
    
    while (hasMorePersonal) {
      const personalProjectsResponse = await fetch(`https://api.vercel.com/v9/projects?limit=100&until=${personalPage}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (personalProjectsResponse.ok) {
        const personalProjectsData = await personalProjectsResponse.json();
        const pageProjects: VercelProject[] = personalProjectsData.projects || [];
        personalProjects = [...personalProjects, ...pageProjects];
        
        // Check if there are more pages
        hasMorePersonal = pageProjects.length === 100;
        if (hasMorePersonal && pageProjects.length > 0) {
          personalPage = pageProjects[pageProjects.length - 1].updatedAt;
        } else {
          hasMorePersonal = false;
        }
      } else {
        hasMorePersonal = false;
      }
    }
    
    allProjects = [...allProjects, ...personalProjects];

    // Fetch projects from teams if available
    if (teamsResponse.ok) {
      const teamsData = await teamsResponse.json();
      const teams = teamsData.teams || [];
      
      for (const team of teams) {
        let teamProjects: VercelProject[] = [];
        let teamPage = 0;
        let hasMoreTeam = true;
        
        while (hasMoreTeam) {
          const teamProjectsResponse = await fetch(`https://api.vercel.com/v9/projects?teamId=${team.id}&limit=100&until=${teamPage}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (teamProjectsResponse.ok) {
            const teamProjectsData = await teamProjectsResponse.json();
            const pageProjects: VercelProject[] = teamProjectsData.projects || [];
            teamProjects = [...teamProjects, ...pageProjects];
            
            // Check if there are more pages
            hasMoreTeam = pageProjects.length === 100;
            if (hasMoreTeam && pageProjects.length > 0) {
              teamPage = pageProjects[pageProjects.length - 1].updatedAt;
            } else {
              hasMoreTeam = false;
            }
          } else {
            hasMoreTeam = false;
          }
        }
        
        allProjects = [...allProjects, ...teamProjects];
      }
    }

    // Remove duplicates (in case a project appears in multiple places)
    const uniqueProjects = Array.from(
      new Map(allProjects.map(p => [p.id, p])).values()
    );
    
    
    const projects = uniqueProjects;

    // For each project, fetch its domains and latest production deployment
    const projectsWithDomains = await Promise.all(
      projects.map(async (project: VercelProject) => {
        try {
          // Fetch domains for this project (try with project name first, then with project ID)
          let domainsResponse = await fetch(
            `https://api.vercel.com/v9/projects/${project.name}/domains`,
            {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            }
          );
          
          // If that fails, try with project ID
          if (!domainsResponse.ok) {
            domainsResponse = await fetch(
              `https://api.vercel.com/v9/projects/${project.id}/domains`,
              {
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
              }
            );
          }

          let domains: string[] = [];
          if (domainsResponse.ok) {
            const domainsData = await domainsResponse.json();
            // Include all domains, not just verified ones (some domains might be pending verification)
            domains = (domainsData.domains || [])
              .map((domain: VercelDomain) => domain.name);
            
          }

          // Fetch latest production deployment
          const deploymentsResponse = await fetch(
            `https://api.vercel.com/v6/deployments?projectId=${project.id}&target=production&limit=1`,
            {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            }
          );

          let productionUrl: string | undefined;
          if (deploymentsResponse.ok) {
            const deploymentsData = await deploymentsResponse.json();
            const deployments: VercelDeployment[] = deploymentsData.deployments || [];
            
            if (deployments.length > 0 && deployments[0].state === 'READY') {
              productionUrl = deployments[0].url;
            }
          } else {
            // If production deployment fails, try to get any recent deployment
            const allDeploymentsResponse = await fetch(
              `https://api.vercel.com/v6/deployments?projectId=${project.id}&limit=1`,
              {
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
              }
            );
            
            if (allDeploymentsResponse.ok) {
              const allDeploymentsData = await allDeploymentsResponse.json();
              const allDeployments: VercelDeployment[] = allDeploymentsData.deployments || [];
              
              if (allDeployments.length > 0 && allDeployments[0].state === 'READY') {
                productionUrl = allDeployments[0].url;
              }
            }
          }

          // If no custom domains, use production URL if available
          if (domains.length === 0 && productionUrl) {
            domains = [productionUrl];
          }
          
          return {
            ...project,
            domains,
            productionUrl,
          };
        } catch (error) {
          return {
            ...project,
            domains: [],
            productionUrl: undefined,
          };
        }
      })
    );

    // Filter out projects with no domains/URLs, and projects that only have vercel.app domains
    const filteredProjects = projectsWithDomains
      .filter((project) => {
        // Must have at least one domain
        if (project.domains.length === 0) return false;
        
        // Check if project has any custom domain (not just vercel.app)
        const hasCustomDomain = project.domains.some(domain => !domain.includes('.vercel.app'));
        
        // Only include if it has a custom domain
        return hasCustomDomain;
      })
      .sort((a, b) => b.updatedAt - a.updatedAt);
    
    
    return filteredProjects;
  } catch (error) {
    return [];
  }
}

function decodeHtmlEntities(text: string): string {
  const entityMap: { [key: string]: string } = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&apos;': "'",
    '&nbsp;': ' ',
    '&copy;': '©',
    '&reg;': '®',
    '&trade;': '™',
    '&hellip;': '…',
  };

  // First pass: replace named entities
  let decoded = text;
  for (const [entity, char] of Object.entries(entityMap)) {
    decoded = decoded.replace(new RegExp(entity, 'gi'), char);
  }

  // Second pass: replace numeric entities (&#123; and &#x1F;)
  decoded = decoded.replace(/&#(\d+);/g, (match, dec) => {
    return String.fromCharCode(parseInt(dec, 10));
  });
  
  decoded = decoded.replace(/&#x([0-9A-Fa-f]+);/g, (match, hex) => {
    return String.fromCharCode(parseInt(hex, 16));
  });

  return decoded;
}

async function fetchWebsiteTitle(url: string): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        },
        signal: controller.signal,
        redirect: 'follow',
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        return null;
      }

      const html = await response.text();
      
      // Try to extract Open Graph title first
      const ogTitleMatch = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']*)["'][^>]*>/i);
      if (ogTitleMatch && ogTitleMatch[1]) {
        return decodeHtmlEntities(ogTitleMatch[1].trim());
      }

      // Fallback to regular title tag
      const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
      if (titleMatch && titleMatch[1]) {
        return decodeHtmlEntities(titleMatch[1].trim());
      }

      return null;
    } catch (fetchError: any) {
      clearTimeout(timeoutId);
      return null;
    }
  } catch (error) {
    return null;
  }
}

export async function transformVercelProjectsToDetected(
  projects: VercelProjectWithDomains[],
  githubRepos?: Array<{ name: string; html_url: string; description: string | null }>
): Promise<DetectedProject[]> {
  // Process projects in parallel, fetching titles
  const detectedProjects = await Promise.all(
    projects.map(async (project) => {
      // Use the first domain as the primary URL
      const primaryDomain = project.domains[0];
      
      if (!primaryDomain) return null;

      const url = primaryDomain.startsWith('http') 
        ? primaryDomain 
        : `https://${primaryDomain}`;

      // Fetch the actual website title
      const websiteTitle = await fetchWebsiteTitle(url);
      
      // Use website title if available, otherwise fallback to project name
      const title = websiteTitle || project.name;

      // Try to find matching GitHub repository
      // Match by exact name, or by normalized name (handle hyphens, case differences)
      let githubUrl: string | undefined;
      let description = `Vercel deployment for ${project.name}`;
      
      if (githubRepos) {
        // Normalize names for matching (remove hyphens, convert to lowercase)
        const normalizeName = (name: string) => name.toLowerCase().replace(/[-_]/g, '');
        const projectNormalized = normalizeName(project.name);
        
        const matchingRepo = githubRepos.find((repo) => {
          const repoNormalized = normalizeName(repo.name);
          // Try exact match first, then normalized match
          return repo.name.toLowerCase() === project.name.toLowerCase() ||
                 repoNormalized === projectNormalized;
        });
        
        if (matchingRepo) {
          githubUrl = matchingRepo.html_url;
          description = matchingRepo.description || description;
        }
      }

      return {
        title,
        description,
        url,
        // Don't include githubUrl in response - keep it server-side only
        // githubUrl is only accessible via API after payment verification
        detected: true,
      };
    })
  );

  // Filter out null values and return
  return detectedProjects.filter((project): project is DetectedProject => project !== null);
}

