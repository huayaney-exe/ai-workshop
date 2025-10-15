"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PrismaCard, PrismaCardContent, PrismaCardHeader, PrismaCardTitle, PrismaCardDescription } from "@/components/prisma/prisma-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

// Form validation schema
const workshopSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Por favor ingresa un email válido"),
  linkedin: z.string().min(1, "LinkedIn o cargo es requerido"),
  referidoPor: z.string().optional(),
  experiencia: z.string().min(1, "Por favor selecciona tu experiencia"),
  motivacion: z.string().min(10, "Por favor describe tu motivación (mínimo 10 caracteres)"),
  terms: z.boolean().refine((val) => val === true, "Debes aceptar los términos"),
});

type WorkshopFormValues = z.infer<typeof workshopSchema>;

export function WorkshopApplicationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useForm<WorkshopFormValues>({
    resolver: zodResolver(workshopSchema),
    mode: "onChange",
  });

  const terms = watch("terms");

  const onNextStep = async () => {
    // Validate step 1 fields
    const isValid = await trigger(["nombre", "email", "linkedin"]);
    if (isValid) {
      setCurrentStep(2);
    }
  };

  const onPrevStep = () => {
    setCurrentStep(1);
  };

  const onSubmit = async (data: WorkshopFormValues) => {
    setIsSubmitting(true);

    try {
      // Submit to Supabase via API route
      const response = await fetch('/api/submit-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit application');
      }

      console.log("Application submitted successfully:", result);
      setSubmitStatus("success");
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === "success") {
    return (
      <PrismaCard variant="glass" className="w-full">
        <PrismaCardContent className="pt-12 pb-12 text-center space-y-6">
          <div className="flex justify-center">
            <div className="h-20 w-20 rounded-full bg-[#47FFBF]/20 flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-[#47FFBF]" />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white">¡Aplicación Enviada!</h3>
            <p className="text-gray-400">
              Revisamos tu aplicación en 24-48 horas y te contactaremos al email proporcionado.
            </p>
          </div>
          <Button
            variant="prisma-primary"
            onClick={() => {
              setSubmitStatus("idle");
              setCurrentStep(1);
            }}
            className="mt-4"
          >
            Enviar Otra Aplicación
          </Button>
        </PrismaCardContent>
      </PrismaCard>
    );
  }

  return (
    <PrismaCard variant="glass" className="w-full">
      <PrismaCardHeader>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "h-2 w-2 rounded-full transition-colors",
                currentStep >= 1 ? "bg-[#47FFBF]" : "bg-gray-600"
              )}
            />
            <div
              className={cn(
                "h-2 w-2 rounded-full transition-colors",
                currentStep >= 2 ? "bg-[#47FFBF]" : "bg-gray-600"
              )}
            />
          </div>
          <span className="text-xs text-gray-500">Paso {currentStep} de 2</span>
        </div>
        <PrismaCardTitle className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-[#47FFBF] via-[#286CFF] to-[#8376FF] bg-clip-text text-transparent mb-3">
          ✨ Aplicar al Workshop
        </PrismaCardTitle>
        <PrismaCardDescription className="text-gray-300 text-base">
          Lima, 22 Nov • 4h prácticas • $99 USD
        </PrismaCardDescription>
      </PrismaCardHeader>

      <PrismaCardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-2">
                <Label htmlFor="nombre" className="text-gray-300">
                  Nombre completo
                </Label>
                <Input
                  id="nombre"
                  {...register("nombre")}
                  placeholder="Ej: Juan Pérez Rodríguez"
                  className={cn(
                    "bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-[#47FFBF] transition-colors",
                    errors.nombre && "border-red-500"
                  )}
                />
                {errors.nombre && (
                  <p className="text-sm text-red-500">{errors.nombre.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="Ej: juan.perez@empresa.com"
                  className={cn(
                    "bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-[#47FFBF] transition-colors",
                    errors.email && "border-red-500"
                  )}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin" className="text-gray-300">
                  LinkedIn o cargo actual
                </Label>
                <Input
                  id="linkedin"
                  {...register("linkedin")}
                  placeholder="Ej: linkedin.com/in/juanperez o Product Manager en Startup"
                  className={cn(
                    "bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-[#47FFBF] transition-colors",
                    errors.linkedin && "border-red-500"
                  )}
                />
                {errors.linkedin && (
                  <p className="text-sm text-red-500">{errors.linkedin.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="referidoPor" className="text-gray-300">
                  ¿Alguien te refirió? <span className="text-gray-500 text-sm">(opcional)</span>
                </Label>
                <Input
                  id="referidoPor"
                  {...register("referidoPor")}
                  placeholder="Ej: María García o nombre de quien te recomendó"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-[#47FFBF] transition-colors"
                />
              </div>

              <Button
                type="button"
                variant="prisma-primary"
                onClick={onNextStep}
                className="w-full text-lg font-bold py-6 shadow-[0_0_25px_rgba(71,255,191,0.4)] hover:shadow-[0_0_35px_rgba(71,255,191,0.6)] hover:scale-[1.02] transition-all duration-300"
              >
                Siguiente →
              </Button>
            </div>
          )}

          {/* Step 2: Qualification Info */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-2">
                <Label htmlFor="experiencia" className="text-gray-300">
                  Años de experiencia en producto
                </Label>
                <Select onValueChange={(value) => setValue("experiencia", value)}>
                  <SelectTrigger
                    id="experiencia"
                    className={cn(
                      "bg-white/5 border-white/10 text-white focus:border-[#47FFBF] transition-colors",
                      errors.experiencia && "border-red-500"
                    )}
                  >
                    <SelectValue placeholder="Selecciona..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-2">0-2 años</SelectItem>
                    <SelectItem value="2-5">2-5 años</SelectItem>
                    <SelectItem value="5-10">5-10 años</SelectItem>
                    <SelectItem value="10+">10+ años</SelectItem>
                  </SelectContent>
                </Select>
                {errors.experiencia && (
                  <p className="text-sm text-red-500">{errors.experiencia.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="motivacion" className="text-gray-300">
                  ¿Por qué quieres participar?
                </Label>
                <Textarea
                  id="motivacion"
                  {...register("motivacion")}
                  rows={3}
                  placeholder="Ej: Quiero aprender a usar IA para automatizar procesos en mi equipo y reducir tiempo de desarrollo..."
                  className={cn(
                    "bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-[#47FFBF] transition-colors resize-none",
                    errors.motivacion && "border-red-500"
                  )}
                />
                {errors.motivacion && (
                  <p className="text-sm text-red-500">{errors.motivacion.message}</p>
                )}
              </div>

              <div className="flex items-start gap-3">
                <Checkbox
                  id="terms"
                  checked={terms}
                  onCheckedChange={(checked) => setValue("terms", checked === true)}
                  className="mt-1"
                />
                <Label htmlFor="terms" className="text-sm text-gray-400 cursor-pointer leading-relaxed">
                  Acepto términos y política de privacidad
                </Label>
              </div>
              {errors.terms && (
                <p className="text-sm text-red-500">{errors.terms.message}</p>
              )}

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onPrevStep}
                  className="flex-1 bg-white/5 border-white/10 text-white hover:bg-white/10"
                >
                  ← Volver
                </Button>
                <Button
                  type="submit"
                  variant="prisma-primary"
                  disabled={isSubmitting}
                  className="flex-1 text-lg font-bold py-6 shadow-[0_0_25px_rgba(71,255,191,0.4)] hover:shadow-[0_0_35px_rgba(71,255,191,0.6)] hover:scale-[1.02] transition-all duration-300"
                >
                  {isSubmitting ? "Enviando..." : "✨ Aplicar"}
                </Button>
              </div>

              <p className="text-xs text-gray-500 text-center">
                Revisamos tu aplicación en 24-48 horas
              </p>
            </div>
          )}

          {/* Error message */}
          {submitStatus === "error" && (
            <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500">
              <AlertCircle className="h-5 w-5" />
              <p className="text-sm">Algo salió mal. Por favor intenta de nuevo.</p>
            </div>
          )}
        </form>
      </PrismaCardContent>
    </PrismaCard>
  );
}
