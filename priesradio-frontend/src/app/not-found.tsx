import Link from 'next/link'
import { Search, Home, ArrowRight } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#003087] flex flex-col items-center justify-center px-4 relative overflow-hidden">

      {/* Dekorative Halos */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0052CC] rounded-full blur-[140px] opacity-10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#0052CC] rounded-full blur-[120px] opacity-5 pointer-events-none" />

      <div className="relative text-center max-w-lg">

        {/* Grosse 404 */}
        <p className="font-heading text-[#0052CC]/20 text-[160px] md:text-[200px] font-bold leading-none select-none mb-0">
          404
        </p>

        <div className="-mt-8 mb-6">
          <h1 className="font-heading text-white text-2xl md:text-3xl font-bold mb-3">
            Seite nicht gefunden
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            Die gesuchte Seite existiert nicht oder wurde verschoben.<br />
            Nutzen Sie die Suche, um das Gesuchte zu finden.
          </p>
        </div>

        {/* Mini-Suchleiste */}
        <form action="/suchen" method="get" className="flex items-center bg-white/5 border border-white/10 rounded-xl overflow-hidden mb-6 max-w-sm mx-auto">
          <div className="flex items-center gap-2 flex-1 px-4">
            <Search size={15} className="text-slate-400 shrink-0" />
            <input
              type="text"
              name="q"
              placeholder="Produkt suchen..."
              className="w-full py-3 text-sm text-white placeholder:text-slate-500 outline-none bg-transparent"
            />
          </div>
          <button
            type="submit"
            className="shrink-0 bg-[#0052CC] hover:bg-[#003B9C] text-white text-xs font-semibold px-4 py-3 transition-colors"
          >
            Los
          </button>
        </form>

        {/* Aktionen */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-white text-[#003087] font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-slate-100 transition-colors"
          >
            <Home size={15} />
            Startseite
          </Link>
          <Link
            href="/kategorien"
            className="inline-flex items-center gap-2 text-[#0052CC] border border-[#0052CC]/30 hover:border-[#0052CC] px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
          >
            Alle Kategorien <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  )
}
