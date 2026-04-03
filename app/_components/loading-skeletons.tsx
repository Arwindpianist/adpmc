type SkeletonProps = {
  className: string
}

export function SkeletonBlock({ className }: SkeletonProps) {
  return <div className={`animate-pulse rounded-lg bg-white/10 ${className}`} />
}

export function BasePageSkeleton({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col relative">
      <div className="absolute inset-0 z-0 bg-black" />
      <div className="relative z-10">
        <header className="px-4 sm:px-6 lg:px-8 pt-6">
          <SkeletonBlock className="h-12 w-full max-w-6xl mx-auto" />
        </header>
        {children}
        <footer className="px-4 sm:px-6 lg:px-8 pb-8 pt-12">
          <SkeletonBlock className="h-24 w-full max-w-6xl mx-auto" />
        </footer>
      </div>
    </main>
  )
}
