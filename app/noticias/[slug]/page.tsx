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
    abogado: "Dr. José Roque",
    abogadoImagen: "/images/joseroqueavatar.png",
    imagen: "/images/joseroquenoticias.png",
    categoria: "Opinión Jurídica",
    contenido: `Sin una justicia independiente no se puede construir la República
  
  Por José Roque (*)
  
  A casi dos siglos de la sanción de nuestra Constitución Nacional de 1853, es importante preguntarnos: ¿nos encontramos viviendo en el modelo de Estado con el que soñó aquella asamblea convencional constituyente en aquella época?
  
  Para responder a esta pregunta, vamos a analizar particularmente el rol del Poder Judicial dentro de su interacción con los demás poderes del Estado, a los fines de advertir si se cumplen los recaudos previstos por el legislador en el artículo 1 de nuestra Carta Magna.
  
  Primero, es importante analizar cómo se integra actualmente el Consejo de la Magistratura de la Nación. Según el artículo 2 de la ley 24937, cuenta con 20 consejeros, entre ellos, el presidente de la Corte Suprema de Justicia de la Nación; cuatro jueces/zas del Poder Judicial de la Nación; cuatro diputados nacionales; cuatro senadores nacionales; cuatro representantes de los/as abogados/as de la matrícula federal; un representante del Poder Ejecutivo Nacional y; dos representantes del ámbito científico/académico.
  
  A su vez, estos consejeros se dividen en distintas comisiones, las que tienen funciones específicas, tales como la selección de magistrados, disciplina, reglamentación, acusación y administración financiera.
  
  Partimos de la base, entonces, de que este órgano -que fue creado a partir de la reforma constitucional de 1994– y que tiene a su cargo funciones que le son propias al Poder Judicial, se encuentra integrado por representantes de otros poderes externos.
  
  Sin embargo, dentro de la esfera que regula al Poder Ejecutivo y al Poder Legislativo, no advertimos esta intromisión por parte del Poder Judicial, lo que nos lleva a pensar entonces si realmente se cumple el modelo republicano.
  
  Siguiendo con ello, los jueces de la Corte Suprema de Justicia de la Nación son nombrados en forma directa por el Presidente, máxima autoridad del Poder Ejecutivo. En lo que respecta a los jueces de jerarquía inferior, si bien se requiere la aprobación de un concurso previo, quien termina elevando los respectivos pliegos de los ternados al senado es el Presidente, necesitando posteriormente la aprobación del Senado de la Nación.
  
  Por su parte, el presupuesto que demanda al Poder Judicial la administración de sus recursos humanos, técnicos, científicos, etcétera, depende pura y exclusivamente de la voluntad del Poder Ejecutivo, debiendo ser aprobado por Jefatura de Gabinete.
  
  Estos datos objetivos son la clara evidencia de que el Poder Judicial no es autosustentable, no cuenta con órganos de control puramente judiciales, ni cuenta con autofinanciamiento que le permita realmente ser independiente a los demás poderes estatales.
  
  Es decir, la injerencia que tienen el Poder Ejecutivo y el Poder Legislativo para con el Poder Judicial es única, puesto que de ninguna manera el aparato judicial incide sobre la administración de los demás poderes, por lo menos en forma directa.
  
  Frente a ello, considero que la respuesta al interrogante que nos planteamos en un principio, es un rotundo “no”. Así y solo así, para que pueda asegurarse la República, es necesaria la independencia total y la autonomía de los tres poderes, cada uno con sus competencias específicas, evitando que la intromisión de los otros poderes afecte al normal desenvolvimiento de su funcionamiento.
  
  En definitiva, sin justicia independiente, no hay República, y sin República, no se puede construir democracia ni derecho.
  
  (*) Abogado`
  },
  // {
  //   slug: "exito-en-caso-penal",
  //   titulo: "Éxito en caso penal de alta complejidad",
  //   fecha: "2024-05-28",
  //   autor: "Dr. Diego Bustos",
  //   abogado: "Dr. Diego Bustos",
  //   abogadoImagen: "/images/diego-bustos.jpg",
  //   imagen: "/images/placeholder-user.jpg",
  //   categoria: "Casos de Éxito",
  //   contenido: `Nuestro equipo logró la absolución de un cliente en un caso penal de gran repercusión mediática, demostrando la importancia de la defensa técnica y la estrategia jurídica.\n\nEl caso fue seguido por diversos medios y sentó precedente en la jurisprudencia local.`,
  // },
  // {
  //   slug: "nueva-ley-tributaria-analisis",
  //   titulo: "Análisis de la nueva ley tributaria argentina",
  //   fecha: "2024-05-20",
  //   autor: "Dr. José Roque",
  //   abogado: "Dr. José Roque",
  //   abogadoImagen: "/images/roque-navarrete.jpg",
  //   imagen: "/images/placeholder.jpg",
  //   categoria: "Análisis Legal",
  //   contenido: `El Dr. José Roque analiza los principales cambios de la nueva ley tributaria y su impacto en empresas y particulares.\n\nEl análisis incluye recomendaciones prácticas para la adaptación de las empresas al nuevo marco legal.`,
  // },
  // {
  //   slug: "conferencia-derecho-civil",
  //   titulo: "Conferencia sobre Derecho Civil en la UNC",
  //   fecha: "2024-05-10",
  //   autor: "Estudio Jurídico Bustos & Roque",
  //   abogado: "Dr. José Roque",
  //   abogadoImagen: "/images/roque-navarrete.jpg",
  //   imagen: "/images/logo-transparente.png",
  //   categoria: "Eventos",
  //   contenido: `Participación de nuestro estudio en la conferencia anual de Derecho Civil organizada por la Universidad Nacional de Córdoba.\n\nSe abordaron temas de actualidad y se compartieron experiencias con colegas y estudiantes.`,
  // },
];

