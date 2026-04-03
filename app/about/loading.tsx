import { BasePageSkeleton, SkeletonBlock } from "@/app/_components/loading-skeletons"

export default function Loading() {
  return (
    <BasePageSkeleton>
      <section className="pt-20 md:pt-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <SkeletonBlock className="h-24 w-full" />
          <SkeletonBlock className="h-48 w-full" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SkeletonBlock className="h-44 w-full" />
            <SkeletonBlock className="h-44 w-full" />
          </div>
          <SkeletonBlock className="h-60 w-full" />
        </div>
      </section>
    </BasePageSkeleton>
  )
}
