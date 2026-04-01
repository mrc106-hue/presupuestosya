'use client'

import { useEffect, useState } from 'react'
import { MOCK_FEED_ACTIVITY } from '@/lib/data'

interface FeedItem {
  id: string
  emoji: string
  text: string
  provincia: string
  time: string
}

export default function LiveFeed() {
  const [items, setItems] = useState<FeedItem[]>([])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    // Show first item immediately
    setItems([MOCK_FEED_ACTIVITY[0]])
    setIndex(1)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => {
        const next = prev % MOCK_FEED_ACTIVITY.length
        const newItem = MOCK_FEED_ACTIVITY[next]
        setItems(current => {
          const updated = [newItem, ...current]
          return updated.slice(0, 4)
        })
        return next + 1
      })
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  return (
    <div style={{
      position: 'fixed',
      bottom: 24,
      right: 24,
      zIndex: 50,
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      maxWidth: 320,
      pointerEvents: 'none',
    }}>
      {items.map((item, i) => (
        <div
          key={item.id + i}
          style={{
            background: 'rgba(17,17,17,0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 12,
            padding: '12px 14px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: 10,
            animation: 'toastIn 0.4s ease both',
            opacity: i === 0 ? 1 : Math.max(0.4, 1 - i * 0.2),
            transform: `scale(${1 - i * 0.02})`,
            transition: 'opacity 0.3s, transform 0.3s',
          }}
        >
          <span style={{ fontSize: 20, flexShrink: 0, marginTop: 1 }}>{item.emoji}</span>
          <div style={{ minWidth: 0 }}>
            <p style={{ color: '#F5F5F0', fontSize: 12, lineHeight: 1.4, marginBottom: 4, fontWeight: 500 }}>
              {item.text}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{
                background: 'rgba(0,200,150,0.1)', color: '#00C896',
                border: '1px solid rgba(0,200,150,0.2)',
                padding: '2px 8px', borderRadius: 20, fontSize: 10, fontWeight: 700,
              }}>
                {item.provincia}
              </span>
              <span style={{ color: '#555', fontSize: 10 }}>{item.time}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
