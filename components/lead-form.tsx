"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { getStoredUtmParameters } from "@/components/tracking";
import { trackLead, trackCompleteRegistration } from "@/components/meta-pixel-events";

// Declarar tipos para Meta Pixel y Google Analytics
declare global {
  interface Window {
    fbq: (...args: any[]) => void;
    gtag: (...args: any[]) => void;
  }
}

interface LeadFormData {
  tipoProblema: string;
  obraSocial: string;
  urgencia: string;
  descripcion: string;
  nombre: string;
  telefono: string;
  email: string;
}

const TIPOS_PROBLEMA = [
  "Discapacidad",
  "Medicamentos de alto costo",
  "Enfermedades poco frecuentes",
  "Diabetes",
  "Cáncer",
  "Tratamientos de fertilidad",
  "Falta de cobertura de prestaciones",
  "Baja de afiliación",
  "Valores por preexistencia",
  "Mantenimiento de obra social de jubilados",
  "Cambio de obra social",
  "Otro",
];

const OBRAS_SOCIALES = [
  "OSDE",
  "Swiss Medical",
  "Galeno",
  "OSECAC",
  "PAMI",
  "IOMA",
  "Obra Social del Personal de la Construcción",
  "Obra Social de Empleados de Comercio",
  "Obra Social de la Unión Obrera Metalúrgica",
  "Obra Social del Personal de la Sanidad",
  "Otra",
];

const URGENCIAS = [
  { value: "alta", label: "Alta (necesito el tratamiento ya)" },
  { value: "media", label: "Media" },
  { value: "baja", label: "Baja" },
];

interface LeadFormProps {
  onSuccess?: () => void;
}

