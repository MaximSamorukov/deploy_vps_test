'use client'

import { useState } from 'react'
import styles from './page.module.scss'

interface Message {
  id: number
  message: string
}

const mockMessages: Message[] = [
  { id: 1, message: 'Первое сообщение' },
  { id: 2, message: 'Второе сообщение' },
  { id: 3, message: 'Третье сообщение' },
]

export default function Home() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>(mockMessages)

  const handleSave = () => {
    if (!input.trim()) return
    const newMessage: Message = {
      id: Date.now(),
      message: input,
    }
    setMessages([...messages, newMessage])
    setInput('')
  }

  const handleDelete = (id: number) => {
    setMessages(messages.filter((m) => m.id !== id))
  }

  const isButtonDisabled = !input.trim()

  return (
    <main className={styles.container}>
      <h1>Сообщения</h1>

      <div className={styles.form}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Введите сообщение..."
        />
        <button onClick={handleSave} disabled={isButtonDisabled}>
          Сохранить
        </button>
      </div>

      <ul className={styles.messageList}>
        {messages.length === 0 ? (
          <li className={styles.emptyMessage}>Нет сообщений</li>
        ) : (
          messages.map((m) => (
            <li key={m.id} className={styles.messageItem}>
              <span className={styles.messageText}>{m.message}</span>
              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(m.id)}
              >
                Удалить
              </button>
            </li>
          ))
        )}
      </ul>
    </main>
  )
}
