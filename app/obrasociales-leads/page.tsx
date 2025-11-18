"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LeadForm } from "@/components/lead-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  MessageCircle,
  CheckCircle,
  Scale,
  Shield,
  Clock,
  Award,
  ArrowRight,
  Star,
  Heart,
  Pill,
  Stethoscope,
  FileX,
  AlertCircle,
  Phone,
  Sparkles,
} from "lucide-react";
import { getStoredUtmParameters } from "@/components/tracking";
import Script from "next/script";
import { AnimatedBackground } from "@/components/animated-background";

// Declarar tipos para Meta Pixel
declare global {
  interface Window {
    fbq: (...args: any[]) => void;
    gtag: (...args: any[]) => void;
  }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function ObraSocialLeadsPage() {
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Track Meta Pixel ViewContent
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "ViewContent", {
        content_name: "Obra Social Leads Landing",
        content_category: "Legal Services",
      });
    }

    // Track Google Analytics
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "page_view", {
        page_title: "Obra Social Leads Landing",
        page_location: window.location.href,
      });
    }
  }, []);

  const handleWhatsApp = (source: string = "button") => {
    const utmData = getStoredUtmParameters() || {};

    // Track Meta Pixel
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "Lead", {
        content_name: "WhatsApp Click",
        source: source,
      });
    }

    // Track Google Analytics
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "whatsapp_click", {
        event_category: "engagement",
        event_label: source,
      });
    }

    const message = encodeURIComponent(
      "Hola, me gustaría consultar sobre un problema con mi obra social o prepaga."
    );
    window.open(`https://wa.me/5493513199098?text=${message}`, "_blank");
  };

  const handleFormSuccess = () => {
    setShowSuccess(true);

    // Track Meta Pixel CompleteRegistration
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "CompleteRegistration", {
        content_name: "Obra Social Lead Form",
        status: true,
      });
    }
  };

  const problemas = [
    { icon: Heart, title: "Discapacidad", short: "Cobertura completa" },
    { icon: Pill, title: "Medicamentos", short: "Alto costo" },
    { icon: Stethoscope, title: "Enfermedades raras", short: "Poco frecuentes" },
    { icon: Heart, title: "Diabetes, cáncer", short: "Enfermedades crónicas" },
    { icon: Heart, title: "Fertilidad", short: "Tratamientos" },
    { icon: FileX, title: "Sin cobertura", short: "Prestaciones" },
    { icon: AlertCircle, title: "Baja", short: "Afiliación" },
    { icon: AlertCircle, title: "Preexistencia", short: "Valores" },
    { icon: Shield, title: "Jubilados", short: "Mantenimiento" },
    { icon: FileX, title: "Cambio", short: "Obra social" },
  ];

  const faqs = [
    {
      question: "¿Cuánto tarda un amparo?",
      answer: "En urgencias: 24-48hs. Regulares: 15-30 días.",
    },
    {
      question: "¿Necesito abogado?",
      answer: "Sí, aumenta significativamente las posibilidades de éxito.",
    },
    {
      question: "¿Qué pasa si me niegan un medicamento?",
      answer: "Podés iniciar un amparo. Tenemos experiencia en casos similares.",
    },
    {
      question: "¿Tiene costo?",
      answer: "Evaluación gratuita. Honorarios acordes a tu situación.",
    },
    {
      question: "¿Puedo reclamar con deuda?",
      answer: "Sí, el derecho a la salud es independiente de la situación de pago.",
    },
    {
      question: "¿Qué documentación necesito?",
      answer: "Prescripción médica, negativa de la obra social, estudios y DNI.",
    },
  ];

  const testimonios = [
    {
      nombre: "María G.",
      texto: "Me autorizaron el medicamento en 24 hs.",
      rating: 5,
    },
    {
      nombre: "Carlos R.",
      texto: "Conseguí la cobertura total para mi hijo.",
      rating: 5,
    },
    {
      nombre: "Ana L.",
      texto: "Lograron que me cubrieran el tratamiento completo.",
      rating: 5,
    },
  ];

  return (
    <>
      {/* Meta Pixel Script */}
      {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID}');
              fbq('track', 'PageView');
            `,
          }}
        />
      )}

      <div className="min-h-screen bg-gradient-to-br from-[#0f2f26] via-[#153F35] to-[#1a4a3e] text-white relative overflow-hidden">
        <AnimatedBackground />

        {/* Header con Logo */}
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#153F35]/90 border-b border-white/10 shadow-lg"
        >
          <div className="container max-w-7xl mx-auto flex items-center justify-center py-3 px-4">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo-transparente.png"
                alt="Estudio Bustos & Roque"
                width={50}
                height={50}
                className="brightness-110"
                priority
              />
              <span className="font-serif font-bold text-xl text-yellow-600">
                Bustos & Roque
              </span>
            </div>
          </div>
        </motion.header>

        {/* Hero Section - Compacto */}
        <section className="relative pt-8 pb-12 px-4 md:px-8">
          <div className="container max-w-6xl mx-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center"
            >
              <motion.div variants={itemVariants} className="mb-6">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-yellow-600 mb-4 leading-tight">
                  ¿Te negaron la cobertura de salud?
                </h1>
                <p className="text-lg md:text-xl text-gray-200 mb-6 max-w-2xl mx-auto">
                  Especialistas en amparos de salud.{" "}
                  <span className="text-yellow-500 font-bold">15 años</span> de experiencia.
                </p>
              </motion.div>

              {/* Trust badges - Compactos */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8"
              >
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 text-xs md:text-sm">
                  <Award className="h-4 w-4 text-yellow-500" />
                  <span>15 años</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 text-xs md:text-sm">
                  <Clock className="h-4 w-4 text-green-400" />
                  <span>Respuesta rápida</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 text-xs md:text-sm">
                  <CheckCircle className="h-4 w-4 text-blue-400" />
                  <span>1.200+ casos</span>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8"
              >
                <Button
                  onClick={() => handleWhatsApp("hero_cta")}
                  className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-5 px-6 text-base rounded-xl shadow-2xl"
                  size="lg"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp ahora
                </Button>
                <Button
                  onClick={() => {
                    document
                      .getElementById("formulario")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full sm:w-auto bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold py-5 px-6 text-base rounded-xl shadow-2xl"
                  size="lg"
                >
                  Evaluación gratis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Form Section - Movido arriba */}
        <section id="formulario" className="relative py-12 px-4 md:px-8 z-10">
          <div className="container max-w-4xl mx-auto">
            {showSuccess ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="backdrop-blur-xl bg-green-500/20 border border-green-400/30">
                  <CardContent className="p-8 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                    >
                      <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
                    </motion.div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                      ¡Consulta enviada!
                    </h2>
                    <p className="text-gray-200 mb-6">
                      Te contactamos en menos de 10 minutos.
                    </p>
                    <Button
                      onClick={() => handleWhatsApp("form_success")}
                      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-6 px-8 text-lg rounded-xl"
                    >
                      <MessageCircle className="mr-2 h-6 w-6" />
                      Hablar por WhatsApp
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 mb-3">
                    <Sparkles className="h-6 w-6 text-yellow-500" />
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-yellow-600">
                      Evaluación gratuita
                    </h2>
                  </div>
                  <p className="text-gray-300 text-sm md:text-base">
                    Completá el formulario y te contactamos en menos de 10 minutos
                  </p>
                </div>
                <LeadForm onSuccess={handleFormSuccess} />
              </motion.div>
            )}
          </div>
        </section>

        {/* Problemas - Grid compacto */}
        <section className="relative py-12 px-4 md:px-8 z-10">
          <div className="container max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-center text-yellow-600 mb-8">
                Problemas que resolvemos
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
                {problemas.map((problema, index) => {
                  const Icon = problema.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                    >
                      <Card
                        onClick={() => {
                          document
                            .getElementById("formulario")
                            ?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="backdrop-blur-xl bg-white/5 border border-white/20 hover:bg-white/10 transition-all cursor-pointer h-full"
                      >
                        <CardContent className="p-4 text-center">
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center mx-auto mb-2">
                            <Icon className="h-5 w-5 md:h-6 md:w-6 text-yellow-500" />
                          </div>
                          <h3 className="text-sm md:text-base font-bold text-white mb-1">
                            {problema.title}
                          </h3>
                          <p className="text-xs text-gray-400">{problema.short}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Authority - Compacto */}
        <section className="relative py-8 px-4 md:px-8 z-10">
          <div className="container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="backdrop-blur-xl bg-white/5 border border-white/20">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 flex items-center justify-center border-2 border-yellow-500/30">
                        <Scale className="h-8 w-8 text-yellow-500" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl md:text-2xl font-serif font-bold text-yellow-600 mb-1">
                        Estudio Bustos & Roque
                      </h2>
                      <p className="text-sm md:text-base text-gray-300">
                        Especialistas en Derecho a la Salud. Defendemos tus derechos.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Testimonios - Compacto */}
        <section className="relative py-12 px-4 md:px-8 z-10">
          <div className="container max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-center text-yellow-600 mb-8">
                Lo que dicen nuestros clientes
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                {testimonios.map((testimonio, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="backdrop-blur-xl bg-white/5 border border-white/20 h-full">
                      <CardContent className="p-5">
                        <div className="flex gap-1 mb-3">
                          {[...Array(testimonio.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 fill-yellow-500 text-yellow-500"
                            />
                          ))}
                        </div>
                        <p className="text-sm text-gray-200 mb-3 italic">
                          "{testimonio.texto}"
                        </p>
                        <p className="text-yellow-500 font-semibold text-sm">
                          — {testimonio.nombre}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ - Compacto */}
        <section className="relative py-12 px-4 md:px-8 bg-white/5 z-10">
          <div className="container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-center text-yellow-600 mb-8">
                Preguntas frecuentes
              </h2>
              <Accordion type="single" collapsible className="w-full space-y-3">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <AccordionItem
                      value={`item-${index}`}
                      className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-left text-white hover:text-yellow-500 text-sm md:text-base">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-300 text-sm">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative py-16 px-4 md:px-8 bg-gradient-to-r from-gray-900/50 to-gray-800/50 z-10">
          <div className="container max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                Podemos ayudarte hoy mismo
              </h2>
              <p className="text-lg text-gray-200 mb-6">
                No esperes más. Tu salud es lo más importante.
              </p>
              <Button
                onClick={() => handleWhatsApp("final_cta")}
                size="lg"
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold py-6 px-10 text-lg rounded-xl shadow-2xl"
              >
                <Phone className="mr-3 h-6 w-6" />
                Hablar con un abogado ahora
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Floating WhatsApp Button */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: "spring" }}
          className="fixed bottom-6 right-6 z-50"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <Button
              onClick={() => handleWhatsApp("floating_button")}
              className="rounded-full w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-2xl"
              size="icon"
            >
              <MessageCircle className="h-8 w-8 text-white" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
