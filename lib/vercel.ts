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
  githubUrl?: string;
  detected: boolean;
}

export async function fetchVercelProjects(): Promise<VercelProjectWithDomains[]> {
  const token = process.env.VERCEL_TOKEN;

  if (!token) {
    console.warn('VERCEL_TOKEN not set. Skipping Vercel projects.');
    return [];
  }

  try {
    // Fetch all projects
    const projectsResponse = await fetch('https://api.vercel.com/v9/projects', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!projectsResponse.ok) {
      console.error('Failed to fetch Vercel projects:', projectsResponse.statusText);
      return [];
    }

    const projectsData = await projectsResponse.json();
    const projects: VercelProject[] = projectsData.projects || [];

    // For each project, fetch its domains and latest production deployment
    const projectsWithDomains = await Promise.all(
      projects.map(async (project: VercelProject) => {
        try {
          // Fetch domains for this project
          const domainsResponse = await fetch(
            `https://api.vercel.com/v9/projects/${project.name}/domains`,
            {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            }
          );

          let domains: string[] = [];
          if (domainsResponse.ok) {
            const domainsData = await domainsResponse.json();
            domains = (domainsData.domains || [])
              .filter((domain: VercelDomain) => domain.verified)
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
          console.error(`Error fetching data for project ${project.name}:`, error);
          return {
            ...project,
            domains: [],
          };
        }
      })
    );

    // Filter out projects with no domains/URLs and sort by update date
    return projectsWithDomains
      .filter((project) => project.domains.length > 0)
      .sort((a, b) => b.updatedAt - a.updatedAt);
  } catch (error) {
    console.error('Error fetching Vercel projects:', error);
    return [];
  }
}

export function transformVercelProjectsToDetected(
  projects: VercelProjectWithDomains[],
  githubRepos?: Array<{ name: string; html_url: string; description: string | null }>
): DetectedProject[] {
  return projects.flatMap((project) => {
    // Use the first domain as the primary URL
    const primaryDomain = project.domains[0];
    
    if (!primaryDomain) return [];

    // Try to find matching GitHub repository
    let githubUrl: string | undefined;
    let description = `Vercel deployment for ${project.name}`;
    
    if (githubRepos) {
      const matchingRepo = githubRepos.find(
        (repo) => repo.name.toLowerCase() === project.name.toLowerCase()
      );
      if (matchingRepo) {
        githubUrl = matchingRepo.html_url;
        description = matchingRepo.description || description;
      }
    }

    return [
      {
        title: project.name,
        description,
        url: primaryDomain.startsWith('http') 
          ? primaryDomain 
          : `https://${primaryDomain}`,
        githubUrl,
        detected: true,
      },
    ];
  });
}

