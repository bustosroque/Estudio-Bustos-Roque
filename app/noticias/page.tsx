import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

interface Noticia {
  id: number;
  slug: string;
  titulo: string;
  resumen: string;
  fecha: string;
  autor: string;
  imagen?: string;
  destacado?: boolean;
  categoria?: string;
}

const noticias: Noticia[] = [
  {
    id: 1,
    slug: "nota-en-defensa-y-justicia",
    titulo: "Nota en Diario Defensa y Justicia",
    resumen:
      "Uno de nuestros abogados fue entrevistado por el diario Defensa y Justicia, medio argentino especializado en noticias del ámbito judicial, legal, económico y empresarial, con sede en Córdoba Capital. En la nota, se abordaron temas de actualidad jurídica y experiencias profesionales relevantes.",
    fecha: "2024-06-01",
    autor: "Estudio Jurídico Bustos & Roque",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/5/51/Parte_Frontal.jpg",
    destacado: true,
    categoria: "Prensa",
  },
  {
    id: 2,
    slug: "exito-en-caso-penal",
    titulo: "Éxito en caso penal de alta complejidad",
    resumen:
      "Nuestro equipo logró la absolución de un cliente en un caso penal de gran repercusión mediática, demostrando la importancia de la defensa técnica y la estrategia jurídica.",
    fecha: "2024-05-28",
    autor: "Dr. Diego Bustos",
    imagen: "https://grimaldilexyasociados.com/wp-content/uploads/2024/04/interaccion-defensor-sistema-judicial-1024x585.jpg",
    destacado: true,
    categoria: "Casos de Éxito",
  },
  {
    id: 3,
    slug: "nueva-ley-tributaria-analisis",
    titulo: "Análisis de la nueva ley tributaria argentina",
    resumen:
      "El Dr. José Roque analiza los principales cambios de la nueva ley tributaria y su impacto en empresas y particulares.",
    fecha: "2024-05-20",
    autor: "Dr. José Roque",
    imagen: "https://fotos.perfil.com/2022/06/04/trim/950/534/5-6-2022-reforma-tributaria-1367205.jpg",
    destacado: false,
    categoria: "Análisis Legal",
  },
  {
    id: 4,
    slug: "conferencia-derecho-civil",
    titulo: "Conferencia sobre Derecho Civil en la UNC",
    resumen:
      "Participación de nuestro estudio en la conferencia anual de Derecho Civil organizada por la Universidad Nacional de Córdoba.",
    fecha: "2024-05-10",
    autor: "Estudio Jurídico Bustos & Roque",
    imagen: "/images/logo-transparente.png",
    destacado: false,
    categoria: "Eventos",
  },
  {
    id: 5,
    slug: "conferencia-derecho-civil2",
    titulo: "Conferencia sobre Derecho Civil en la UNC",
    resumen:
      "Participación de nuestro estudio en la conferencia anual de Derecho Civil organizada por la Universidad Nacional de Córdoba.",
    fecha: "2024-05-10",
    autor: "Estudio Jurídico Bustos & Roque",
    imagen: "/images/logo-transparente.png",
    destacado: false,
    categoria: "Eventos",
  },
  // ...más noticias simuladas
];

const categorias = [
  ...Array.from(new Set(noticias.map((n) => n.categoria).filter(Boolean)))
];

export default function NoticiasPage(): ReactNode {
  const noticiasDestacadas = noticias.filter((n) => n.destacado);
  const ultimasNoticias = noticias
    .filter((n) => !n.destacado)
    .sort((a, b) => b.fecha.localeCompare(a.fecha));

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
      <div className="container max-w-6xl mx-auto pt-16 px-4">
        {/* Botón regresar */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-block text-yellow-400 hover:text-yellow-300 font-semibold underline underline-offset-4 transition-colors text-base"
          >
            ← Volver al inicio
          </Link>
        </div>
        {/* Header de sección */}
        <div className="text-center mb-16">
          <div className="inline-block backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-8 py-4 mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-yellow-400">
              Noticias & Novedades
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Descubrí las últimas novedades, experiencias, notas y casos de éxito de nuestro equipo de abogados. Esta sección se actualizará permanentemente y pronto estará integrada a nuestro CMS.
          </p>
        </div>
        {/* Categorías */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categorias.map((cat) => (
            <span key={cat} className="px-4 py-2 rounded-full bg-yellow-400/10 text-yellow-300 font-semibold text-sm border border-yellow-400/20">
              {cat}
            </span>
          ))}
        </div>
        {/* Noticias destacadas */}
        {noticiasDestacadas.length > 0 && (
          <div className="mb-20">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-yellow-400 mb-8 text-center">
              Noticias Destacadas
            </h2>
            <div className="grid md:grid-cols-2 gap-10">
              {noticiasDestacadas.map((noticia) => (
                <Link
                  key={noticia.id}
                  href={`/noticias/${noticia.slug}`}
                  className="group rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col hover:bg-white/10 transition-colors"
                >
                  <div className="relative w-full h-60 md:h-80">
                    <Image
                      src={noticia.imagen || "/placeholder.jpg"}
                      alt={noticia.titulo}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      priority
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="inline-block mb-2 px-3 py-1 bg-yellow-400/20 text-yellow-400 rounded-full text-xs font-semibold tracking-wider">
                        {noticia.categoria}
                      </span>
                      <h3 className="text-2xl font-serif font-bold text-yellow-400 mb-2 group-hover:underline underline-offset-4 transition-colors">
                        {noticia.titulo}
                      </h3>
                      <p className="text-gray-200 mb-4 text-lg leading-relaxed">
                        {noticia.resumen}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-gray-400 text-sm mt-2">
                      <span>{new Date(noticia.fecha).toLocaleDateString()}</span>
                      <span>{noticia.autor}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
        {/* Últimas noticias */}
        <div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-yellow-400 mb-8 text-center">
            Últimas Noticias
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {ultimasNoticias.length === 0 && (
              <div className="text-center text-gray-400 italic text-lg col-span-2">
                Próximamente más novedades, experiencias y casos de éxito.
              </div>
            )}
            {ultimasNoticias.map((noticia) => (
              <Link
                key={noticia.id}
                href={`/noticias/${noticia.slug}`}
                className="group rounded-2xl overflow-hidden shadow-xl border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col hover:bg-white/10 transition-colors"
              >
                <div className="relative w-full h-44 md:h-56">
                  <Image
                    src={noticia.imagen || "/placeholder.jpg"}
                    alt={noticia.titulo}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <span className="inline-block mb-2 px-3 py-1 bg-yellow-400/10 text-yellow-300 rounded-full text-xs font-semibold tracking-wider">
                    {noticia.categoria}
                  </span>
                  <h3 className="text-lg font-serif font-bold text-yellow-400 mb-1 group-hover:underline underline-offset-4 transition-colors">
                    {noticia.titulo}
                  </h3>
                  <p className="text-gray-200 mb-2 text-base leading-relaxed line-clamp-3">
                    {noticia.resumen}
                  </p>
                  <div className="flex items-center justify-between text-gray-400 text-xs mt-2">
                    <span>{new Date(noticia.fecha).toLocaleDateString()}</span>
                    <span>{noticia.autor}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 