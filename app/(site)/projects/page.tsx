import FeaturedCaseStudiesJsonLd from "@/components/FeaturedCaseStudiesJsonLd"
import ProjectsDynamicContent from "@/app/projects/ProjectsDynamicContent"
import ProjectsStaticContent from "@/app/projects/ProjectsStaticContent"

export default function ProjectsPage() {
  return (
    <>
      <FeaturedCaseStudiesJsonLd />
      <ProjectsStaticContent />
      <ProjectsDynamicContent />
    </>
  )
}
