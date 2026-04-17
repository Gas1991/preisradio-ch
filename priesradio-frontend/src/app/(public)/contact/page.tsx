import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import PageHero from '@/components/ui/PageHero'
import { MessageSquare, Send, CheckCircle } from 'lucide-react'
import { transporter, CONTACT_EMAIL } from '@/lib/mail'

export const metadata: Metadata = {
  title: 'Kontakt | Priesradio',
  description: 'Kontaktieren Sie das Priesradio-Team bei Fragen.',
}

async function sendContact(formData: FormData) {
  'use server'
  const nom = formData.get('nom')?.toString().trim() ?? ''
  const email = formData.get('email')?.toString().trim() ?? ''
  const sujet = formData.get('sujet')?.toString().trim() ?? ''
  const message = formData.get('message')?.toString().trim() ?? ''

  if (nom && email && sujet && message) {
    try {
      await transporter.sendMail({
        from: CONTACT_EMAIL,
        to: CONTACT_EMAIL,
        replyTo: email,
        subject: sujet,
        text: `Nachricht von ${nom} <${email}>:\n\n${message}`,
      })
    } catch {}
  }
  redirect('/contact?sent=1')
}

interface Props {
  searchParams: Promise<{ sent?: string }>
}

export default async function KontaktPage({ searchParams }: Props) {
  const { sent } = await searchParams

  return (
    <div>
      <PageHero
        surtitre="Support"
        titre="Kontakt"
        sousTitre="Eine Frage? Ein Vorschlag? Wir antworten schnell."
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Kontaktinfo */}
          <div className="space-y-4">
            {[
              { icon: MessageSquare, titel: 'Antwort', wert: 'Innerhalb 12 Std.' },
            ].map(({ icon: Icon, titel, wert }) => (
              <div key={titel} className="flex items-start gap-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4">
                <div className="w-9 h-9 rounded-xl bg-[#0052CC]/10 flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-[#0052CC]" />
                </div>
                <div>
                  <p className="text-xs text-[#64748B] mb-0.5">{titel}</p>
                  <p className="font-semibold text-[#003087] text-sm">{wert}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Formular */}
          <div className="md:col-span-2">
            {sent === '1' ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle size={48} className="text-green-500 mb-4" />
                <p className="font-heading text-[#003087] text-xl font-semibold mb-1">Nachricht gesendet!</p>
                <p className="text-[#64748B] text-sm">Wir antworten innerhalb von 24 Stunden.</p>
                <a href="/contact" className="mt-6 text-sm text-[#0052CC] font-semibold hover:underline">Weitere Nachricht senden</a>
              </div>
            ) : (
              <form action={sendContact} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1E293B] uppercase tracking-wide mb-1.5">Name</label>
                    <input type="text" name="nom" required
                      className="w-full border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm text-[#1E293B] placeholder:text-[#64748B] focus:outline-none focus:border-[#0052CC] focus:ring-1 focus:ring-[#0052CC]/20 transition-colors"
                      placeholder="Ihr Name" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1E293B] uppercase tracking-wide mb-1.5">E-Mail</label>
                    <input type="email" name="email" required
                      className="w-full border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm text-[#1E293B] placeholder:text-[#64748B] focus:outline-none focus:border-[#0052CC] focus:ring-1 focus:ring-[#0052CC]/20 transition-colors"
                      placeholder="ihre@email.ch" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1E293B] uppercase tracking-wide mb-1.5">Betreff</label>
                  <input type="text" name="sujet" required
                    className="w-full border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm text-[#1E293B] placeholder:text-[#64748B] focus:outline-none focus:border-[#0052CC] focus:ring-1 focus:ring-[#0052CC]/20 transition-colors"
                    placeholder="Betreff Ihrer Nachricht" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1E293B] uppercase tracking-wide mb-1.5">Nachricht</label>
                  <textarea name="message" rows={5} required
                    className="w-full border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm text-[#1E293B] placeholder:text-[#64748B] focus:outline-none focus:border-[#0052CC] focus:ring-1 focus:ring-[#0052CC]/20 transition-colors resize-none"
                    placeholder="Beschreiben Sie Ihr Anliegen..." />
                </div>
                <button type="submit"
                  className="inline-flex items-center gap-2 bg-[#0052CC] hover:bg-[#003B9C] text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm">
                  <Send size={14} />
                  Nachricht senden
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
