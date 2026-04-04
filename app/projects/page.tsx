import FeaturedCaseStudiesJsonLd from "@/components/FeaturedCaseStudiesJsonLd"
import ProjectsDynamicContent from "./ProjectsDynamicContent"
import ProjectsPageWrapper from "./ProjectsPageWrapper"
import ProjectsStaticContent from "./ProjectsStaticContent"

export default function ProjectsPage() {
  return (
    <>
      <FeaturedCaseStudiesJsonLd />
      <ProjectsPageWrapper>
        <ProjectsStaticContent />
        <ProjectsDynamicContent />
      </ProjectsPageWrapper>
    </>
  )
}
