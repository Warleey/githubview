import { Skeleton } from './Skeleton'

/**
 * Skeleton loading que espelha fielmente o layout do dashboard:
 * perfil, 4 estatísticas, linguagens e grade de repositórios.
 */
export function DashboardSkeleton() {
  return (
    <div className="space-y-6" role="status" aria-label="Carregando dados do perfil">
      <span className="sr-only">Carregando dados do perfil…</span>

      {/* Perfil */}
      <div className="rounded-3xl border border-edge bg-surface p-6 sm:p-8">
        <div className="grid gap-7 md:grid-cols-[auto_minmax(0,1fr)] md:gap-9">
          <Skeleton className="mx-auto size-32 rounded-3xl sm:size-40 md:mx-0" />
          <div className="space-y-4">
            <Skeleton className="mx-auto h-8 w-56 md:mx-0" />
            <Skeleton className="mx-auto h-4 w-32 md:mx-0" />
            <Skeleton className="mx-auto h-4 w-full max-w-lg md:mx-0" />
            <div className="flex flex-wrap justify-center gap-3 md:justify-start">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-40" />
            </div>
            <Skeleton className="mx-auto h-10 w-44 rounded-xl md:mx-0" />
          </div>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="rounded-2xl border border-edge bg-surface p-4 sm:p-5">
            <Skeleton className="mb-4 size-10 rounded-xl" />
            <Skeleton className="h-8 w-20" />
            <Skeleton className="mt-2 h-3 w-24" />
          </div>
        ))}
      </div>

      {/* Linguagens */}
      <div className="rounded-3xl border border-edge bg-surface p-5 sm:p-7">
        <div className="mb-6 flex items-center gap-3.5">
          <Skeleton className="size-10 rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-3 w-64 max-w-full" />
          </div>
        </div>
        <Skeleton className="h-2.5 w-full rounded-full" />
        <div className="mt-7 space-y-5">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between gap-4">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-12" />
              </div>
              <Skeleton className="h-2 w-full rounded-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Repositórios */}
      <div className="rounded-3xl border border-edge bg-surface p-5 sm:p-7">
        <div className="mb-6 flex items-center gap-3.5">
          <Skeleton className="size-10 rounded-xl" />
          <Skeleton className="h-5 w-52" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="rounded-2xl border border-edge bg-elevated/40 p-5">
              <Skeleton className="h-4 w-3/5" />
              <Skeleton className="mt-3 h-3 w-full" />
              <Skeleton className="mt-2 h-3 w-4/5" />
              <div className="mt-5 flex gap-3">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-3 w-12" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
