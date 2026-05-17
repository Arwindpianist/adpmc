import { SkeletonBlock } from "@/app/_components/loading-skeletons"

export default function Loading() {
  return (
    <main className="site-shell flex min-h-screen items-center justify-center px-4 py-16">
      <div className="surface-card w-full max-w-lg rounded-[2rem] p-8 space-y-4">
        <SkeletonBlock className="mx-auto h-16 w-16 rounded-full" />
        <SkeletonBlock className="mx-auto h-8 w-2/3" />
        <SkeletonBlock className="h-4 w-full" />
        <SkeletonBlock className="mx-auto h-4 w-5/6" />
        <SkeletonBlock className="mx-auto h-12 w-40 rounded-full" />
      </div>
    </main>
  )
}
