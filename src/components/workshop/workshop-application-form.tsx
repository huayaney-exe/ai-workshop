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
import { SparkleBurst } from "@/components/effects/sparkle-burst";
import { Confetti } from "@/components/effects/confetti";

// Form validation schema
const workshopSchema = z.object({
  // Step 1: Professional Information
  empresa: z.string().min(2, "El nombre de la empresa es requerido"),
  experiencia: z.string().min(1, "Por favor selecciona tu experiencia"),
  cargo: z.string().min(2, "El cargo es requerido"),
  linkedin: z.string().min(1, "LinkedIn es requerido"),

  // Step 2: Personal Information
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Por favor ingresa un email válido"),
  telefono: z.string().min(1, "El teléfono es requerido"),
  codigoPais: z.string().min(1, "Código de país requerido"),
  fueReferido: z.boolean(),
  referidoPor: z.string().optional(),
  motivacion: z.string()
    .min(1, "Este campo es requerido")
    .max(1000, "Máximo 1000 caracteres"),

  // Step 3: Confirmation
  confirmacion: z.boolean().refine((val) => val === true, "Debes confirmar para continuar"),
}).superRefine((data, ctx) => {
  // Conditional phone validation based on country code
  const phone = data.telefono;
  const countryCode = data.codigoPais;

  // Basic validation: only digits
  if (!/^\d+$/.test(phone)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "El teléfono debe contener solo números",
      path: ["telefono"],
    });
    return;
  }

  // For Peru (+51): exactly 9 digits
  if (countryCode === "+51") {
    if (phone.length !== 9) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "El teléfono debe tener exactamente 9 dígitos",
        path: ["telefono"],
      });
    }
  } else {
    // For other countries: minimum 7 digits, no maximum
    if (phone.length < 7) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "El teléfono debe tener al menos 7 dígitos",
        path: ["telefono"],
      });
    }
  }
});

type WorkshopFormValues = z.infer<typeof workshopSchema>;

