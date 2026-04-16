interface PageHeroProps {
  surtitre?: string
  titre: string
  sousTitre?: string
}

export default function PageHero({ surtitre, titre, sousTitre }: PageHeroProps) {
  return (
    <section className="bg-[#0F172A] py-12 px-4 relative overflow-hidden">
      {/* Halo subtil */}
      <div className="absolute -top-20 right-0 w-72 h-72 bg-[#F97316] rounded-full blur-[100px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {surtitre && (
          <p className="text-[#F97316] text-xs font-semibold uppercase tracking-widest mb-2">
            {surtitre}
          </p>
        )}
        <h1 className="font-heading text-white text-3xl md:text-4xl font-bold">
          {titre}
        </h1>
        {sousTitre && (
          <p className="text-slate-400 mt-2 text-sm md:text-base">{sousTitre}</p>
        )}
      </div>
    </section>
  )
}
