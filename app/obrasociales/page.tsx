"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SimpleTracking } from "@/components/simple-tracking";
import { SharedHeader } from "@/components/shared-header";
import { motion } from "framer-motion";
import {
  Shield,
  Scale,
  Heart,
  Pill,
  Baby,
  Users,
  FileText,
  UserCheck,
  Activity,
  Stethoscope,
  MessageCircle,
  CheckCircle,
  Star,
  Award,
  Phone,
  Mail,
  Clock,
  MapPin,
} from "lucide-react";

export default function ObrasSocialesLanding() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "Hola, necesito consultar sobre un amparo de salud. ¿Pueden ayudarme?"
    );
    window.open(`https://wa.me/5493513199098?text=${message}`, "_blank");
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  const especialidades = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Discapacidad",
      description:
        "Cobertura integral para personas con discapacidad. Certificado Único de Discapacidad (CUD).",
      color: "from-blue-600 to-blue-700",
    },
    {
      icon: <Pill className="h-8 w-8" />,
      title: "Medicamentos de alto costo",
      description:
        "Tratamientos oncológicos, biológicos y medicación de alto valor.",
      color: "from-purple-600 to-purple-700",
    },
    {
      icon: <Activity className="h-8 w-8" />,
      title: "Enfermedades poco frecuentes",
      description:
        "Cobertura para enfermedades raras y tratamientos especializados.",
      color: "from-pink-600 to-pink-700",
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Diabetes, cáncer y otras enfermedades",
      description:
        "Tratamientos integrales, insumos y prestaciones médicas necesarias.",
      color: "from-red-600 to-red-700",
    },
    {
      icon: <Baby className="h-8 w-8" />,
      title: "Tratamientos de fertilización",
      description:
        "Fertilización asistida, tratamientos de reproducción y cobertura completa.",
      color: "from-green-600 to-green-700",
    },
    {
      icon: <Stethoscope className="h-8 w-8" />,
      title: "Falta de cobertura de prestaciones",
      description:
        "Estudios, cirugías, prótesis y tratamientos denegados sin justificación.",
      color: "from-teal-600 to-teal-700",
    },
    {
      icon: <UserCheck className="h-8 w-8" />,
      title: "Baja de afiliación",
      description:
        "Defensa ante bajas indebidas o arbitrarias de la cobertura médica.",
      color: "from-orange-600 to-orange-700",
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Aplicación de valores por preexistencia",
      description:
        "Impugnación de cobros adicionales por enfermedades preexistentes.",
      color: "from-amber-600 to-amber-700",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Mantenimiento de obra social de jubilados",
      description:
        "Derecho a mantener la obra social después de la jubilación.",
      color: "from-indigo-600 to-indigo-700",
    },
    {
      icon: <Scale className="h-8 w-8" />,
      title: "Opción de cambio de obra social",
      description:
        "Ejercer tu derecho a cambiar de obra social sin impedimentos.",
      color: "from-cyan-600 to-cyan-700",
    },
  ];

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
        <div className="absolute top-20 right-20 opacity-[0.02] transform rotate-12">
          <Scale className="h-32 w-32 text-yellow-600" />
        </div>
        <div className="absolute bottom-40 left-20 opacity-[0.02] transform -rotate-12">
          <Heart className="h-24 w-24 text-white" />
        </div>
        <div className="absolute top-1/2 left-1/4 opacity-[0.015] transform rotate-45">
          <Shield className="h-40 w-40 text-yellow-600" />
        </div>
        <div className="absolute top-1/3 right-1/3 opacity-[0.02] transform -rotate-6">
          <FileText className="h-28 w-28 text-white" />
        </div>
      </div>

      {/* Navigation */}
      <SharedHeader />

      {/* Hero Section */}
      <section
        id="inicio"
        className="relative min-h-screen flex items-center justify-center px-4 pt-20 mt-4"
      >
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f2f26]/95 via-[#153F35]/90 to-[#1a4a3e]/95 z-10" />
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full bg-[url('/fondo.png')] bg-cover bg-center" />
          </div>
        </div>

        <div className="container max-w-7xl mx-auto relative z-20">
          <div className="text-center">
            {/* Logo with Glassmorphism */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-12"
            >
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
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
              </motion.div>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="mb-8"
            >
              <motion.h1
                className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <motion.span
                  className="bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent inline-block"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  ¿Tu obra social o prepaga
                </motion.span>
                <br />
                <motion.span
                  className="text-yellow-600 drop-shadow-lg inline-block"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  te negó la cobertura de salud?
                </motion.span>
              </motion.h1>
            </motion.div>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
              className="mb-12"
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 max-w-4xl mx-auto"
              >
                <p className="text-xl md:text-2xl lg:text-3xl text-gray-100 leading-relaxed font-light">
                  Tenés{" "}
                  <motion.span
                    className="text-yellow-600 font-semibold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                  >
                    derecho a reclamar.
                  </motion.span>{" "}
                  No dejes pasar el tiempo.
                </p>
              </motion.div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  onClick={handleWhatsAppClick}
                  className="group bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold px-10 py-6 text-lg rounded-full transition-all duration-300 shadow-2xl"
                >
                  <MessageCircle className="mr-2 h-6 w-6" />
                  Contactanos — Sabemos cómo ayudarte
                </Button>
              </motion.div>
            </motion.div>

            {/* Estudio mention */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.8 }}
              className="mt-8"
            >
              <motion.p
                className="text-yellow-600 font-semibold text-lg"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                @estudiobustosyroque
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-1/4 left-10 w-20 h-20 bg-yellow-400/10 rounded-full blur-xl"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-10 w-32 h-32 bg-yellow-400/5 rounded-full blur-2xl"
          animate={{
            y: [0, 20, 0],
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </section>

      {/* Experience Section */}
      <section className="py-32 px-4 relative bg-white/5 backdrop-blur-sm">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="inline-block backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl p-12 max-w-4xl mx-auto shadow-2xl"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  delay: 0.3,
                }}
                className="mb-8 flex justify-center"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                  className="p-6 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 shadow-lg"
                >
                  <Award className="h-16 w-16 text-black" />
                </motion.div>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-yellow-600 mb-6"
              >
                15 años de experiencia haciendo amparos de salud
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="text-xl md:text-2xl text-gray-100 leading-relaxed"
              >
                Defendemos tus derechos frente a{" "}
                <span className="text-yellow-600 font-semibold">
                  cualquier obra social o prepaga
                </span>
              </motion.p>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="mt-12 flex flex-wrap justify-center items-center gap-8"
              >
                {[
                  { icon: Star, text: "15+ Años de Experiencia" },
                  { icon: CheckCircle, text: "Especialistas en Amparos" },
                  { icon: Scale, text: "Fuero Federal" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 1.1 + index * 0.2 }}
                    whileHover={{ scale: 1.1 }}
                    className="flex items-center space-x-2 text-yellow-600"
                  >
                    <item.icon className="h-6 w-6 fill-current" />
                    <span className="text-base font-medium">{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Especialidades Section */}
      <section id="especialidades" className="py-32 px-4 relative">
        <div className="container max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="inline-block backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-8 py-4 mb-8"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-yellow-600">
                Nos especializamos en:
              </h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed"
            >
              Defendemos tus derechos en todas las áreas de la salud
            </motion.p>
          </div>

          {/* Especialidades Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {especialidades.map((especialidad, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="group backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500 shadow-2xl h-full">
                    <CardContent className="p-6 relative overflow-hidden">
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${especialidad.color}`}
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 0.1 }}
                        transition={{ duration: 0.3 }}
                      />
                      <div className="relative z-10">
                        <motion.div
                          whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                          className={`text-yellow-600 mb-4 flex items-center justify-center p-4 rounded-2xl bg-gradient-to-br ${especialidad.color} bg-opacity-10 w-fit`}
                        >
                          {especialidad.icon}
                        </motion.div>
                        <h3 className="text-xl font-serif font-bold mb-3 text-white group-hover:text-yellow-600 transition-colors duration-300">
                          {especialidad.title}
                        </h3>
                        <p className="text-gray-200 leading-relaxed text-sm">
                          {especialidad.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contacto"
        className="py-32 px-4 relative bg-white/5 backdrop-blur-sm"
      >
        <div className="container max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="inline-block backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-8 py-4 mb-8"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-yellow-600">
                Contactanos
              </h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed mb-4"
            >
              Sabemos cómo ayudarte
            </motion.p>
            <motion.p
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-yellow-600 font-semibold text-lg"
            >
              @estudiobustosyroque
            </motion.p>
          </div>

          {/* Contact Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            {/* WhatsApp Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div whileHover={{ scale: 1.05, y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className="backdrop-blur-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-400/30 shadow-2xl">
                  <CardContent className="p-8 text-center">
                    <div className="mb-6">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                      >
                        <MessageCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        Consulta por WhatsApp
                      </h3>
                      <p className="text-gray-200 text-lg">
                        Respuesta inmediata a tu consulta
                      </p>
                    </div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        onClick={handleWhatsAppClick}
                        className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 text-lg rounded-xl transition-all duration-300 shadow-xl"
                      >
                        <MessageCircle className="mr-2 h-6 w-6" />
                        Contactar por WhatsApp
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            {/* Contact Info Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.div whileHover={{ scale: 1.05, y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className="backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-yellow-600 mb-6 text-center">
                      Información de Contacto
                    </h3>
                    <div className="space-y-4">
                      {[
                        { icon: MapPin, label: "Ubicación", text: 'La Rioja 441 PB "E", Córdoba' },
                        { icon: Phone, label: "Teléfono", text: "351-591-8047 / 351-755-5269" },
                        { icon: Mail, label: "Email", text: "estudiojuridicobustosroque@gmail.com" },
                        { icon: Clock, label: "Horario", text: "Lunes a Viernes, 8 a 19 hs" },
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                          className="flex items-center space-x-4"
                        >
                          <motion.div
                            whileHover={{ scale: 1.2, rotate: 360 }}
                            transition={{ duration: 0.5 }}
                            className="p-3 rounded-xl bg-gradient-to-br from-yellow-500/20 to-yellow-600/20"
                          >
                            <item.icon className="h-6 w-6 text-yellow-600" />
                          </motion.div>
                          <div>
                            <p className="text-sm text-gray-300">{item.label}</p>
                            <p className="text-white font-medium text-sm">{item.text}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 2 }}
      >
        <motion.div
          animate={{
            y: [0, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut",
          }}
          whileHover={{ scale: 1.2, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            onClick={handleWhatsAppClick}
            className="bg-gradient-to-r from-[#113930] to-[#113930]/70 hover:from-[#113930]/40 hover:to-[#113930]/10 text-white font-bold w-14 h-14 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center p-0"
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
            >
              <Image
                src="/whatsapp.png"
                alt="WhatsApp"
                width={32}
                height={32}
                className="w-6 h-6"
              />
            </motion.div>
          </Button>
        </motion.div>
      </motion.div>

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
                    Especialistas en Amparos de Salud
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

            {/* Social Media */}
            <div className="text-center">
              <h4 className="font-semibold text-white mb-4">Síguenos</h4>
              <p className="text-yellow-600 font-semibold text-lg">
                @estudiobustosyroque
              </p>
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

