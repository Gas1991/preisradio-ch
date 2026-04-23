'use client'

import { useRef, useEffect, useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const COLLAPSED_HEIGHT = 260 // px ≈ 10 lignes

interface Props {
  html: string
}

export default function SpecSection({ html }: Props) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [needsToggle, setNeedsToggle] = useState(false)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    if (contentRef.current) {
      setNeedsToggle(contentRef.current.scrollHeight > COLLAPSED_HEIGHT)
    }
  }, [html])

  return (
    <div>
      <div
        ref={contentRef}
        className="spec-html bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 overflow-x-auto transition-all duration-300"
        style={
          needsToggle && !expanded
            ? { maxHeight: COLLAPSED_HEIGHT, overflow: 'hidden' }
            : undefined
        }
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {needsToggle && (
        <button
          onClick={() => setExpanded(v => !v)}
          className="mt-2 flex items-center gap-1.5 text-sm text-[#0052CC] font-semibold hover:underline"
        >
          {expanded ? (
            <><ChevronUp size={15} /> Weniger anzeigen</>
          ) : (
            <><ChevronDown size={15} /> Mehr anzeigen</>
          )}
        </button>
      )}
    </div>
  )
}
