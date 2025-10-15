"use client";

import { PrismaCard, PrismaCardContent } from "@/components/prisma/prisma-card";
import Image from "next/image";

const testimonials = [
  {
    quote: "Incluso si no vas a ser tú mismo el que se ponga a desarrollar, me parece sumamente poderoso saber todo lo que se puede y con la velocidad con la que se puede desarrollar y manejar un producto con IA. Nada de lo que aprendas aquí será en vano!",
    author: "Karol Pacheco Del Solar",
    role: "Cash Products Lead",
    image: "/karol-pacheco.jpeg",
  },
  {
    quote: "La realidad es simple. la IA nos permite a PMs, founders y equipos enfocarse en lo que realmente importa, iterar el producto. Por lo que dominar AI en Product Management ya no es opcional, es lo que marca la diferencia en un mercado hipercompetitivo y entre mucha gente con perfiles similares. Y quién mejor que Luis para compartir el know-how que ha acumulado estos años liderando producto e implementando IA en cada paso del proceso",
    author: "Piero Sifuentes",
    role: "CTO/CPO Hapi",
    image: "/piero-sifuentes.jpeg",
  },
  {
    quote: "¿Por qué es relevante este tipo de formación?\n\n1. Ser independiente: al momento de querer validar hipótesis, poder validarlas tú mismo.\n\n2. Desarrollar buen Sense de producto. A veces creemos que tenemos la razón pero cuando vemos ese producto en vivo y lo intentamos construir, nos damos cuenta que no tiene sentido o es muy complejo.\n\n3. Aprender temas técnicos te permite estar cerca del equipo de desarrollo, hablar su idioma y Challengearlos cuando es necesario.",
    author: "Fernando Briones",
    role: "UTP - Líder retención",
    image: "/fernando-briones.jpeg",
  },
];

export function TestimonialCarousel() {
  return (
    <div className="max-w-6xl mx-auto space-y-16 py-8">
      {testimonials.map((testimonial, index) => {
        const isEven = index % 2 === 0;

        return (
          <div
            key={index}
            className={`flex flex-col ${
              isEven ? "lg:flex-row" : "lg:flex-row-reverse"
            } gap-8 items-center`}
          >
            {/* Photo Section */}
            <div className="w-full lg:w-1/3 flex-shrink-0">
              <div className="relative aspect-square w-full max-w-sm mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-[#47FFBF]/20 to-transparent rounded-2xl blur-xl" />
                <PrismaCard variant="glass" className="relative overflow-hidden border-[#47FFBF]/30">
                  <div className="aspect-square relative">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.author}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                </PrismaCard>
              </div>
            </div>

            {/* Content Section */}
            <div className="w-full lg:w-2/3">
              <PrismaCard variant="glass" className="border-[#47FFBF]/20">
                <PrismaCardContent className="p-8 lg:p-10">
                  {/* Quote */}
                  <div className="space-y-6">
                    <div className="relative">
                      <div className="absolute -left-4 -top-4 text-6xl text-[#47FFBF]/20 font-serif">
                        &ldquo;
                      </div>
                      <p className="text-base md:text-lg text-gray-300 italic leading-relaxed whitespace-pre-line relative z-10">
                        {testimonial.quote}
                      </p>
                      <div className="absolute -right-4 -bottom-4 text-6xl text-[#47FFBF]/20 font-serif">
                        &rdquo;
                      </div>
                    </div>

                    {/* Author Info */}
                    <div className={`pt-6 border-t border-[#47FFBF]/10 ${
                      isEven ? "text-left" : "text-right"
                    }`}>
                      <p className="font-bold text-white text-xl mb-1">
                        {testimonial.author}
                      </p>
                      <p className="text-sm text-[#47FFBF] font-medium">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </PrismaCardContent>
              </PrismaCard>
            </div>
          </div>
        );
      })}
    </div>
  );
}
