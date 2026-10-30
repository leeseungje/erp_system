import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ERP Automation System',
  description: 'Mini ERP workflow demo'
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
