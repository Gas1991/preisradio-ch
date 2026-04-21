interface FaqItem {
  q: string
  a: string
}

interface Props {
  items: FaqItem[]
}

export default function FaqSection({ items }: Props) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="mt-12 pt-8 border-t border-[#E2E8F0]">
        <h2 className="font-heading text-[#003087] text-lg font-semibold mb-5">
          Häufige Fragen
        </h2>
        <div className="space-y-3">
          {items.map((item, i) => (
            <details
              key={i}
              className="group border border-[#E2E8F0] rounded-xl bg-[#F8FAFC] open:bg-white open:shadow-sm transition-all"
            >
              <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-sm font-semibold text-[#1E293B] list-none select-none">
                <span>{item.q}</span>
                <span className="ml-4 shrink-0 text-[#94A3B8] group-open:rotate-45 transition-transform text-lg leading-none">+</span>
              </summary>
              <p className="px-5 pb-4 text-sm text-[#475569] leading-relaxed">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>
    </>
  )
}
