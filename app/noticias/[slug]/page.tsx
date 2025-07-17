import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

// Simulación de datos (en CMS esto vendrá de una API o base de datos)
const noticias = [
  {
    slug: "nota-en-defensa-y-justicia",
    titulo: "Nota en Diario Defensa y Justicia",
    fecha: "2024-06-01",
    autor: "Estudio Jurídico Bustos & Roque",
    abogado: "Dr. Diego Bustos",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/5/51/Parte_Frontal.jpg",
    categoria: "Prensa",
    contenido: `Uno de nuestros abogados fue entrevistado por el diario Defensa y Justicia, medio argentino especializado en noticias del ámbito judicial, legal, económico y empresarial, con sede en Córdoba Capital.\n\nEn la nota, se abordaron temas de actualidad jurídica, experiencias profesionales relevantes y el impacto de la labor jurídica en la sociedad.\n\nLa entrevista destacó la importancia de la actualización constante y la ética profesional en el ejercicio del derecho.`,
  },
  {
    slug: "exito-en-caso-penal",
    titulo: "Éxito en caso penal de alta complejidad",
    fecha: "2024-05-28",
    autor: "Dr. Diego Bustos",
    abogado: "Dr. Diego Bustos",
    imagen: "https://grimaldilexyasociados.com/wp-content/uploads/2024/04/interaccion-defensor-sistema-judicial-1024x585.jpg",
    categoria: "Casos de Éxito",
    contenido: `Nuestro equipo logró la absolución de un cliente en un caso penal de gran repercusión mediática, demostrando la importancia de la defensa técnica y la estrategia jurídica.\n\nEl caso fue seguido por diversos medios y sentó precedente en la jurisprudencia local.`,
  },
  {
    slug: "nueva-ley-tributaria-analisis",
    titulo: "Análisis de la nueva ley tributaria argentina",
    fecha: "2024-05-20",
    autor: "Dr. José Roque",
    abogado: "Dr. José Roque",
    imagen: "https://fotos.perfil.com/2022/06/04/trim/950/534/5-6-2022-reforma-tributaria-1367205.jpg",
    categoria: "Análisis Legal",
    contenido: `El Dr. José Roque analiza los principales cambios de la nueva ley tributaria y su impacto en empresas y particulares.\n\nEl análisis incluye recomendaciones prácticas para la adaptación de las empresas al nuevo marco legal.`,
  },
  {
    slug: "conferencia-derecho-civil",
    titulo: "Conferencia sobre Derecho Civil en la UNC",
    fecha: "2024-05-10",
    autor: "Estudio Jurídico Bustos & Roque",
    abogado: "Dr. José Roque",
    imagen: "/images/logo-transparente.png",
    categoria: "Eventos",
    contenido: `Participación de nuestro estudio en la conferencia anual de Derecho Civil organizada por la Universidad Nacional de Córdoba.\n\nSe abordaron temas de actualidad y se compartieron experiencias con colegas y estudiantes.`,
  },
];

interface Props {
  params: { slug: string };
}

export default async function NoticiaDetallePage({ params }: Props): Promise<ReactNode> {
  const { slug } = await params;
  const noticia = noticias.find((n) => n.slug === slug);
  if (!noticia) return notFound();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2f26] via-[#153F35] to-[#1a4a3e] text-white pb-24">
      {/* Header sticky */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#153F35]/90 border-b border-white/10 shadow-lg">
        <div className="container max-w-7xl mx-auto flex items-center justify-between py-4 px-4">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/images/logo-transparente.png"
              alt="Estudio Jurídico Bustos & Roque"
              width={40}
              height={40}
              className="brightness-110"
            />
            <span className="font-serif font-bold text-lg text-yellow-400">
              Bustos & Roque
            </span>
          </Link>
          <nav className="flex items-center space-x-6">
            <Link href="/" className="text-white/80 hover:text-yellow-400 transition-colors text-sm font-semibold">
              Inicio
            </Link>
            <Link href="/noticias" className="text-yellow-400 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-yellow-400/10 transition-colors border border-yellow-400/30">
              Noticias
            </Link>
          </nav>
        </div>
      </header>
      <div className="container max-w-3xl mx-auto pt-16 px-4">
        {/* Botón regresar */}
        <div className="mb-8">
          <Link
            href="/noticias"
            className="inline-block text-yellow-400 hover:text-yellow-300 font-semibold underline underline-offset-4 transition-colors text-base"
          >
            ← Volver a Noticias
          </Link>
        </div>
        {/* Badge y título */}
        <div className="mb-10 text-center">
          <span className="inline-block mb-2 px-3 py-1 bg-yellow-400/20 text-yellow-400 rounded-full text-xs font-semibold tracking-wider">
            {noticia.categoria || "Noticia"}
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-yellow-400 mb-4">
            {noticia.titulo}
          </h1>
          <div className="flex flex-col sm:flex-row gap-2 justify-center items-center text-gray-400 text-sm mb-2">
            <span>{new Date(noticia.fecha).toLocaleDateString()}</span>
            <span className="hidden sm:inline">|</span>
            <span>{noticia.autor}</span>
          </div>
          {noticia.abogado && (
            <div className="flex justify-center items-center text-yellow-400 text-base font-semibold mb-4">
              <span className="mr-2">Abogado responsable:</span>
              <span>{noticia.abogado}</span>
            </div>
          )}
        </div>
        {/* Imagen destacada */}
        {noticia.imagen && (
          <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-10 shadow-2xl border border-white/10">
            <Image
              src={noticia.imagen}
              alt={noticia.titulo}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
        {/* Contenido */}
        <article className="prose prose-lg prose-invert max-w-none text-gray-100 bg-white/5 rounded-2xl p-8 border border-white/10 shadow-xl">
          {noticia.contenido.split("\n\n").map((parrafo, idx) => (
            <p key={idx}>{parrafo}</p>
          ))}
        </article>
        {/* Navegación inferior */}
        <div className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link
            href="/noticias"
            className="inline-block text-yellow-400 hover:text-yellow-300 font-semibold underline underline-offset-4 transition-colors text-lg"
          >
            ← Volver a Noticias
          </Link>
          <Link
            href="/"
            className="inline-block text-white/80 hover:text-yellow-400 font-semibold underline underline-offset-4 transition-colors text-base"
          >
            Ir al inicio
          </Link>
        </div>
      </div>
    </div>
  );
} 