import { useEffect, useRef, useState } from 'react'
import { MessageSquareText, Send, Sparkles, Bot, User } from 'lucide-react'
import { PageHeader, Card, Badge, Stat } from '../components/ui'
import { TUTOR_SUGGESTIONS, TUTOR_SCRIPT } from '../data/madaar'
import { cx } from '../lib/format'

type Msg = { id: number; role: 'user' | 'bot'; text: string }

let idSeq = 1

export default function AITutor() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: 0,
      role: 'bot',
      text: 'Hi! I’m the MADAAR AI Tutor 🤖 — available 24/7 for Science, Physics, Chemistry and Math. Ask me anything, or tap a suggestion below.',
    },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing])

  function send(text: string) {
    const q = text.trim()
    if (!q) return
    setMessages((m) => [...m, { id: idSeq++, role: 'user', text: q }])
    setInput('')
    setTyping(true)
    window.setTimeout(() => {
      const answer = TUTOR_SCRIPT[q] ?? TUTOR_SCRIPT.default
      setTyping(false)
      setMessages((m) => [...m, { id: idSeq++, role: 'bot', text: answer }])
    }, 900)
  }

  return (
    <div>
      <PageHeader
        kicker="Pillar 2 · Interactive STEM Learning"
        title="24/7 AI Tutor Engine"
        description="A smart conversational tutor giving round-the-clock STEM support, fostering self-directed learning at every grade level."
        icon={<MessageSquareText size={22} />}
        actions={<Badge tone="green">● Online</Badge>}
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        {/* Chat */}
        <Card className="flex h-[560px] flex-col overflow-hidden">
          <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-3">
            <div className="relative grid size-10 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-teal-500 text-white">
              <Bot size={18} />
              <span className="absolute -bottom-0 -right-0 size-3 rounded-full bg-emerald-400 ring-2 ring-white" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">MADAAR Tutor</div>
              <div className="text-xs text-slate-400">Typically replies instantly</div>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-5">
            {messages.map((m) => (
              <div
                key={m.id}
                className={cx('flex gap-3', m.role === 'user' && 'flex-row-reverse')}
              >
                <div
                  className={cx(
                    'grid size-8 shrink-0 place-items-center rounded-full text-white',
                    m.role === 'bot'
                      ? 'bg-gradient-to-br from-brand-500 to-teal-500'
                      : 'bg-slate-700',
                  )}
                >
                  {m.role === 'bot' ? <Bot size={16} /> : <User size={16} />}
                </div>
                <div
                  className={cx(
                    'max-w-[75%] rounded-2xl px-4 py-2.5 text-sm',
                    m.role === 'bot'
                      ? 'rounded-tl-sm bg-slate-100 text-slate-700'
                      : 'rounded-tr-sm bg-brand-600 text-white',
                  )}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex gap-3">
                <div className="grid size-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-teal-500 text-white">
                  <Bot size={16} />
                </div>
                <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-slate-100 px-4 py-3">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="size-2 animate-bounce rounded-full bg-slate-400"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Suggestions */}
          <div className="flex flex-wrap gap-2 border-t border-slate-100 px-5 pt-3">
            {TUTOR_SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <form
            className="flex items-center gap-2 p-4"
            onSubmit={(e) => {
              e.preventDefault()
              send(input)
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a STEM question…"
              className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
            <button
              type="submit"
              className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-600 text-white transition-colors hover:bg-brand-700"
            >
              <Send size={16} />
            </button>
          </form>
        </Card>

        {/* Side stats */}
        <div className="space-y-4">
          <Stat label="Sessions today" value="1,204" tone="brand" hint="+18% vs. yesterday" />
          <Stat label="Avg. response time" value="1.2s" tone="teal" />
          <Stat label="Concepts covered" value="640+" tone="gold" />
          <Card className="p-5">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <Sparkles size={16} className="text-brand-600" /> How it helps
            </div>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {[
                'Adapts explanations to grade level',
                'Generates practice quizzes on demand',
                'Available in Arabic & English',
                'Flags concepts for teacher follow-up',
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-500" />
                  {t}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}
