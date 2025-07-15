"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  Scale,
  Shield,
  FileText,
  Car,
  Calculator,
  Users,
  CheckCircle,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { format, addDays, isBefore, startOfDay } from "date-fns";
import { es } from "date-fns/locale";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

interface BookingFormData {
  nombre: string;
  email: string;
  telefono: string;
  tipoConsulta: string;
  abogado: string;
  fecha: Date | undefined;
  hora: string;
  descripcion: string;
  modalidad: "presencial" | "llamada";
}

const consultationTypes = [
  {
    value: "amparos-salud",
    label: "Amparos de Salud",
    icon: <Shield className="h-4 w-4" />,
    description: "Protección de derechos en materia de salud",
    lawyer: "Diego Bustos",
  },
  {
    value: "penal",
    label: "Derecho Penal",
    icon: <Scale className="h-4 w-4" />,
    description: "Defensa en procesos penales",
    lawyer: "Diego Bustos",
  },
  {
    value: "civil",
    label: "Derecho Civil",
    icon: <FileText className="h-4 w-4" />,
    description: "Contratos, sucesiones, daños y perjuicios",
    lawyer: "José Roque",
  },
  {
    value: "accidentes",
    label: "Accidentes y ART",
    icon: <Car className="h-4 w-4" />,
    description: "Reclamos por accidentes de tránsito y trabajo",
    lawyer: "Diego Bustos",
  },
  {
    value: "tributario",
    label: "Derecho Tributario",
    icon: <Calculator className="h-4 w-4" />,
    description: "Asesoramiento fiscal y aduanero",
    lawyer: "José Roque",
  },
  {
    value: "laboral",
    label: "Derecho Laboral",
    icon: <Users className="h-4 w-4" />,
    description: "Relaciones laborales y conflictos",
    lawyer: "José Roque",
  },
];

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
];

