import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Reclamos contra Obras Sociales y Prepagas | Evaluación Gratis",
  description: "Landing para campañas de Meta Ads. Iniciá tu reclamo por falta de cobertura, medicamentos, discapacidad o prestaciones. Atención inmediata.",
  keywords: "obra social, prepaga, amparo de salud, reclamo obra social, medicamentos alto costo, discapacidad, cobertura salud",
  openGraph: {
    title: "Reclamos contra Obras Sociales y Prepagas | Evaluación Gratis",
    description: "Landing para campañas de Meta Ads. Iniciá tu reclamo por falta de cobertura, medicamentos, discapacidad o prestaciones. Atención inmediata.",
    type: "website",
  },
};

export default function ObraSocialLeadsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