const palabrasNegrita = [
  // Agrega aquí las palabras o frases que quieras resaltar
  "Constitución Nacional",
  "Poder Judicial",
  "Consejo de la Magistratura de la Nación",
  "Corte Suprema de Justicia de la Nación",
  "Poder Ejecutivo",
  "Poder Legislativo",
  "Senado de la Nación",
  "autosustentable",
  "independencia",
  "República",
  "justicia independiente",
  "Abogado",
  "¿nos encontramos viviendo en el modelo de Estado con el que soñó aquella asamblea convencional constituyente en aquella época?"
];

function resaltarNegrita(texto: string) {
  let resultado = texto;
  palabrasNegrita.forEach((palabra) => {
    const safe = palabra.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    resultado = resultado.replace(
      new RegExp(`(${safe})`, "gi"),
      '<strong class="font-bold text-yellow-600">$1</strong>'
    );
  });
  // Reemplazo saltos de línea simples por <br /> para mantener formato
  resultado = resultado.replace(/\n/g, '<br />');
  return resultado;
}

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
            <span className="font-serif font-bold text-lg text-yellow-600">
              Bustos & Roque
            </span>
          </Link>
          <nav className="flex items-center space-x-6">
            <Link href="/" className="text-white/80 hover:text-yellow-600 transition-colors text-sm font-semibold">
              Inicio
            </Link>
            <Link href="/noticias" className="text-yellow-600 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-yellow-600/10 transition-colors border border-yellow-600/30">
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
            className="inline-block text-yellow-600 hover:text-yellow-500 font-semibold underline-offset-4 transition-colors text-base"
          >
            ← Volver a Noticias
          </Link>
        </div>
        {/* Badge y título */}
        <div className="mb-10 text-center">
          <span className="inline-block mb-2 px-3 py-1 bg-yellow-600/20 text-yellow-600 rounded-full text-xs font-semibold tracking-wider">
            {noticia.categoria || "Noticia"}
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-yellow-600 mb-4">
            {noticia.titulo}
          </h1>
          <div className="flex flex-col sm:flex-row gap-2 justify-center items-center text-gray-400 text-sm mb-2">
            <span>{new Date(noticia.fecha).toLocaleDateString()}</span>
            <span className="hidden sm:inline">|</span>
            <span>{noticia.autor}</span>
          </div>
          {noticia.abogado && noticia.abogadoImagen && (
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl shadow-lg px-4 py-3 mb-8 max-w-md mx-auto">
              <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-yellow-700 shadow">
                <Image
                  src={noticia.abogadoImagen}
                  alt={noticia.abogado}
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <div className="text-yellow-700 font-bold text-lg">{noticia.abogado}</div>
                <div className="text-gray-300 text-sm">Especialista en Derecho Constitucional y Tributario</div>
              </div>
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
            <p key={idx} dangerouslySetInnerHTML={{ __html: resaltarNegrita(parrafo) }} />
          ))}
        </article>
        {/* Navegación inferior */}
        <div className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link
            href="/noticias"
            className="inline-block text-yellow-600 hover:text-yellow-500 font-semibold underline underline-offset-4 transition-colors text-lg"
          >
            ← Volver a Noticias
          </Link>
          <Link
            href="/"
            className="inline-block text-white/80 hover:text-yellow-600 font-semibold underline underline-offset-4 transition-colors text-base"
          >
            Ir al inicio
          </Link>
        </div>
      </div>
    </div>
  );
} 