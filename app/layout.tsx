import type { Metadata } from 'next'
import './globals.css'

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
    </html>
  )
}
