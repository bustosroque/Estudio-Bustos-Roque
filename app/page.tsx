"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { BookingForm } from "@/components/booking-form";
import { SharedHeader } from "@/components/shared-header";
import {
  Scale,
  Shield,
  FileText,
  Car,
  Calculator,
  Users,
  Mail,
  MapPin,
  Clock,
  Instagram,
  MessageCircle,
  ArrowRight,
  CheckCircle,
  Star,
} from "lucide-react";

export default function EstudioJuridicoLanding() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    consulta: "",
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Error al enviar el mensaje");
      alert(
        "¡Tu mensaje fue enviado correctamente! Nos contactaremos a la brevedad."
      );
      setFormData({ nombre: "", email: "", consulta: "" });
    } catch (err) {
      alert("Hubo un error al enviar tu mensaje. Intenta nuevamente.");
    }
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      "Hola, me gustaría solicitar una consulta legal."
    );
    window.open(`https://wa.me/5493513199098?text=${message}`, "_blank");
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2f26] via-[#153F35] to-[#1a4a3e] text-white overflow-x-hidden">
      {/* Animated Background Pattern */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white rounded-full animate-pulse delay-1000" />
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse delay-500" />
          <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-white rounded-full animate-pulse delay-700" />
        </div>
      </div>

      {/* Legal-themed Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Subtle Justice Scale Pattern */}
        <div className="absolute top-20 right-20 opacity-[0.02] transform rotate-12">
          <Scale className="h-32 w-32 text-yellow-600" />
        </div>
        <div className="absolute bottom-40 left-20 opacity-[0.02] transform -rotate-12">
          <Scale className="h-24 w-24 text-white" />
        </div>
        <div className="absolute top-1/2 left-1/4 opacity-[0.015] transform rotate-45">
          <Scale className="h-40 w-40 text-yellow-600" />
        </div>

        {/* Subtle Book/Document Pattern */}
        <div className="absolute top-1/3 right-1/3 opacity-[0.02] transform -rotate-6">
          <FileText className="h-28 w-28 text-white" />
        </div>
        <div className="absolute bottom-1/3 right-1/4 opacity-[0.015] transform rotate-12">
          <FileText className="h-36 w-36 text-yellow-600" />
        </div>

        {/* Geometric Legal Elements */}
        <div className="absolute top-1/4 left-1/2 w-px h-32 bg-gradient-to-b from-transparent via-yellow-400/5 to-transparent transform rotate-45" />
        <div className="absolute bottom-1/4 right-1/2 w-px h-24 bg-gradient-to-b from-transparent via-white/5 to-transparent transform -rotate-45" />

        {/* Subtle Marble Texture Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(212, 175, 55, 0.1) 0%, transparent 50%),
                     radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
                     radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.05) 0%, transparent 70%)`,
          }}
        />
      </div>

      {/* Navigation */}
      <SharedHeader />

      {/* Hero Section */}
      <section
        id="inicio"
        className="relative min-h-screen flex items-center justify-center px-4 pt-20 mt-4"
      >
        <div className="container max-w-7xl mx-auto">
          <div className="text-center relative z-10">
            {/* Logo with Glassmorphism */}
            <div
              className={`mb-12 transform transition-all duration-1000 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div
                className="inline-block p-8 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl"
                style={{
                  backgroundImage: "url('/fondo.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <Image
                  src="/images/logo-transparente.png"
                  alt="Estudio Jurídico Bustos & Roque"
                  width={180}
                  height={180}
                  className="mx-auto brightness-110 drop-shadow-2xl"
                  priority
                />
              </div>
            </div>

            {/* Main Heading */}
            <div
              className={`mb-8 transform transition-all duration-1000 delay-300 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent">
                  Estudio Jurídico
                </span>
                <br />
                <span className="text-yellow-600 drop-shadow-lg">
                  Bustos & Roque
                </span>
              </h1>
            </div>

            {/* Tagline */}
            <div
              className={`mb-12 transform transition-all duration-1000 delay-500 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 max-w-4xl mx-auto">
                <p className="text-xl md:text-2xl lg:text-3xl text-gray-100 leading-relaxed font-light">
                  Comprometidos con el{" "}
                  <span className="text-yellow-600 font-semibold">
                    derecho,
                  </span>{" "}
                  orientados a la{" "}
                  <span className="text-yellow-600 font-semibold">
                    excelencia
                  </span>
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-6 justify-center items-center transform transition-all duration-1000 delay-700 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <Button
                size="lg"
                onClick={() => scrollToSection("reserva")}
                className="group bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold px-10 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                Reservar Consulta
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("nosotros")}
                className="backdrop-blur-xl bg-white/10 border-2 border-yellow-400/50 text-white hover:bg-yellow-400/20 hover:border-yellow-400 px-10 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105"
              >
                Conocer Más
              </Button>
            </div>

            {/* Specialized Service Button */}
            <div
              className={`mt-8 transform transition-all duration-1000 delay-900 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <a
                href="/pension-discapacidad"
                className="group inline-flex items-center space-x-3 backdrop-blur-xl bg-gradient-to-r from-red-500/20 to-orange-500/20 border-2 border-red-400/50 text-white hover:bg-red-500/30 hover:border-red-400 px-8 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                <Shield className="h-6 w-6 text-red-400 group-hover:text-red-300" />
                <span className="font-bold">¿Tu Pensión por Discapacidad fue Suspendida?</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Trust Indicators */}
            <div
              className={`mt-16 flex flex-wrap justify-center items-center gap-8 transform transition-all duration-1000 delay-1000 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="flex items-center space-x-2 text-yellow-600">
                <Star className="h-5 w-5 fill-current" />
                <span className="text-sm font-medium">
                  14+ Años de Experiencia
                </span>
              </div>
              {/* <div className="flex items-center space-x-2 text-yellow-600">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm font-medium">
                  Excelencia Profesional
                </span>
              </div> */}
              <div className="flex items-center space-x-2 text-yellow-600">
                <Scale className="h-5 w-5" />
                <span className="text-sm font-medium">
                  fuero provincial y federal
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-yellow-400/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-yellow-400/5 rounded-full blur-2xl animate-pulse delay-1000" />
      </section>

      {/* About Us Section */}
      <section id="nosotros" className="py-32 px-4 relative">
        <div className="container max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-block backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-8 py-4 mb-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-yellow-600">
                Sobre Nosotros
              </h2>
            </div>
            <div className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed whitespace-pre-line lg:text-justify indent-[1.25rem]">
              {`Somos un equipo de abogados asociados y egresados de la Facultad de Derecho de la Universidad Nacional de Córdoba, con más de 14 años de trayectoria en el ejercicio de la profesión. 
Nos especializamos en distintas materias, específicamente en derecho comercial, derecho societario, derecho tributario-aduanero, derecho constitucional, derecho administrativo. Asimismo, nos dedicamos a la representación administrativa y judicial de obras sociales y empresas de medicina prepaga, utilizando la conciliación como herramienta primordial para la resolución de conflictos en etapa administrativa a los fines de disminuir la judicialidad.
Brindamos atención integral y, mediante estrategias legales, priorizamos optimizar los recursos económicos y el capital de la empresa, evitando la litigiosidad. 
Ofrecemos un servicio personalizado y acorde a cada empresa, escuchando las necesidades de nuestros representados y en base a ello, planteamos los objetivos para su cumplimiento, tanto en corto, mediano y a largo plazo. 
Representamos causas tanto en el fuero provincial como federal. Desde nuestra experiencia, estamos convencidos que podemos lograr la reducción de la gran cantidad de amparos de salud que se encuentran actualmente en trámite en contra de esta empresa, evitando así un dispendio jurisdiccional innecesario que repercute en el pago de prestaciones onerosas y gastos de juicio innecesario, lo que muchas veces pone en jaque la estabilidad financiera de la empresa.

  Nuestro estudio brinda servicios jurídicos en toda la provincia de Córdoba y a nivel federal, representando a clientes en todo el país.`}
            </div>
          </div>

          {/* Lawyers Grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Diego Bustos */}
            <div className="group">
              <Card className="backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-2xl">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-xl">
                    <Image
                      src="/images/diego-bustos.jpg"
                      alt="Diego Bustos - Criminal Law Specialist"
                      width={400}
                      height={500}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#153F35]/80 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-3xl font-serif font-bold text-yellow-600 mb-2">
                        Diego Bustos
                      </h3>
                      <p className="text-yellow-200 font-medium">
                        Especialista en Derecho Penal
                      </p>
                    </div>
                  </div>
                  <div className="p-8">
                    <p className="text-gray-200 leading-relaxed text-lg text-center lg:text-justify indent-5">
                      Especialista en Derecho Penal, con más de 5 años de
                      experiencia en el fuero provincial y federal. Ha
                      intervenido en procesos penales de diversa complejidad,
                      abarcando delitos económicos, contra la administración
                      pública y delitos comunes. Su enfoque estratégico prioriza
                      la defensa de los derechos y garantías constitucionales.
                      Considera fundamental la utilización de herramientas
                      alternativas de resolución de conflictos, como la
                      conciliación y la mediación penal, para lograr soluciones
                      eficientes y evitar litigios innecesarios.
                    </p>
                    <div className="mt-6 flex items-center space-x-4">
                      <div className="flex items-center gap-3">
                        <Star className="h-8 w-8 text-yellow-600 fill-current" />
                        <span className="text-sm text-gray-300">
                          Actuación en toda la provincia de Córdoba y fuero
                          federal en todo el país
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Roque Navarro */}
            <div className="group">
              <Card className="backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-2xl">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-xl">
                    <Image
                      src="/images/roque-navarrete.jpg"
                      alt="Roque Navarro - Tax, Civil & Administrative Law Specialist"
                      width={400}
                      height={500}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#153F35]/80 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-3xl font-serif font-bold text-yellow-600 mb-2">
                        José Roque
                      </h3>
                      <p className="text-yellow-200 font-medium">
                        Especialista en Derecho Tributario y Civil
                      </p>
                    </div>
                  </div>
                  <div className="p-8">
                    <p className="text-gray-200 leading-relaxed text-lg text-center lg:text-justify indent-5">
                      Especialista en Derecho Constitucional, Tributario,
                      Aduanero y Civil. Con más de 14 años de experiencia en el
                      Juzgado Federal de Primera Instancia N° 1 de Córdoba, se
                      especializa en procesos constitucionales (amparos,
                      acciones declarativas, inconstitucionalidad) y posee
                      amplia experiencia en materia tributaria y aduanera, tanto
                      penal económica como contencioso administrativa. Considera
                      la conciliación una herramienta fundamental para la
                      resolución de conflictos. Atiende cuestiones litigiosas en
                      el fuero civil y reclamos administrativos y judiciales en
                      defensa del consumidor.
                    </p>
                    <div className="mt-6 flex items-center space-x-4">
                      <div className="flex items-center gap-3">
                        <Star className="h-8 w-8 text-yellow-600 fill-current" />
                        <span className="text-sm text-gray-300">
                          Derecho Tributario y Administrativo
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Areas */}
      <section id="servicios" className="py-32 px-4 relative">
        <div className="container max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-block backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-8 py-4 mb-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-yellow-600">
                Áreas de Práctica
              </h2>
            </div>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Brindamos asesoramiento integral en las principales ramas del
              derecho
            </p>
          </div>

          {/* Specialized Service Highlight */}
          <div className="mb-12 text-center">
            <Card className="backdrop-blur-xl bg-gradient-to-r from-red-500/10 to-orange-500/10 border-2 border-red-400/30 shadow-2xl max-w-4xl mx-auto">
              <CardContent className="p-8">
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="flex items-center space-x-4">
                    <Shield className="h-12 w-12 text-red-400" />
                    <div className="text-left">
                      <h3 className="text-2xl font-serif font-bold text-white mb-2">
                        Pensión por Discapacidad Suspendida
                      </h3>
                      <p className="text-gray-200 text-lg">
                        Especialistas en recuperar pensiones suspendidas
                      </p>
                    </div>
                  </div>
                  <a
                    href="/pension-discapacidad"
                    className="group bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold px-8 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center space-x-2"
                  >
                    <span>Consultar Ahora</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="h-10 w-10" />,
                title: "Amparos de Salud",
                description:
                  "Protección de derechos fundamentales en materia de salud y seguridad social. Representación administrativa y judicial de obras sociales y empresas de medicina prepaga, priorizando la conciliación para evitar litigios innecesarios.",
                color: "from-slate-600 to-slate-700",
              },
              {
                icon: <Scale className="h-10 w-10" />,
                title: "Defensa Penal",
                description:
                  "Representación especializada en procesos penales provinciales y federales.",
                color: "from-yellow-600 to-yellow-700",
              },
              {
                icon: <FileText className="h-10 w-10" />,
                title: "Derecho Civil",
                description:
                  "Contratos, sucesiones, daños y perjuicios, y derecho de familia.",
                color: "from-emerald-700 to-emerald-800",
              },
              {
                icon: <Car className="h-10 w-10" />,
                title: "Accidentes y ART",
                description:
                  "Reclamos por accidentes de tránsito y accidentes de trabajo.",
                color: "from-amber-700 to-amber-800",
              },
              {
                icon: <Calculator className="h-10 w-10" />,
                title: "Derecho Tributario y Aduanero",
                description:
                  "Asesoramiento fiscal, recursos tributarios y operaciones aduaneras.",
                color: "from-stone-600 to-stone-700",
              },
              {
                icon: <Users className="h-10 w-10" />,
                title: "Consultas Laborales",
                description:
                  "Relaciones laborales, despidos, y conflictos entre empleadores y trabajadores.",
                color: "from-zinc-600 to-zinc-700",
              },
            ].map((area, index) => (
              <Card
                key={index}
                className="group backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-2xl"
              >
                <CardContent className="p-8 text-center relative overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${area.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />
                  <div className="relative z-10">
                    <div
                      className={`text-yellow-600 mb-6 flex justify-center p-4 rounded-2xl bg-gradient-to-br ${area.color} bg-opacity-10`}
                    >
                      {area.icon}
                    </div>
                    <h3 className="text-2xl font-serif font-bold mb-4 text-white group-hover:text-yellow-600 transition-colors duration-300">
                      {area.title}
                    </h3>
                    <p className="text-gray-200 leading-relaxed">
                      {area.description}
                    </p>
                    <div className="mt-6">
                      <Button
                        variant="ghost"
                        className="text-yellow-600 hover:text-yellow-300 hover:bg-yellow-400/10 p-0 h-auto font-semibold"
                        onClick={() => scrollToSection("reserva")}
                      >
                        Reservar Consulta{" "}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Jurisdicción */}
      <section id="jurisdiccion" className="py-32 px-4 relative">
        <div className="container max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-block backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-8 py-4 mb-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-yellow-600">
                Jurisdicción
              </h2>
            </div>
            <div className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed text-center lg:text-justify ">
              Litigamos principalmente en la Provincia de Córdoba, actuando en
              el Foro General Provincial, la Cámara en lo Civil y Comercial, y
              demás tribunales con sede en{" "}
              <span className="font-semibold text-yellow-600">
                La Rioja 441
              </span>
              , Córdoba Capital. Además, representamos a clientes en toda la
              provincia y a nivel federal en todo el país.
            </div>
            <div className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mt-6 l text-center lg:text-justify">
              Nuestro conocimiento profundo del funcionamiento judicial en estas
              jurisdicciones nos permite ofrecer una defensa sólida, eficiente y
              cercana a las personas, adaptándonos a las necesidades de cada
              caso.
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="reserva" className="py-16 sm:py-24 md:py-32 px-4 relative">
        <div className="container max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="inline-block backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-4 sm:px-6 md:px-8 py-3 sm:py-4 mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-yellow-600">
                Reserva tu Consulta
              </h2>
            </div>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed px-4">
              Agenda una consulta personalizada con nuestros especialistas.
              Selecciona el tipo de consulta y te asignaremos automáticamente al
              abogado más adecuado.
            </p>
          </div>

          {/* Booking Form */}
          <div className="px-2 sm:px-4">
            <BookingForm />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contacto"
        className="py-16 px-4 sm:py-24 md:py-32 sm:px-4 relative"
      >
        <div className="container max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-16 md:mb-20">
            <div className="inline-block backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-4 sm:px-8 py-2 sm:py-4 mb-6 sm:mb-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-yellow-600">
                Contacto Rápido
              </h2>
            </div>
            <p className="text-base sm:text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Atendemos consultas y representamos clientes en toda la provincia
              de Córdoba y a nivel federal en todo el país.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
            {/* Contact Form */}
            <Card className="backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl">
              <CardContent className="p-4 sm:p-6 md:p-10">
                <h3 className="text-xl sm:text-2xl font-serif font-bold mb-6 sm:mb-8 text-yellow-600">
                  Envíanos un mensaje
                </h3>
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6 sm:space-y-8"
                >
                  <div className="space-y-2">
                    <label
                      htmlFor="nombre"
                      className="block text-xs sm:text-sm font-semibold text-gray-200 mb-2 sm:mb-3"
                    >
                      Nombre Completo
                    </label>
                    <Input
                      id="nombre"
                      type="text"
                      value={formData.nombre}
                      onChange={(e) =>
                        setFormData({ ...formData, nombre: e.target.value })
                      }
                      className="backdrop-blur-xl bg-white/10 border-2 border-white/20 focus:border-yellow-400 text-white placeholder:text-gray-400 rounded-xl py-3 sm:py-4 px-4 sm:px-6 text-base sm:text-lg transition-all duration-300"
                      placeholder="Tu nombre completo"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="block text-xs sm:text-sm font-semibold text-gray-200 mb-2 sm:mb-3"
                    >
                      Dirección de Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="backdrop-blur-xl bg-white/10 border-2 border-white/20 focus:border-yellow-400 text-white placeholder:text-gray-400 rounded-xl py-3 sm:py-4 px-4 sm:px-6 text-base sm:text-lg transition-all duration-300"
                      placeholder="tu@email.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="consulta"
                      className="block text-xs sm:text-sm font-semibold text-gray-200 mb-2 sm:mb-3"
                    >
                      Consulta Legal
                    </label>
                    <Textarea
                      id="consulta"
                      value={formData.consulta}
                      onChange={(e) =>
                        setFormData({ ...formData, consulta: e.target.value })
                      }
                      className="backdrop-blur-xl bg-white/10 border-2 border-white/20 focus:border-yellow-400 text-white placeholder:text-gray-400 rounded-xl py-3 sm:py-4 px-4 sm:px-6 text-base sm:text-lg min-h-[100px] sm:min-h-[150px] transition-all duration-300"
                      placeholder="Describe tu consulta legal..."
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold py-3 sm:py-4 text-base sm:text-lg rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl"
                  >
                    Enviar Consulta
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6 sm:space-y-8">
              {/* Contact Cards */}
              <div className="space-y-4 sm:space-y-6">
                <Card className="backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 shadow-xl">
                  <CardContent className="p-4 sm:p-8">
                    <div className="flex items-center space-x-4 sm:space-x-6">
                      <div className="p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-slate-600/20 to-slate-700/20">
                        <MapPin className="h-7 w-7 sm:h-8 sm:w-8 text-yellow-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg sm:text-xl text-white mb-1 sm:mb-2">
                          Ubicación de la Oficina
                        </h3>
                        <p className="text-gray-200 text-base sm:text-lg">
                          La Rioja 441 Planta Baja “E”, Córdoba Capital,
                          Argentina”
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 shadow-xl">
                  <CardContent className="p-4 sm:p-8">
                    <div className="flex items-center space-x-4 sm:space-x-6">
                      <div className="p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-emerald-700/20 to-emerald-800/20">
                        <Mail className="h-7 w-7 sm:h-8 sm:w-8 text-yellow-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg sm:text-xl text-white mb-1 sm:mb-2">
                          Dirección de Email
                        </h3>
                        <p className="text-gray-200 text-sm sm:text-lg">
                          estudiojuridicobustosroque@gmail.com
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 shadow-xl">
                  <CardContent className="p-4 sm:p-8">
                    <div className="flex items-center space-x-4 sm:space-x-6">
                      <div className="p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-amber-700/20 to-amber-800/20">
                        <Clock className="h-7 w-7 sm:h-8 sm:w-8 text-yellow-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg sm:text-xl text-white mb-1 sm:mb-2">
                          Horario de Atención
                        </h3>
                        <p className="text-gray-200 text-base sm:text-lg">
                          Lunes a Viernes, 8 a 19 hs
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* WhatsApp CTA */}
              <Card className="backdrop-blur-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-400/30 shadow-2xl">
                <CardContent className="p-4 sm:p-8 text-center">
                  <div className="mb-4 sm:mb-6">
                    <MessageCircle className="h-12 w-12 sm:h-16 sm:w-16 text-green-400 mx-auto mb-3 sm:mb-4" />
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">
                      Consulta Inmediata
                    </h3>
                    <p className="text-gray-200 text-base sm:text-lg">
                      Obtén asesoramiento legal instantáneo por WhatsApp
                    </p>
                  </div>
                  <Button
                    onClick={handleWhatsApp}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 sm:py-4 text-base sm:text-lg rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl"
                  >
                    <MessageCircle className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
                    Consulta por WhatsApp
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
          {/* Teléfonos y email agregados al final de la sección de contacto */}
          <div className="mt-8 text-center text-lg text-gray-200 whitespace-pre-line">
            {`Tel: 351 319-9098\nestudiojurídicobustosroque@gmail.com`}
          </div>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={handleWhatsApp}
          className="bg-gradient-to-r from-[#113930] to-[#113930]/70 hover:from-[#113930]/40 hover:to-[#113930]/10 text-white font-bold w-14 h-14 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center p-0"
        >
          <Image
            src="/whatsapp.png"
            alt="WhatsApp"
            width={32}
            height={32}
            className="w-6 h-6"
          />
        </Button>
      </div>

      {/* Footer */}
      <footer className="py-10 px-4 backdrop-blur-xl bg-[#0f2f26]/80 border-t border-white/10">
        <div className="container max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 items-center">
            {/* Logo & Tagline */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-4 mb-4">
                <Image
                  src="/images/logo-transparente.png"
                  alt="Estudio Jurídico Bustos & Roque"
                  width={80}
                  height={80}
                  className="brightness-110"
                />
                <div className="text-start">
                  <h3 className="font-serif font-bold text-xl text-yellow-600">
                    Bustos & Roque
                  </h3>
                  <p className="text-gray-300 text-sm">Excelencia Jurídica</p>
                </div>
              </div>
              <p className="text-gray-300 italic">
                Comprometidos con el{" "}
                <span className="text-yellow-600 font-semibold">derecho</span>,
                orientados a la{" "}
                <span className="text-yellow-600 font-semibold">
                  excelencia
                </span>
              </p>
            </div>

            {/* Social Media */}
            <div className="text-center">
              <h4 className="font-semibold text-white mb-4">Síguenos</h4>
              <a
                href="https://instagram.com/bustosyroque.abogados"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-3 text-yellow-600 hover:text-yellow-300 transition-colors duration-300 backdrop-blur-xl bg-white/5 border border-white/10 rounded-full px-6 py-3"
              >
                <Instagram className="h-6 w-6" />
                <span>@bustosyroque.abogados</span>
              </a>
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Estudio Jurídico Bustos & Roque
                <br />
                Todos los derechos reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
