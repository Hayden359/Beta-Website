import { useEffect, useRef, useState } from 'react'

function getReply(prompt, comics) {
  const query = prompt.toLowerCase()

  const comic = comics.find(
    (item) =>
      query.includes(item.title.toLowerCase()) ||
      query.includes(item.creator.toLowerCase()),
  )

  if (comic) {
    return `${comic.title} is a ${comic.genres.join(', ').toLowerCase()} story by ${comic.creator}, first published in ${comic.year}. ${comic.description}`
  }

  if (/\b(recommend|recommendation|suggest|start|beginner)\b/.test(query)) {
    const suggestions = comics.slice(0, 3)
    if (suggestions.length === 0) {
      return 'There are no comics in the collection yet.'
    }

    return `Here are a few reader favorites to start with: ${suggestions
      .map((item) => `${item.title} by ${item.creator}`)
      .join('; ')}. You can browse and filter the full collection on this page.`
  }

  if (comics.length === 0) {
    return 'There are no comics in the collection yet.'
  }

  return `Ask me about any comic! ${comics
    .slice(0, 3)
    .map((item) => item.title)
    .join(', ')}, or tell me what comic I think would fit for you.`
}

function OllamaChat({ comics }) {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages])

  function handleSubmit(event) {
    event.preventDefault()

    const prompt = input.trim()

    if (!prompt) return

    setMessages((current) => [
      ...current,
      { role: 'user', content: prompt },
      { role: 'assistant', content: getReply(prompt, comics) },
    ])

    setInput('')
  }

  return (
    <aside className="chat-widget" aria-label="Comic guide chat">
      <section
        className="chat-panel"
        id="comic-chat-panel"
        aria-labelledby="chat-title"
        hidden={!isOpen}
      >
          <header className="chat-header">
            <img className="chat-avatar" src="/SAGE.png" alt="" />

            <div>
              <h2 id="chat-title">Ask Sage</h2>
              <p>Your friendly guide to the comic collection</p>
            </div>

            <button
              className="chat-close"
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              ×
            </button>
          </header>

          <div className="chat-messages" role="log" aria-live="polite" aria-relevant="additions">
            {messages.length === 0 && (
              <div className="chat-welcome">
                <p>Hello, I am Sage.</p>
                <span>
                  Ask about anything try asking what you should read!
                </span>
              </div>
            )}

            {messages.map((message, index) => (
              <p
                className={`chat-message chat-message-${message.role}`}
                key={`${message.role}-${index}`}
              >
                {message.content}
              </p>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form className="chat-form" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="comic-chat-input">
              Ask about a comic
            </label>

            <input
              id="comic-chat-input"
              placeholder="Ask about a comic..."
              autoComplete="off"
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />

            <button
              type="submit"
              disabled={!input.trim()}
              aria-label="Send message"
            >
              ↑
            </button>
          </form>
      </section>

      <button
        className={`chat-launcher${isOpen ? ' chat-launcher-open' : ''}`}
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls="comic-chat-panel"
        aria-label={
          isOpen ? 'Close comic guide chat' : 'Open comic guide chat'
        }
      >
        {isOpen ? (
          <span aria-hidden="true">×</span>
        ) : (
          <>
            <img className="chat-launcher-avatar" src="/SAGE.png" alt="" />
            <span>Ask Sage</span>
          </>
        )}
      </button>
    </aside>
  )
}

export default OllamaChat