import type { Metadata } from 'next'
import './globals.css'
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: 'Estudio Jurídico Bustos & Roque',
  description: 'Estudio jurídico en Córdoba Capital. Especialistas en Derecho Penal, Civil, Tributario y Administrativo. Atención personalizada y excelencia profesional.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
      <Analytics/>
      <SpeedInsights/>
    </html>
  )
}
