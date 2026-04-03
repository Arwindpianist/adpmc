import { BasePageSkeleton, SkeletonBlock } from "@/app/_components/loading-skeletons"

export default function Loading() {
  return (
    <BasePageSkeleton>
      <section className="pt-20 md:pt-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <SkeletonBlock className="h-24 w-full" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <SkeletonBlock className="h-80 w-full" />
            <div className="lg:col-span-2">
              <SkeletonBlock className="h-80 w-full" />
            </div>
          </div>
        </div>
      </section>
    </BasePageSkeleton>
  )
}