export function BookingForm() {
  const [formData, setFormData] = useState<BookingFormData>({
    nombre: "",
    email: "",
    telefono: "",
    tipoConsulta: "",
    abogado: "",
    fecha: undefined,
    hora: "",
    descripcion: "",
    modalidad: "presencial",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [pendingSubmit, setPendingSubmit] = useState<React.FormEvent | null>(null);
  const [quieroReservarTurno, setQuieroReservarTurno] = useState<boolean>(false);
  const [showAnimCalendar, setShowAnimCalendar] = useState<boolean>(true);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setFormData({ ...formData, fecha: date });
  };

  const handleConsultationTypeChange = (value: string) => {
    const consultation = consultationTypes.find(c => c.value === value);
    setFormData({
      ...formData,
      tipoConsulta: value,
      abogado: consultation?.lawyer || "",
    });
  };

  const isDateDisabled = (date: Date) => {
    const today = startOfDay(new Date());
    const selectedDateStart = startOfDay(date);
    
    // Deshabilitar fechas pasadas y fines de semana
    return isBefore(selectedDateStart, today) || 
           date.getDay() === 0 || // Domingo
           date.getDay() === 6;   // Sábado
  };

  const createGoogleCalendarEvent = async (bookingData: BookingFormData) => {
    if (!bookingData.fecha || !bookingData.hora) return;

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: bookingData.nombre,
          email: bookingData.email,
          telefono: bookingData.telefono,
          tipoConsulta: bookingData.tipoConsulta,
          abogado: bookingData.abogado,
          fecha: bookingData.fecha.toISOString(),
          hora: bookingData.hora,
          descripcion: bookingData.descripcion,
          modalidad: bookingData.modalidad,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al procesar la reserva');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error al crear el evento:', error);
      throw error;
    }
  };

  // Enviar solo email de consulta inicial (sin reserva de turno)
  const sendInitialConsultationEmail = async (data: BookingFormData) => {
    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: data.nombre,
          email: data.email,
          telefono: data.telefono,
          tipoConsulta: data.tipoConsulta,
          abogado: data.abogado,
          descripcion: data.descripcion,
          modalidad: data.modalidad,
          // No se envía fecha ni hora
        }),
      });
      if (!response.ok) throw new Error("Error al enviar la consulta inicial");
      return await response.json();
    } catch (error) {
      console.error("Error al enviar consulta inicial:", error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (quieroReservarTurno) {
      // Mostrar modal de precio antes de enviar
      setPendingSubmit(e);
      setShowPriceModal(true);
    } else {
      // Validar campos básicos
      if (!formData.nombre || !formData.email || !formData.telefono || !formData.tipoConsulta || !formData.abogado || !formData.descripcion) {
        alert("Por favor completa todos los campos obligatorios.");
        return;
      }
      setIsSubmitting(true);
      try {
        await sendInitialConsultationEmail(formData);
        alert("¡Consulta enviada exitosamente!\n\nTu caso será evaluado por nuestro equipo y te contactaremos a la brevedad.\n\nGracias por confiar en Bustos & Roque.");
        setFormData({
          nombre: "",
          email: "",
          telefono: "",
          tipoConsulta: "",
          abogado: "",
          fecha: undefined,
          hora: "",
          descripcion: "",
          modalidad: "presencial",
        });
        setSelectedDate(undefined);
        setStep(1);
      } catch (error) {
        alert("Error al enviar la consulta. Por favor, inténtalo nuevamente.");
      } finally {
        setIsSubmitting(false);
        setPendingSubmit(null);
      }
    }
  };

  // Confirmar y enviar la reserva después del modal
  const confirmAndSubmit = async () => {
    setShowPriceModal(false);
    setIsSubmitting(true);
    try {
      await createGoogleCalendarEvent(formData);
      alert(`¡Consulta reservada exitosamente!\n\n📅 Fecha: ${formData.fecha ? format(formData.fecha, 'dd/MM/yyyy', { locale: es }) : ''}\n🕐 Hora: ${formData.hora}\n👨‍💼 Abogado: ${formData.abogado}\n📍 Modalidad: ${formData.modalidad === 'presencial' ? 'Presencial' : 'Llamada'}\n📋 Tipo: ${consultationTypes.find(c => c.value === formData.tipoConsulta)?.label}\n\n✅ La consulta ha sido agregada al calendario del estudio\n📧 Recibirás un email de confirmación con los detalles\n🔔 Recordatorios automáticos 24h y 30min antes\n\n¡Gracias por confiar en Bustos & Roque!`);
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        tipoConsulta: "",
        abogado: "",
        fecha: undefined,
        hora: "",
        descripcion: "",
        modalidad: "presencial",
      });
      setSelectedDate(undefined);
      setStep(1);
    } catch (error) {
      alert('Error al reservar la consulta. Por favor, inténtalo nuevamente.');
    } finally {
      setIsSubmitting(false);
      setPendingSubmit(null);
    }
  };

  const nextStep = () => {
    if (step === 1 && formData.nombre && formData.email && formData.telefono) {
      setStep(2);
    } else if (step === 2 && formData.tipoConsulta) {
      setStep(3);
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Modal de confirmación de precio */}
      <Dialog open={showPriceModal} onOpenChange={setShowPriceModal}>
        <DialogContent
          className="
            w-full
            max-w-xs
            sm:max-w-md
            mx-auto
            my-6
            rounded-2xl
            backdrop-blur-xl
            bg-white/10
            border border-white/20
            shadow-2xl
            px-4 sm:px-8 py-6
          "
        >
          <DialogHeader>
            <DialogTitle asChild>
              <h3 className="text-xl font-bold text-yellow-400 mb-2">Confirmar Consulta</h3>
            </DialogTitle>
          </DialogHeader>
          <div className="text-gray-200 text-base mb-4">
            ¿Deseas confirmar tu consulta?
            <br />
            <span className="block mt-2 text-lg text-yellow-300 font-semibold">
              El valor de la consulta es de <span className="text-2xl font-bold">$69.000</span>.
            </span>
            <span className="block mt-4 text-yellow-200 text-base font-semibold bg-yellow-400/20 rounded-lg px-3 py-2 text-center">
              <Mail className="inline h-5 w-5 mr-1 text-yellow-300 align-text-bottom" />
              Recibirás todos los detalles y recordatorios por email
            </span>
          </div>
          <DialogFooter className="flex flex-row gap-2 justify-end">
            <Button
              variant="outline"
              onClick={() => setShowPriceModal(false)}
              className="bg-white/10 border-white/20 text-gray-300 hover:bg-white/20 hover:border-white/40"
            >
              Volver
            </Button>
            <Button
              onClick={confirmAndSubmit}
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold"
              disabled={isSubmitting}
            >
              Confirmar y Reservar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Card className="backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl overflow-hidden">
        <CardContent className="p-3 sm:p-4 md:p-6 lg:p-10">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 mb-3 sm:mb-4">
              <CalendarIcon className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-yellow-400 mb-2">
              Reserva tu Consulta
            </h2>
            <p className="text-gray-200 text-base sm:text-lg">
              Agenda una consulta personalizada con nuestros especialistas
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-6 sm:mb-8">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all duration-300 ${
                    step >= stepNumber
                      ? "bg-yellow-400 text-black"
                      : "bg-white/10 text-gray-400"
                  }`}
                >
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div
                    className={`w-8 sm:w-16 h-1 mx-1 sm:mx-2 transition-all duration-300 ${
                      step > stepNumber ? "bg-yellow-400" : "bg-white/10"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Step 1: Información Personal */}
            {step === 1 && (
              <div className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200 mb-2">
                      <User className="inline h-4 w-4 mr-2" />
                      Nombre Completo
                    </label>
                    <Input
                      type="text"
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      className="backdrop-blur-xl bg-white/10 border-2 border-white/20 focus:border-yellow-400 text-white placeholder:text-gray-400 rounded-xl py-2 sm:py-3 px-3 sm:px-4 text-sm sm:text-base transition-all duration-300"
                      placeholder="Tu nombre completo"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200 mb-2">
                      <Mail className="inline h-4 w-4 mr-2" />
                      Email
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="backdrop-blur-xl bg-white/10 border-2 border-white/20 focus:border-yellow-400 text-white placeholder:text-gray-400 rounded-xl py-2 sm:py-3 px-3 sm:px-4 text-sm sm:text-base transition-all duration-300"
                      placeholder="tu@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-200 mb-2">
                    <Phone className="inline h-4 w-4 mr-2" />
                    Teléfono
                  </label>
                  <Input
                    type="tel"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    className="backdrop-blur-xl bg-white/10 border-2 border-white/20 focus:border-yellow-400 text-white placeholder:text-gray-400 rounded-xl py-2 sm:py-3 px-3 sm:px-4 text-sm sm:text-base transition-all duration-300"
                    placeholder="+54 9 351 XXX XXXX"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-200 mb-2">
                    <MapPin className="inline h-4 w-4 mr-2" />
                    Modalidad de Consulta
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, modalidad: "presencial" })}
                      className={`p-3 sm:p-4 rounded-xl border-2 transition-all duration-300 ${
                        formData.modalidad === "presencial"
                          ? "border-yellow-400 bg-yellow-400/10 text-yellow-400"
                          : "border-white/20 bg-white/5 text-gray-300 hover:border-white/40"
                      }`}
                    >
                      <MapPin className="h-5 w-5 sm:h-6 sm:w-6 mx-auto mb-2" />
                      <span className="font-semibold text-sm sm:text-base">Presencial</span>
                      <p className="text-xs sm:text-sm opacity-80">En nuestro estudio</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, modalidad: "llamada" })}
                      className={`p-3 sm:p-4 rounded-xl border-2 transition-all duration-300 ${
                        formData.modalidad === "llamada"
                          ? "border-yellow-400 bg-yellow-400/10 text-yellow-400"
                          : "border-white/20 bg-white/5 text-gray-300 hover:border-white/40"
                      }`}
                    >
                      <Phone className="h-5 w-5 sm:h-6 sm:w-6 mx-auto mb-2" />
                      <span className="font-semibold text-sm sm:text-base">Llamada</span>
                      <p className="text-xs sm:text-sm opacity-80">Por teléfono</p>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Tipo de Consulta */}
            {step === 2 && (
              <div className="space-y-4 sm:space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-200 mb-3 sm:mb-4">
                    <Scale className="inline h-4 w-4 mr-2" />
                    Tipo de Consulta Legal
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    {consultationTypes.map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => handleConsultationTypeChange(type.value)}
                        className={`p-4 sm:p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                          formData.tipoConsulta === type.value
                            ? "border-yellow-400 bg-yellow-400/10 text-yellow-400"
                            : "border-white/20 bg-white/5 text-gray-300 hover:border-white/40"
                        }`}
                      >
                        <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                          <div className="text-yellow-400">{type.icon}</div>
                          <h3 className="font-bold text-base sm:text-lg">{type.label}</h3>
                        </div>
                        <p className="text-xs sm:text-sm opacity-80 mb-2">{type.description}</p>
                        <div className="flex items-center text-xs opacity-60">
                          <User className="h-3 w-3 mr-1" />
                          {type.lawyer}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {formData.tipoConsulta && (
                  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-yellow-400" />
                      <div>
                        <p className="text-yellow-400 font-semibold">
                          Abogado asignado: {formData.abogado}
                        </p>
                        <p className="text-gray-300 text-sm">
                          {consultationTypes.find(c => c.value === formData.tipoConsulta)?.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Fecha y Hora + Toggle */}
            {step === 3 && (
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <Switch
                    checked={quieroReservarTurno}
                    onCheckedChange={(checked) => {
                      setQuieroReservarTurno(checked);
                      setShowAnimCalendar(false);
                      setTimeout(() => setShowAnimCalendar(true), 10);
                    }}
                    id="toggle-turno"
                    className={
                      quieroReservarTurno
                        ? 'bg-yellow-400 border-yellow-400 data-[state=checked]:bg-yellow-400'
                        : 'bg-gray-600 border-gray-500 data-[state=unchecked]:bg-gray-600'
                    }
                  />
                  <label htmlFor="toggle-turno" className="text-base font-semibold select-none cursor-pointer transition-colors duration-300"
                    style={{ color: quieroReservarTurno ? '#facc15' : '#fff' }}
                  >
                    {quieroReservarTurno
                      ? 'Quiero reservar un turno ahora'
                      : 'Solo quiero contar mi caso (sin reservar turno)'}
                  </label>
                </div>
                {/* Calendario y hora solo si quiero reservar turno */}
                <div
                  className={`transition-all duration-500 ${quieroReservarTurno && showAnimCalendar ? 'opacity-100 max-h-[1000px]' : 'opacity-0 max-h-0 overflow-hidden'}`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                    <div className="space-y-3 sm:space-y-4">
                      <label className="block text-sm font-semibold text-gray-200 mb-3 sm:mb-4">
                        <CalendarIcon className="inline h-4 w-4 mr-2" />
                        Selecciona una Fecha
                      </label>
                      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-2 sm:p-4 overflow-hidden">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={handleDateSelect}
                          disabled={isDateDisabled}
                          className="text-white w-full"
                          classNames={{
                            day_selected: "!bg-yellow-400 !text-black !font-semibold",
                            day_today: "!bg-yellow-400/20 !text-yellow-400 !font-semibold",
                            day_outside: "!text-gray-500 !opacity-50",
                            day_disabled: "!text-gray-500 !opacity-50 !cursor-not-allowed",
                          }}
                        />
                      </div>
                    </div>
                    <div className="space-y-3 sm:space-y-4">
                      <label className="block text-sm font-semibold text-gray-200 mb-3 sm:mb-4">
                        <Clock className="inline h-4 w-4 mr-2" />
                        Selecciona un Horario
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setFormData({ ...formData, hora: time })}
                            className={`p-2 sm:p-3 rounded-lg border-2 transition-all duration-300 text-sm sm:text-base ${
                              formData.hora === time
                                ? "border-yellow-400 bg-yellow-400/10 text-yellow-400"
                                : "border-white/20 bg-white/5 text-gray-300 hover:border-white/40"
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Resumen de la reserva */}
                  {(formData.fecha || formData.hora) && (
                    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6 mt-4">
                      <h3 className="text-yellow-400 font-bold mb-3 sm:mb-4 text-base sm:text-lg">Resumen de tu Reserva</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
                        <div>
                          <p className="text-gray-400">Fecha:</p>
                          <p className="text-white font-semibold">
                            {formData.fecha ? format(formData.fecha, 'dd/MM/yyyy', { locale: es }) : 'No seleccionada'}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400">Hora:</p>
                          <p className="text-white font-semibold">{formData.hora || 'No seleccionada'}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Abogado:</p>
                          <p className="text-white font-semibold">{formData.abogado}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Modalidad:</p>
                          <p className="text-white font-semibold">
                            {formData.modalidad === 'presencial' ? 'Presencial' : 'Llamada'}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {/* Campo de descripción siempre visible */}
                <div className="space-y-2 mt-4">
                  <label className="block text-sm font-semibold text-gray-200 mb-2">
                    Descripción de la Consulta
                  </label>
                  <Textarea
                    value={formData.descripcion}
                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                    className="backdrop-blur-xl bg-white/10 border-2 border-white/20 focus:border-yellow-400 text-white placeholder:text-gray-400 rounded-xl py-3 px-4 text-base sm:text-lg min-h-[100px] sm:min-h-[120px] transition-all duration-300"
                    placeholder="Describe brevemente tu consulta legal..."
                    required
                  />
                </div>
              </div>
            )}
            {/* Navigation Buttons y Submit adaptado */}
            <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 pt-4 sm:pt-6">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  className="backdrop-blur-xl bg-white/10 border-2 border-white/20 text-white hover:bg-white/20 hover:border-white/40 px-4 sm:px-6 py-2 sm:py-3 rounded-xl transition-all duration-300 text-sm sm:text-base order-2 sm:order-1"
                >
                  Anterior
                </Button>
              )}
              {step < 3 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={
                    (step === 1 && (!formData.nombre || !formData.email || !formData.telefono)) ||
                    (step === 2 && !formData.tipoConsulta)
                  }
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold px-6 sm:px-8 py-2 sm:py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base order-1 sm:order-2"
                >
                  Siguiente
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    (quieroReservarTurno && (!formData.fecha || !formData.hora)) ||
                    !formData.descripcion
                  }
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold px-6 sm:px-8 py-2 sm:py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base order-1 sm:order-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                      {quieroReservarTurno ? "Reservando..." : "Enviando..."}
                    </>
                  ) : (
                    <>
                      {quieroReservarTurno ? (
                        <>
                          Confirmar Reserva
                          <CheckCircle className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                        </>
                      ) : (
                        <>
                          Enviar Consulta
                          <CheckCircle className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                        </>
                      )}
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 