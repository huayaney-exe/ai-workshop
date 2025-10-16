"use client";

import Image from "next/image";
import { GradientMesh } from "@/components/prisma/gradient-mesh";
import { FilmGrainOverlay } from "@/components/prisma/film-grain-overlay";
import { PrismaCard, PrismaCardContent, PrismaCardHeader, PrismaCardTitle } from "@/components/prisma/prisma-card";
import { Badge } from "@/components/ui/badge";
import { CountdownTimer } from "@/components/workshop/countdown-timer";
import { WorkshopApplicationForm } from "@/components/workshop/workshop-application-form";
import { TestimonialCarousel } from "@/components/workshop/testimonial-carousel";
import { CompanyLogos } from "@/components/workshop/company-logos";
import { ComparisonSection } from "@/components/workshop/comparison-section";
import { AgendaTimeline } from "@/components/workshop/agenda-timeline";
import { InstructorHero } from "@/components/workshop/instructor-hero";
import { QualificationGrid } from "@/components/workshop/qualification-grid";

export function WorkshopClient() {

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background */}
      <GradientMesh />

      {/* Film Grain Overlay */}
      <FilmGrainOverlay intensity="medium" />

      {/* Sticky Urgency Bar */}
      <div className="sticky top-0 z-50 bg-[#47FFBF]/10 backdrop-blur-md border-b border-[#47FFBF]/30 py-3 shadow-[0_4px_20px_rgba(71,255,191,0.1)]">
        <div className="container mx-auto px-4">
          <CountdownTimer />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-16 items-center">
            {/* Left Column: Headline + Features */}
            <div className="space-y-6 lg:space-y-8">
              <Badge variant="secondary" className="bg-[#47FFBF]/10 text-[#47FFBF] border-[#47FFBF]/20 hover:bg-[#47FFBF]/20 transition-colors">
                ⚡ WORKSHOP PRÁCTICO • CUPOS LIMITADOS
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
                Adquiere las Herramientas<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#47FFBF] via-[#286CFF] to-[#8376FF] animate-gradient bg-[length:200%_auto]">
                  AI-Native
                </span>
                <br/>
                Para Crear Producto<br/>de Clase Mundial
              </h1>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-xl">
                <span className="text-white font-semibold">4 horas prácticas.</span> El workflow completo que permite construir 30x más rápido.
                <br />
                <span className="text-[#47FFBF]">No teoría. Ejecución real.</span>
                <br />
                <span className="text-gray-400 text-base">Estamos en la ventana crítica: entre quienes solo escuchan sobre IA y quienes la usan world-class. La brecha se cierra rápido.</span>
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge variant="outline" className="border-white/30 text-gray-200 bg-white/5 hover:bg-white/10 transition-all text-sm px-4 py-1.5">
                  ✓ 150+ PMs capacitados
                </Badge>
                <Badge variant="outline" className="border-white/30 text-gray-200 bg-white/5 hover:bg-white/10 transition-all text-sm px-4 py-1.5">
                  ✓ Certificación oficial
                </Badge>
                <Badge variant="outline" className="border-white/30 text-gray-200 bg-white/5 hover:bg-white/10 transition-all text-sm px-4 py-1.5">
                  ✓ Metodología probada
                </Badge>
              </div>
            </div>

            {/* Right Column: Application Form */}
            <div className="lg:sticky lg:top-24">
              {/* Prisma Logo */}
              <div className="flex justify-end mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#47FFBF]/20 to-[#286CFF]/20 blur-xl" />
                  <Image
                    src="/logo-4dkbg.svg"
                    alt="PRISMA"
                    width={120}
                    height={40}
                    className="relative object-contain"
                  />
                </div>
              </div>
              <WorkshopApplicationForm />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
            Opiniones de Líderes Sobre la Formación
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Personas del ecosistema que conocen y avalan el trabajo AI-native en Product Management
          </p>
          <TestimonialCarousel />
        </div>
      </section>

      {/* Company Logos */}
      <section className="py-16 md:py-24 bg-black/20">
        <div className="container mx-auto px-4">
          <CompanyLogos />
        </div>
      </section>

      {/* Comparison Traditional vs AI-Native */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              El Cambio de Paradigma
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              La transformación: crear más rápido, mejor, y con mayor impacto
            </p>
          </div>
          <ComparisonSection />
        </div>
      </section>

      {/* What You'll Master */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
            Lo Que Dominarás en 4 Horas
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Metodología completa. Del mindset a la ejecución.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <PrismaCard variant="glass" className="hover:border-[#47FFBF]/30 transition-all">
              <PrismaCardContent className="pt-6 space-y-4">
                <div className="text-4xl">🧠</div>
                <h3 className="text-xl font-bold text-white">El Mindset</h3>
                <p className="text-gray-400">
                  Las 3 esferas de producto repensadas. De manager a orquestador de sistemas.
                </p>
              </PrismaCardContent>
            </PrismaCard>

            <PrismaCard variant="glass" className="hover:border-[#8376FF]/30 transition-all">
              <PrismaCardContent className="pt-6 space-y-4">
                <div className="text-4xl">⚡</div>
                <h3 className="text-xl font-bold text-white">El Workflow</h3>
                <p className="text-gray-400">
                  Metodología completa. Discovery, Strategy, Delivery ejecutados en minutos.
                </p>
              </PrismaCardContent>
            </PrismaCard>

            <PrismaCard variant="glass" className="hover:border-[#FF48C7]/30 transition-all">
              <PrismaCardContent className="pt-6 space-y-4">
                <div className="text-4xl">🔧</div>
                <h3 className="text-xl font-bold text-white">El Stack</h3>
                <p className="text-gray-400">
                  Herramientas profesionales configuradas y listas para usar el lunes.
                </p>
              </PrismaCardContent>
            </PrismaCard>

            <PrismaCard variant="glass" className="hover:border-[#286CFF]/30 transition-all">
              <PrismaCardContent className="pt-6 space-y-4">
                <div className="text-4xl">👁️</div>
                <h3 className="text-xl font-bold text-white">La Ejecución</h3>
                <p className="text-gray-400">
                  Demostración en vivo. Sin editar. Así se trabaja world-class.
                </p>
              </PrismaCardContent>
            </PrismaCard>
          </div>
        </div>
      </section>

      {/* Instructor Profile */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Tu Instructor
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Capacitador de 150+ PMs, fundador de empresas, líder de producto e innovación en corporativos, y parte del equipo de Colombia Tech Week
            </p>
          </div>
          <InstructorHero />
        </div>
      </section>

      {/* Agenda Timeline */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
            Las 4 Horas
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Metodología completa. Práctica guiada. Ejecución real. Sin relleno.
          </p>
          <AgendaTimeline />
        </div>
      </section>

      {/* Qualification Checklist */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
            ¿Es Para Ti?
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Este workshop es intensivo y práctico. Verifica si califica para tu perfil.
          </p>
          <QualificationGrid />
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>&copy; 2025 PRISMA. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
