"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  trackWhatsAppClick,
  trackFormSubmit,
  trackButtonClick,
  getStoredUtmParameters,
} from "@/components/tracking";
import { SimpleTracking } from "@/components/simple-tracking";
import { SharedHeader } from "@/components/shared-header";
import {
  CheckCircle,
  MessageCircle,
  Scale,
  FileText,
  Shield,
  ArrowRight,
  MapPin,
  Mail,
  Clock,
  Phone,
  Star,
  Users,
  Award,
} from "lucide-react";

export default function PensionDiscapacidadLanding() {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    localidad: "",
    tipoSuspension: "",
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = `Hola, soy ${formData.nombre} de ${formData.localidad}. 
Mi pensión fue suspendida por: ${formData.tipoSuspension}. 
Tel: ${formData.telefono}. 
Necesito asesoramiento.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5493513199098?text=${encodedMessage}`;

    // Track form submission
    const utmData = getStoredUtmParameters();
    trackFormSubmit("pension_discapacidad_form", utmData);
    trackWhatsAppClick("form_submit", utmData);

    window.open(whatsappUrl, "_blank");
  };

  const handleWhatsAppClick = (source: string = "button_click") => {
    const message = encodeURIComponent(
      "Hola, me gustaría consultar sobre mi pensión por discapacidad suspendida."
    );

    // Track WhatsApp click
    const utmData = getStoredUtmParameters();
    trackWhatsAppClick(source, utmData);

    window.open(`https://wa.me/5493513199098?text=${message}`, "_blank");
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2f26] via-[#153F35] to-[#1a4a3e] text-white overflow-x-hidden">
      <SimpleTracking />
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

        {/* Subtle Document Pattern */}
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
              className={`mb-12 transform transition-all duration-1000 ${isVisible
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
                  width={120}
                  height={120}
                  className="mx-auto brightness-110 drop-shadow-2xl"
                  priority
                />
              </div>
            </div>

            {/* Main Heading */}
            <div
              className={`mb-8 transform transition-all duration-1000 delay-300 ${isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
                }`}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent">
                  Recuperá tu pensión
                </span>
                <br />
                <span className="text-yellow-600 drop-shadow-lg">
                  por discapacidad
                </span>
              </h1>
            </div>

            {/* Tagline */}
            <div
              className={`mb-12 transform transition-all duration-1000 delay-500 ${isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
                }`}
            >
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 max-w-4xl mx-auto">
                <p className="text-xl md:text-2xl lg:text-3xl text-gray-100 leading-relaxed font-light">
                  Más de{" "}
                  <span className="text-yellow-600 font-semibold">14 años</span>{" "}
                  defendiendo los derechos de las personas. Te ayudamos a{" "}
                  <span className="text-yellow-600 font-semibold">
                    reclamar lo que te corresponde.
                  </span>
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div
              className={`flex flex-col sm:flex-row gap-6 justify-center items-center transform transition-all duration-1000 delay-700 ${isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
                }`}
            >
              <Button
                size="lg"
                onClick={() => handleWhatsAppClick("hero_cta")}
                className="group bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold px-10 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                Contactanos ahora
                <Image
                  src="/wpblack.png"
                  alt="WhatsApp"
                  width={32}
                  height={32}
                  className="w-6 h-6 "
                />
              </Button>
            </div>

            {/* Trust Indicators */}
            <div
              className={`mt-16 flex flex-wrap justify-center items-center gap-8 transform transition-all duration-1000 delay-1000 ${isVisible
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
              <div className="flex items-center space-x-2 text-yellow-600">
                <Shield className="h-5 w-5" />
                <span className="text-sm font-medium">
                  Especialistas en Derecho Social
                </span>
              </div>
              <div className="flex items-center space-x-2 text-yellow-600">
                <Scale className="h-5 w-5" />
                <span className="text-sm font-medium">
                  Fuero provincial y federal
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-yellow-400/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-yellow-400/5 rounded-full blur-2xl animate-pulse delay-1000" />
      </section>

      {/* Requirements Section */}
      <section id="requisitos" className="py-32 px-4 relative">
        <div className="container max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-block backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-8 py-4 mb-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-yellow-600">
                Requisitos
              </h2>
            </div>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Para iniciar tu reclamo necesitás:
            </p>
          </div>

          {/* Requirements Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <FileText className="h-12 w-12" />,
                title: "Resolución de suspensión",
                description:
                  "Documento oficial que notifica la suspensión de tu pensión por discapacidad.",
                color: "from-slate-600 to-slate-700",
              },
              {
                icon: <Shield className="h-12 w-12" />,
                title: "Certificado Único de Discapacidad (CUD)",
                description:
                  "Certificado vigente que acredita tu condición de discapacidad.",
                color: "from-emerald-700 to-emerald-800",
              },
              {
                icon: <CheckCircle className="h-12 w-12" />,
                title: "Notificación recibida",
                description:
                  "Comprobante de que recibiste la notificación de suspensión.",
                color: "from-amber-700 to-amber-800",
              },
            ].map((requirement, index) => (
              <Card
                key={index}
                className="group backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-2xl"
              >
                <CardContent className="p-8 text-center relative overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${requirement.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />
                  <div className="relative z-10">
                    <div
                      className={`text-yellow-600 mb-6 flex justify-center p-4 rounded-2xl bg-gradient-to-br ${requirement.color} bg-opacity-10`}
                    >
                      {requirement.icon}
                    </div>
                    <h3 className="text-2xl font-serif font-bold mb-4 text-white group-hover:text-yellow-600 transition-colors duration-300">
                      {requirement.title}
                    </h3>
                    <p className="text-gray-200 leading-relaxed">
                      {requirement.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contacto" className="py-32 px-4 relative">
        <div className="container max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-block backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-8 py-4 mb-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-yellow-600">
                Contacto Rápido
              </h2>
            </div>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Completá el formulario y te contactaremos inmediatamente por
              WhatsApp
            </p>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <Card className="backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl">
              <CardContent className="p-8">
                <form onSubmit={handleWhatsAppSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="nombre"
                      className="block text-sm font-semibold text-gray-200 mb-2"
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
                      className="backdrop-blur-xl bg-white/10 border-2 border-white/20 focus:border-yellow-400 text-white placeholder:text-gray-400 rounded-xl py-3 px-4 text-base transition-all duration-300"
                      placeholder="Tu nombre completo"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="telefono"
                      className="block text-sm font-semibold text-gray-200 mb-2"
                    >
                      Teléfono
                    </label>
                    <Input
                      id="telefono"
                      type="tel"
                      value={formData.telefono}
                      onChange={(e) =>
                        setFormData({ ...formData, telefono: e.target.value })
                      }
                      className="backdrop-blur-xl bg-white/10 border-2 border-white/20 focus:border-yellow-400 text-white placeholder:text-gray-400 rounded-xl py-3 px-4 text-base transition-all duration-300"
                      placeholder="351-123-4567"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="localidad"
                      className="block text-sm font-semibold text-gray-200 mb-2"
                    >
                      Localidad
                    </label>
                    <Input
                      id="localidad"
                      type="text"
                      value={formData.localidad}
                      onChange={(e) =>
                        setFormData({ ...formData, localidad: e.target.value })
                      }
                      className="backdrop-blur-xl bg-white/10 border-2 border-white/20 focus:border-yellow-400 text-white placeholder:text-gray-400 rounded-xl py-3 px-4 text-base transition-all duration-300"
                      placeholder="Córdoba Capital"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="tipoSuspension"
                      className="block text-sm font-semibold text-gray-200 mb-2"
                    >
                      Tipo de suspensión
                    </label>
                    <Input
                      id="tipoSuspension"
                      type="text"
                      value={formData.tipoSuspension}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          tipoSuspension: e.target.value,
                        })
                      }
                      className="backdrop-blur-xl bg-white/10 border-2 border-white/20 focus:border-yellow-400 text-white placeholder:text-gray-400 rounded-xl py-3 px-4 text-base transition-all duration-300"
                      placeholder="Ej: Revisión médica, falta de documentación, etc."
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Enviar por WhatsApp
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 px-4 relative">
        <div className="container max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-block backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-8 py-4 mb-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-yellow-600">
                Confianza
              </h2>
            </div>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Ya ayudamos a cientos de personas a recuperar sus pensiones
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <Users className="h-12 w-12" />,
                title: "Cientos de casos",
                description:
                  "Hemos representado exitosamente a cientos de personas en reclamos de pensiones por discapacidad.",
                color: "from-slate-600 to-slate-700",
              },
              {
                icon: <Award className="h-12 w-12" />,
                title: "Experiencia comprobada",
                description:
                  "Más de 14 años de experiencia en derecho social y administrativo.",
                color: "from-emerald-700 to-emerald-800",
              },
              {
                icon: <Scale className="h-12 w-12" />,
                title: "Resultados exitosos",
                description:
                  "Nuestro enfoque estratégico ha logrado la recuperación de pensiones suspendidas.",
                color: "from-amber-700 to-amber-800",
              },
            ].map((trust, index) => (
              <Card
                key={index}
                className="group backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-2xl"
              >
                <CardContent className="p-8 text-center relative overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${trust.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />
                  <div className="relative z-10">
                    <div
                      className={`text-yellow-600 mb-6 flex justify-center p-4 rounded-2xl bg-gradient-to-br ${trust.color} bg-opacity-10`}
                    >
                      {trust.icon}
                    </div>
                    <h3 className="text-2xl font-serif font-bold mb-4 text-white group-hover:text-yellow-600 transition-colors duration-300">
                      {trust.title}
                    </h3>
                    <p className="text-gray-200 leading-relaxed">
                      {trust.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => handleWhatsAppClick("floating_button")}
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
      <footer className="py-16 px-4 backdrop-blur-xl bg-[#0f2f26]/80 border-t border-white/10">
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
                  <p className="text-gray-300 text-sm">
                    Especialistas en Pensiones
                  </p>
                </div>
              </div>
              <p className="text-gray-300 italic">
                Defendiendo tus{" "}
                <span className="text-yellow-600 font-semibold">derechos</span>{" "}
                con{" "}
                <span className="text-yellow-600 font-semibold">
                  excelencia
                </span>
              </p>
            </div>

            {/* Contact Information */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-3 text-yellow-600">
                <MapPin className="h-5 w-5" />
                <span className="text-sm">
                  La Rioja 441 Planta Baja "E", Córdoba Capital
                </span>
              </div>
              <div className="flex items-center justify-center space-x-3 text-yellow-600">
                <Phone className="h-5 w-5" />
                <span className="text-sm">351-591-8047 / 351-755-5269</span>
              </div>
              <div className="flex items-center justify-center space-x-3 text-yellow-600">
                <Mail className="h-5 w-5" />
                <span className="text-sm">
                  estudiojuridicobustosroque@gmail.com
                </span>
              </div>
              <div className="flex items-center justify-center space-x-3 text-yellow-600">
                <Clock className="h-5 w-5" />
                <span className="text-sm">Lunes a Viernes, 8 a 19 hs</span>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Estudio Jurídico Bustos & Roque
                <br />
                Todos los derechos reservados.
              </p>
              <a
                href="/"
                className="text-yellow-600 hover:text-yellow-300 transition-colors text-sm mt-2 inline-block"
              >
                Volver al sitio institucional
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
