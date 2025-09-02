import type { Metadata } from 'next'
import { AnalyticsScripts } from '@/components/analytics-scripts'

export const metadata: Metadata = {
  title: 'Recuperá tu Pensión por Discapacidad | Bustos & Roque',
  description: 'Especialistas en pensiones por discapacidad suspendidas. Más de 14 años defendiendo tus derechos. Contactanos por WhatsApp para asesoramiento inmediato.',
  keywords: 'pensión discapacidad, pensión suspendida, derecho social, abogados Córdoba, Bustos Roque',
  openGraph: {
    title: 'Recuperá tu Pensión por Discapacidad | Bustos & Roque',
    description: 'Especialistas en pensiones por discapacidad suspendidas. Más de 14 años defendiendo tus derechos.',
    type: 'website',
    locale: 'es_AR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Recuperá tu Pensión por Discapacidad | Bustos & Roque',
    description: 'Especialistas en pensiones por discapacidad suspendidas. Más de 14 años defendiendo tus derechos.',
  },
  alternates: {
    canonical: '/pension-discapacidad',
  },
}

export default function PensionDiscapacidadLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <AnalyticsScripts 
        googleAnalyticsId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}
        metaPixelId={process.env.NEXT_PUBLIC_META_PIXEL_ID}
      />
      {children}
    </>
  )
}
