type SkeletonProps = {
  className: string
}

export function SkeletonBlock({ className }: SkeletonProps) {
  return <div className={`animate-pulse rounded-[1.75rem] bg-white/[0.06] ${className}`} />
}

export function BasePageSkeleton({ children }: { children: React.ReactNode }) {
  return (
    <main className="site-shell flex min-h-screen flex-col">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:120px_120px] opacity-40"
      />
      <div className="relative z-10">
        <header className="px-4 pt-4 sm:px-6 lg:px-8">
          <SkeletonBlock className="mx-auto h-16 w-full max-w-7xl rounded-[2rem]" />
        </header>
        {children}
        <footer className="px-4 pb-8 pt-10 sm:px-6 lg:px-8">
          <SkeletonBlock className="mx-auto h-52 w-full max-w-7xl rounded-[2rem]" />
        </footer>
      </div>
    </main>
  )
}
