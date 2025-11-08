import type { Metadata } from "next";
import { AnalyticsScripts } from "@/components/analytics-scripts";

export const metadata: Metadata = {
  title:
    "Amparos de salud | Obras Sociales y Prepagas | Estudio Bustos y Roque",
  description:
    "¿Tu obra social o prepaga te negó la cobertura de salud? Tenés derecho a reclamar. Especialistas en amparos de salud con más de 15 años de experiencia.",
  keywords:
    "amparo de salud, obra social, prepaga, cobertura médica, medicamentos alto costo, discapacidad, tratamientos, abogados Córdoba, derecho de salud, Bustos Roque",
  openGraph: {
    title:
      "Amparos de salud | Obras Sociales y Prepagas | Estudio Bustos y Roque",
    description:
      "¿Tu obra social o prepaga te negó la cobertura de salud? Tenés derecho a reclamar. Especialistas con más de 15 años de experiencia.",
    type: "website",
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Amparos de salud | Obras Sociales y Prepagas | Estudio Bustos y Roque",
    description:
      "¿Tu obra social o prepaga te negó la cobertura de salud? Tenés derecho a reclamar.",
  },
  alternates: {
    canonical: "/obrasociales",
  },
};

export default function ObrasSocialesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AnalyticsScripts
        googleAnalyticsId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}
        metaPixelId={process.env.NEXT_PUBLIC_META_PIXEL_ID}
      />
      {children}
    </>
  );
}