export function LeadForm({ onSuccess }: LeadFormProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<LeadFormData>({
    tipoProblema: "",
    obraSocial: "",
    urgencia: "",
    descripcion: "",
    nombre: "",
    telefono: "",
    email: "",
  });

  const totalSteps = 5;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleInputChange = (
    field: keyof LeadFormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return !!formData.tipoProblema;
      case 2:
        return !!formData.obraSocial;
      case 3:
        return !!formData.urgencia;
      case 4:
        return !!formData.descripcion.trim();
      case 5:
        return !!formData.nombre.trim() && !!formData.telefono.trim();
      default:
        return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canProceed()) return;

    setIsSubmitting(true);

    try {
      // Obtener UTM parameters
      const utmData = getStoredUtmParameters() || {};

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          utm_source: utmData.utm_source,
          utm_medium: utmData.utm_medium,
          utm_campaign: utmData.utm_campaign,
          utm_term: utmData.utm_term,
          utm_content: utmData.utm_content,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al enviar el formulario");
      }

      // Track Meta Pixel events estándar
      trackLead({
        content_name: "Obra Social Lead Form",
        content_category: formData.tipoProblema,
        source: "form_submit",
      });
      
      trackCompleteRegistration({
        content_name: "Obra Social Lead Form",
        status: true,
      });

      // Track Google Analytics
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "conversion", {
          send_to: "AW-CONVERSION_ID/CONVERSION_LABEL",
          event_category: "lead",
          event_label: "obra_social_form",
        });
      }

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      alert("Hubo un error al enviar tu consulta. Por favor, intenta nuevamente o contáctanos por WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                ¿Qué tipo de problema tenés?
              </h3>
              <p className="text-sm md:text-base text-gray-300">
                Seleccioná la opción que mejor describe tu situación
              </p>
            </div>
            <Select
              value={formData.tipoProblema}
              onValueChange={(value) => handleInputChange("tipoProblema", value)}
            >
              <SelectTrigger className="w-full h-11 md:h-12 bg-white/15 border-white/30 text-white text-sm md:text-base hover:bg-white/20 focus:ring-2 focus:ring-yellow-500/50">
                <SelectValue placeholder="Seleccioná un problema" className="text-white placeholder:text-gray-300" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a4a3e] border-white/20 backdrop-blur-xl text-white max-h-[300px]">
                {TIPOS_PROBLEMA.map((problema) => (
                  <SelectItem 
                    key={problema} 
                    value={problema}
                    className="text-white focus:bg-white/20 focus:text-white cursor-pointer"
                  >
                    {problema}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                ¿Tu obra social o prepaga?
              </h3>
              <p className="text-sm md:text-base text-gray-300">
                Indicá con cuál estás teniendo el problema
              </p>
            </div>
            <Select
              value={formData.obraSocial}
              onValueChange={(value) => handleInputChange("obraSocial", value)}
            >
              <SelectTrigger className="w-full h-11 md:h-12 bg-white/15 border-white/30 text-white text-sm md:text-base hover:bg-white/20 focus:ring-2 focus:ring-yellow-500/50">
                <SelectValue placeholder="Seleccioná tu obra social o prepaga" className="text-white placeholder:text-gray-300" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a4a3e] border-white/20 backdrop-blur-xl text-white max-h-[300px]">
                {OBRAS_SOCIALES.map((obra) => (
                  <SelectItem 
                    key={obra} 
                    value={obra}
                    className="text-white focus:bg-white/20 focus:text-white cursor-pointer"
                  >
                    {obra}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                ¿Cuál es la urgencia?
              </h3>
              <p className="text-sm md:text-base text-gray-300">
                Esto nos ayuda a priorizar tu consulta
              </p>
            </div>
            <div className="space-y-2">
              {URGENCIAS.map((urgencia) => (
                <button
                  key={urgencia.value}
                  type="button"
                  onClick={() => handleInputChange("urgencia", urgencia.value)}
                  className={`w-full p-3 md:p-4 rounded-lg border-2 text-left transition-all text-sm md:text-base ${
                    formData.urgencia === urgencia.value
                      ? "border-yellow-500 bg-yellow-500/20 text-white"
                      : "border-white/20 bg-white/5 text-gray-300 hover:border-white/40 hover:bg-white/10"
                  }`}
                >
                  {urgencia.label}
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                Contanos qué ocurrió
              </h3>
              <p className="text-sm md:text-base text-gray-300">
                Describí tu situación brevemente
              </p>
            </div>
            <Textarea
              value={formData.descripcion}
              onChange={(e) => handleInputChange("descripcion", e.target.value)}
              placeholder="Ej: Me negaron la autorización de un medicamento..."
              className="min-h-[100px] md:min-h-[120px] bg-white/10 border-white/20 text-white placeholder:text-gray-400 text-sm md:text-base"
            />
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                Tus datos de contacto
              </h3>
              <p className="text-sm md:text-base text-gray-300">
                Necesitamos esta información para contactarte
              </p>
            </div>
            <div className="space-y-3">
              <div>
                <Label htmlFor="nombre" className="text-white mb-1.5 block text-sm md:text-base">
                  Nombre completo <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) => handleInputChange("nombre", e.target.value)}
                  placeholder="Juan Pérez"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-11 md:h-12 text-sm md:text-base"
                  required
                />
              </div>
              <div>
                <Label htmlFor="telefono" className="text-white mb-1.5 block text-sm md:text-base">
                  Teléfono <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="telefono"
                  type="tel"
                  value={formData.telefono}
                  onChange={(e) => handleInputChange("telefono", e.target.value)}
                  placeholder="351 123-4567"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-11 md:h-12 text-sm md:text-base"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-white mb-1.5 block text-sm md:text-base">
                  Email (opcional)
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="juan@ejemplo.com"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-11 md:h-12 text-sm md:text-base"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="backdrop-blur-xl bg-white/5 border border-white/20 shadow-2xl">
      <CardContent className="p-4 md:p-6">
        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs md:text-sm text-gray-300">
              Paso {step} de {totalSteps}
            </span>
            <span className="text-xs md:text-sm text-gray-300">
              {Math.round((step / totalSteps) * 100)}%
            </span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-1.5 md:h-2">
            <motion.div
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-1.5 md:h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(step / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="min-h-[250px] md:min-h-[300px] mb-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between gap-3">
            {step > 1 && (
              <Button
                type="button"
                onClick={handleBack}
                variant="outline"
                className="flex-1 border-white/20 bg-white/5 text-white hover:bg-white/10 text-sm md:text-base"
                size="sm"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Atrás
              </Button>
            )}
            {step < totalSteps ? (
              <Button
                type="button"
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white text-sm md:text-base"
                size="sm"
              >
                Continuar
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={!canProceed() || isSubmitting}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-sm md:text-base"
                size="sm"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Enviar consulta
                  </>
                )}
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

