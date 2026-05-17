import { BasePageSkeleton, SkeletonBlock } from "@/app/_components/loading-skeletons"

export default function Loading() {
  return (
    <BasePageSkeleton>
      <section className="px-4 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <SkeletonBlock className="h-[28rem] w-full" />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <SkeletonBlock className="h-64 w-full" />
            <SkeletonBlock className="h-64 w-full" />
            <SkeletonBlock className="h-64 w-full" />
          </div>
        </div>
      </section>
    </BasePageSkeleton>
  )
}