export function WorkshopApplicationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [showSparkles, setShowSparkles] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [leadId, setLeadId] = useState<string | null>(null);

  // Coupon and pricing states
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");
  const BASE_PRICE = 610;
  const DISCOUNT_PERCENT = 20;
  const finalPrice = couponApplied ? BASE_PRICE * (1 - DISCOUNT_PERCENT / 100) : BASE_PRICE;

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
    defaultValues: {
      fueReferido: false,
      confirmacion: false,
      codigoPais: "+51",
    },
  });

  const fueReferido = watch("fueReferido");
  const confirmacion = watch("confirmacion");

  const applyCoupon = () => {
    const validCoupons = ["AICONNECT", "PRISMA", "TONY", "SHIFT"];
    const normalizedCode = couponCode.trim().toUpperCase();

    if (validCoupons.includes(normalizedCode)) {
      setCouponApplied(true);
      setCouponError("");
    } else {
      setCouponApplied(false);
      setCouponError("Código de cupón inválido");
    }
  };

  // Progressive save function - saves partial data after each step
  const saveProgress = async (step: number) => {
    try {
      const formData = watch();

      const response = await fetch('/api/workshop/save-progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          step,
          ...formData,
        }),
      });

      const result = await response.json();

      if (result.success && result.saved && result.lead_id) {
        setLeadId(result.lead_id);
      }

      // Silent save - don't show errors to user
      // Just log for debugging
      if (!result.saved) {
        console.info('Progressive save not completed:', result.message);
      }
    } catch (error) {
      // Silent failure - don't disrupt user experience
      console.info('Progressive save failed silently:', error);
    }
  };

  const onNextStep = async () => {
    let isValid = false;

    if (currentStep === 1) {
      // Validate step 1: Professional Information
      isValid = await trigger(["empresa", "experiencia", "cargo", "linkedin"]);
    } else if (currentStep === 2) {
      // Validate step 2: Personal Information + Motivation
      const fieldsToValidate: (keyof WorkshopFormValues)[] = ["nombre", "email", "telefono", "motivacion"];
      if (fueReferido) {
        fieldsToValidate.push("referidoPor");
      }
      isValid = await trigger(fieldsToValidate);
    }

    if (isValid) {
      // Progressive save: ONLY save after Step 2 (before price reveal)
      // This captures users who drop off after seeing the pricing
      if (currentStep === 2) {
        await saveProgress(currentStep);
      }

      // Move to next step
      setCurrentStep(currentStep + 1);
    }
  };

  const onPrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const onSubmit = async (data: WorkshopFormValues) => {
    setIsSubmitting(true);

    try {
      // Submit to Supabase via API route with pricing and coupon info
      const response = await fetch('/api/workshop/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          precioFinal: finalPrice,
          codigoCupon: couponApplied ? couponCode.trim().toUpperCase() : null,
          leadId: leadId, // Include leadId if we have one from progressive save
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit application');
      }

      console.log("Application submitted successfully:", result);

      // Trigger sparkle burst effect
      setShowSparkles(true);

      // After sparkles, show success state and confetti
      setTimeout(() => {
        setSubmitStatus("success");
        setShowConfetti(true);
      }, 800);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === "success") {
    return (
      <>
        {/* Confetti celebration effect */}
        <Confetti trigger={showConfetti} />

        <PrismaCard variant="glass" className="w-full">
          <PrismaCardContent className="pt-12 pb-12 text-center space-y-6">
            <div className="flex justify-center">
              <div className="h-20 w-20 rounded-full bg-[#47FFBF]/20 flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10 text-[#47FFBF]" />
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">
                ¡Aplicación Recibida Exitosamente! 🎉
              </h3>
              <p className="text-gray-300 leading-relaxed max-w-md mx-auto">
                Gracias por tu interés en AI Native. Estamos revisando tu aplicación.
              </p>

              {/* Next Steps Section */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 mt-4 text-left max-w-md mx-auto">
                <p className="text-white font-semibold mb-3 text-sm">
                  📋 Próximos pasos:
                </p>
                <ol className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-[#47FFBF] shrink-0 font-bold">1.</span>
                    <span>Revisaremos tu aplicación en las próximas 24-48 horas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#47FFBF] shrink-0 font-bold">2.</span>
                    <span>De ser seleccionado, coordinaremos confirmación y enviaremos link de pago (Mercado Pago)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#47FFBF] shrink-0 font-bold">3.</span>
                    <span>Recibirás acceso al material pre-workshop una semana antes</span>
                  </li>
                </ol>
              </div>
            </div>
          </PrismaCardContent>
        </PrismaCard>
      </>
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
            <div
              className={cn(
                "h-2 w-2 rounded-full transition-colors",
                currentStep >= 3 ? "bg-[#47FFBF]" : "bg-gray-600"
              )}
            />
          </div>
          <span className="text-xs text-gray-500">Paso {currentStep} de 3</span>
        </div>
        <PrismaCardTitle className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-[#47FFBF] via-[#286CFF] to-[#8376FF] bg-clip-text text-transparent mb-3">
          ✨ Aplicar al Workshop
        </PrismaCardTitle>
        <PrismaCardDescription className="text-gray-300 text-base">
          Sábado 22 de Nov, 9AM • Lima
        </PrismaCardDescription>
      </PrismaCardHeader>

      <PrismaCardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Step 1: Professional Information */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-2">
                <Label htmlFor="empresa" className="text-gray-300">
                  Empresa
                </Label>
                <Input
                  id="empresa"
                  {...register("empresa")}
                  placeholder="Ej: Acme Inc."
                  className={cn(
                    "bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-[#47FFBF] transition-colors",
                    errors.empresa && "border-red-500"
                  )}
                />
                {errors.empresa && (
                  <p className="text-sm text-red-500">{errors.empresa.message}</p>
                )}
              </div>

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
                    <SelectItem value="0-2 años">0-2 años</SelectItem>
                    <SelectItem value="2-5 años">2-5 años</SelectItem>
                    <SelectItem value="5-10 años">5-10 años</SelectItem>
                    <SelectItem value="10+ años">10+ años</SelectItem>
                  </SelectContent>
                </Select>
                {errors.experiencia && (
                  <p className="text-sm text-red-500">{errors.experiencia.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cargo" className="text-gray-300">
                  Cargo
                </Label>
                <Input
                  id="cargo"
                  {...register("cargo")}
                  placeholder="Ej: Product Manager"
                  className={cn(
                    "bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-[#47FFBF] transition-colors",
                    errors.cargo && "border-red-500"
                  )}
                />
                {errors.cargo && (
                  <p className="text-sm text-red-500">{errors.cargo.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin" className="text-gray-300">
                  LinkedIn
                </Label>
                <Input
                  id="linkedin"
                  {...register("linkedin")}
                  placeholder="Ej: linkedin.com/in/juanperez"
                  className={cn(
                    "bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-[#47FFBF] transition-colors",
                    errors.linkedin && "border-red-500"
                  )}
                />
                {errors.linkedin && (
                  <p className="text-sm text-red-500">{errors.linkedin.message}</p>
                )}
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

          {/* Step 2: Personal Information */}
          {currentStep === 2 && (
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
                <Label htmlFor="telefono" className="text-gray-300">
                  Teléfono
                </Label>
                <div className="flex gap-2">
                  <Select
                    defaultValue="+51"
                    onValueChange={(value) => setValue("codigoPais", value)}
                  >
                    <SelectTrigger className="w-[110px] bg-white/5 border-white/10 text-white focus:border-[#47FFBF] transition-colors">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="+51">🇵🇪 +51</SelectItem>
                      <SelectItem value="+1">🇺🇸 +1</SelectItem>
                      <SelectItem value="+52">🇲🇽 +52</SelectItem>
                      <SelectItem value="+54">🇦🇷 +54</SelectItem>
                      <SelectItem value="+55">🇧🇷 +55</SelectItem>
                      <SelectItem value="+56">🇨🇱 +56</SelectItem>
                      <SelectItem value="+57">🇨🇴 +57</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    id="telefono"
                    type="tel"
                    {...register("telefono")}
                    placeholder="987654321"
                    className={cn(
                      "flex-1 bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-[#47FFBF] transition-colors",
                      errors.telefono && "border-red-500"
                    )}
                  />
                </div>
                {errors.telefono && (
                  <p className="text-sm text-red-500">{errors.telefono.message}</p>
                )}
                <p className="text-xs text-gray-500">Ingresa solo números, sin espacios ni guiones</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="fueReferido"
                    checked={fueReferido}
                    onCheckedChange={(checked) => setValue("fueReferido", checked === true)}
                    className="mt-1 border-2 border-white/40 data-[state=checked]:bg-[#47FFBF] data-[state=checked]:border-[#47FFBF] data-[state=checked]:text-black"
                  />
                  <Label htmlFor="fueReferido" className="text-sm text-gray-300 cursor-pointer leading-relaxed">
                    ¿Fuiste referido por algún miembro del programa?
                  </Label>
                </div>
              </div>

              {fueReferido && (
                <div className="space-y-2 animate-fade-in">
                  <Label htmlFor="referidoPor" className="text-gray-300">
                    En caso afirmativo, cuéntanos quién te refirió
                  </Label>
                  <Input
                    id="referidoPor"
                    {...register("referidoPor")}
                    placeholder="Ej: María García"
                    className={cn(
                      "bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-[#47FFBF] transition-colors",
                      errors.referidoPor && "border-red-500"
                    )}
                  />
                  {errors.referidoPor && (
                    <p className="text-sm text-red-500">{errors.referidoPor.message}</p>
                  )}
                </div>
              )}

              {/* Essay Field - NEW */}
              <div className="space-y-2 pt-4 border-t border-white/10">
                <Label htmlFor="motivacion" className="text-gray-300">
                  ¿Por qué quieres unirte a AI Native? *
                </Label>
                <p className="text-sm text-gray-400 mt-1">
                  Comparte tu situación actual y qué esperas lograr
                </p>
                <Textarea
                  id="motivacion"
                  {...register("motivacion")}
                  placeholder="Ejemplo: Trabajo en [empresa] como [cargo]. Quiero dominar herramientas IA porque actualmente [desafío] y espero [objetivo]..."
                  className={cn(
                    "bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-[#47FFBF] transition-colors min-h-[120px]",
                    errors.motivacion && "border-red-500"
                  )}
                  maxLength={1000}
                />

                {errors.motivacion && (
                  <p className="text-sm text-red-500">{errors.motivacion.message}</p>
                )}
              </div>

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
                  type="button"
                  variant="prisma-primary"
                  onClick={onNextStep}
                  className="flex-1 text-lg font-bold py-6 shadow-[0_0_25px_rgba(71,255,191,0.4)] hover:shadow-[0_0_35px_rgba(71,255,191,0.6)] hover:scale-[1.02] transition-all duration-300"
                >
                  Siguiente →
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Price Card and Confirmation */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-in">
              {/* DIFFERENTIATION BANNER - Price Anchor */}
              <div className="bg-gradient-to-r from-[#47FFBF]/10 to-[#286CFF]/10 border border-[#47FFBF]/30 rounded-lg p-4">
                <p className="text-sm text-gray-300 leading-relaxed">
                  Por un promedio de <span className="text-white font-semibold">S/ 3,500</span> los diplomados te enseñan Product Management tradicional.
                </p>
                <p className="text-sm text-[#47FFBF] font-semibold mt-2">
                  Este workshop te enseña lo que ellos NO:
                  <br />
                  Cómo crear producto AI-native como se hace en start-ups y San Francisco
                </p>
              </div>

              {/* VALUE STACK FIRST */}
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 space-y-4">

                {/* Benefits Section - MOVED TO TOP */}
                <div className="space-y-3">
                  <p className="text-base font-semibold text-white">
                    Lo que recibirás:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-[#47FFBF] shrink-0">✓</span>
                      <span>4 horas prácticas presenciales</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#47FFBF] shrink-0">✓</span>
                      <span>Metodología AI-native completa</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#47FFBF] shrink-0">✓</span>
                      <span>Guía de configuración del stack</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#47FFBF] shrink-0">✓</span>
                      <span>Certificación oficial</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#47FFBF] shrink-0">✓</span>
                      <span>Acceso a comunidad de alumni</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#47FFBF] shrink-0">✓</span>
                      <span>Soporte 30 días post-workshop</span>
                    </li>
                  </ul>
                </div>

                {/* Price Display - MOVED BELOW VALUE */}
                <div className="space-y-2 pt-3 border-t border-white/10">
                  <p className="text-gray-300 text-sm">
                    Inversión del workshop:
                  </p>
                  <div className="flex items-baseline gap-3">
                    {couponApplied && (
                      <span className="text-2xl font-bold text-gray-500 line-through">
                        S/ {BASE_PRICE}
                      </span>
                    )}
                    <span className="text-3xl font-bold text-[#47FFBF]">
                      S/ {finalPrice}
                    </span>
                    {couponApplied && (
                      <span className="text-sm font-semibold text-[#47FFBF] bg-[#47FFBF]/10 px-2 py-1 rounded">
                        20% OFF
                      </span>
                    )}
                  </div>
                </div>

                {/* Coupon Input - COLLAPSED BY DEFAULT */}
                <details className="pt-3 border-t border-white/10">
                  <summary className="text-sm text-gray-400 cursor-pointer hover:text-gray-300 transition-colors">
                    ¿Tienes un código de cupón? Haz click aquí
                  </summary>
                  <div className="space-y-2 mt-3">
                    <div className="flex gap-2">
                      <Input
                        id="coupon"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Ingresa tu código"
                        disabled={couponApplied}
                        className={cn(
                          "flex-1 bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-[#47FFBF] transition-colors uppercase",
                          couponApplied && "opacity-50 cursor-not-allowed"
                        )}
                      />
                      <Button
                        type="button"
                        onClick={applyCoupon}
                        disabled={couponApplied || !couponCode.trim()}
                        variant="outline"
                        className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                      >
                        {couponApplied ? "Aplicado ✓" : "Aplicar"}
                      </Button>
                    </div>
                    {couponError && (
                      <p className="text-sm text-red-500">{couponError}</p>
                    )}
                    {couponApplied && (
                      <p className="text-sm text-[#47FFBF]">¡Cupón aplicado exitosamente!</p>
                    )}
                  </div>
                </details>
              </div>

              {/* Confirmation Checkbox */}
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="confirmacion"
                    checked={confirmacion}
                    onCheckedChange={(checked) => setValue("confirmacion", checked === true)}
                    className="mt-1 border-2 border-white/40 data-[state=checked]:bg-[#47FFBF] data-[state=checked]:border-[#47FFBF] data-[state=checked]:text-black"
                  />
                  <Label htmlFor="confirmacion" className="text-sm text-gray-300 cursor-pointer leading-relaxed">
                    Confirmo mi interés en participar en el workshop AI Native
                  </Label>
                </div>
                {errors.confirmacion && (
                  <p className="text-sm text-red-500 ml-9">{errors.confirmacion.message}</p>
                )}
              </div>

              <p className="text-xs text-gray-400 text-center">
                Te escribiremos en las próximas 24-48 horas
              </p>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onPrevStep}
                  className="flex-1 bg-white/5 border-white/10 text-white hover:bg-white/10"
                >
                  ← Volver
                </Button>
                <div className="flex-1 relative">
                  <SparkleBurst trigger={showSparkles} onComplete={() => setShowSparkles(false)} />
                  <Button
                    type="submit"
                    variant="prisma-primary"
                    disabled={isSubmitting}
                    className="w-full text-lg font-bold py-6 shadow-[0_0_25px_rgba(71,255,191,0.4)] hover:shadow-[0_0_35px_rgba(71,255,191,0.6)] hover:scale-[1.02] transition-all duration-300"
                  >
                    {isSubmitting ? "Enviando..." : "✨ Enviar"}
                  </Button>
                </div>
              </div>
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
