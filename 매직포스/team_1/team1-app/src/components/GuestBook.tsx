import React, { useState } from 'react'

interface Message {
  text: string;
  author: string;
  date: Date;
}

interface GuestBookProps {
  onMessageSubmit: (message: Message) => void;
}

export function GuestBook({ onMessageSubmit }: GuestBookProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [author, setAuthor] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && author.trim()) {
      onMessageSubmit({
        text: message,
        author: author,
        date: new Date()
      })
      setMessage('')
      setAuthor('')
      setIsOpen(false)
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20%',
        left: 20,
        zIndex: 1000,
      }}
    >
      {!isOpen ? (
        <div
          onClick={() => setIsOpen(true)}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: 'white',
            border: '2px solid #ccc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            fontSize: '24px',
            color: '#666',
          }}
        >
          ✍️
        </div>
      ) : (
        <div
          style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            width: '300px',
          }}
        >
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '10px' }}>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="이름을 입력하세요"
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  marginBottom: '10px',
                }}
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="메시지를 입력하세요"
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  height: '100px',
                  resize: 'none',
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="submit"
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                등록
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#ccc',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                취소
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
} 