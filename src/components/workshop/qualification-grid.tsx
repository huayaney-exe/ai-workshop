import { PrismaCard, PrismaCardContent, PrismaCardHeader, PrismaCardTitle } from "@/components/prisma/prisma-card";
import { Check, X } from "lucide-react";

export function QualificationGrid() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Yes Column */}
        <PrismaCard variant="glass" className="border-[#47FFBF]/20">
          <PrismaCardHeader>
            <PrismaCardTitle className="flex items-center gap-2 text-xl">
              <Check className="h-6 w-6 text-[#47FFBF]" />
              Es para ti si:
            </PrismaCardTitle>
          </PrismaCardHeader>
          <PrismaCardContent>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-[#47FFBF] shrink-0 mt-0.5" />
                <span>Ya lanzas productos o features - ahora quieres hacerlo 10x más rápido sin sacrificar calidad</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-[#47FFBF] shrink-0 mt-0.5" />
                <span>Has notado que ciertos equipos shipean en días lo que a otros les toma semanas, con recursos similares</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-[#47FFBF] shrink-0 mt-0.5" />
                <span>Tu bottleneck real no es falta de talento o presupuesto - es velocidad de ejecución</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-[#47FFBF] shrink-0 mt-0.5" />
                <span>Prefieres herramientas que usas el lunes sobre certificados que mencionas el viernes</span>
              </li>
            </ul>
          </PrismaCardContent>
        </PrismaCard>

        {/* No Column */}
        <PrismaCard variant="glass" className="border-red-500/20">
          <PrismaCardHeader>
            <PrismaCardTitle className="flex items-center gap-2 text-xl">
              <X className="h-6 w-6 text-red-400" />
              No es para ti si:
            </PrismaCardTitle>
          </PrismaCardHeader>
          <PrismaCardContent>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start gap-3">
                <X className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                <span>Esperas que salga una certificación de &ldquo;Certified AI Product Manager&rdquo; oficial</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                <span>Buscas &ldquo;aprender sobre IA&rdquo; sin un problema específico que resolver esta semana</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                <span>Te importa más qué curso completaste que qué problema resolviste</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                <span>Esperas que tu empresa o jefe decida si esto es relevante para ti</span>
              </li>
            </ul>
          </PrismaCardContent>
        </PrismaCard>
      </div>

      {/* Application Process */}
      <div className="mt-8 text-center">
        <PrismaCard variant="glass" className="max-w-2xl mx-auto">
          <PrismaCardContent className="pt-6 pb-6">
            <p className="text-gray-300">
              <strong className="text-white">Proceso:</strong> Aplicas (2 min) → Revisamos (24-48h) → Si calificas, pagas $99
            </p>
          </PrismaCardContent>
        </PrismaCard>
      </div>
    </div>
  );
}
