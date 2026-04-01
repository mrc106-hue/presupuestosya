import { Coins } from 'lucide-react'

interface CreditBadgeProps {
  amount: number
  size?: 'sm' | 'md' | 'lg'
}

export default function CreditBadge({ amount, size = 'md' }: CreditBadgeProps) {
  const sizes = {
    sm: { padding: '3px 8px', fontSize: 12, iconSize: 12, gap: 4, borderRadius: 8 },
    md: { padding: '5px 12px', fontSize: 14, iconSize: 14, gap: 6, borderRadius: 10 },
    lg: { padding: '8px 16px', fontSize: 16, iconSize: 16, gap: 8, borderRadius: 12 },
  }
  const s = sizes[size]

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: s.gap,
      padding: s.padding,
      borderRadius: s.borderRadius,
      background: 'rgba(0,200,150,0.1)',
      border: '1px solid rgba(0,200,150,0.25)',
      color: '#00C896',
      fontWeight: 700,
      fontSize: s.fontSize,
      fontVariantNumeric: 'tabular-nums',
    }}>
      <Coins size={s.iconSize} />
      {amount} cr
    </span>
  )
}
