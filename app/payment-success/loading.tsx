import { SkeletonBlock } from "@/app/_components/loading-skeletons"

export default function Loading() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md glassmorphism p-8 md:p-12 rounded-xl space-y-4">
        <SkeletonBlock className="h-16 w-16 rounded-full mx-auto" />
        <SkeletonBlock className="h-8 w-2/3 mx-auto" />
        <SkeletonBlock className="h-4 w-full" />
        <SkeletonBlock className="h-4 w-5/6 mx-auto" />
        <SkeletonBlock className="h-12 w-40 mx-auto" />
      </div>
    </main>
  )
}
