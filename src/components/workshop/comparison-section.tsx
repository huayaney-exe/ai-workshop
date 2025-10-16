import { PrismaCard, PrismaCardContent, PrismaCardHeader, PrismaCardTitle } from "@/components/prisma/prisma-card";

export function ComparisonSection() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-white">Producto Tradicional vs AI-Native</h2>
      </div>

      <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 items-center max-w-6xl mx-auto">
        {/* Traditional Method */}
        <PrismaCard variant="glass" className="border-red-500/20">
          <PrismaCardHeader>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">📝</span>
              <PrismaCardTitle className="text-xl">Método Tradicional</PrismaCardTitle>
            </div>
          </PrismaCardHeader>
          <PrismaCardContent className="space-y-3">
            <ul className="space-y-3 text-white">
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-semibold shrink-0">3 semanas</span>
                <span>Market research manual</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-semibold shrink-0">10+ reuniones</span>
                <span>Validación de hipótesis</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-semibold shrink-0">2 semanas</span>
                <span>Escribir documentación</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="shrink-0">•</span>
                <span>Decisiones por intuición</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="shrink-0">•</span>
                <span>Gestión constante de tareas</span>
              </li>
            </ul>
            <div className="pt-4 mt-4 border-t border-white/10">
              <p className="text-sm font-semibold text-red-400">
                Resultado: Lento, reactivo, agotador
              </p>
            </div>
          </PrismaCardContent>
        </PrismaCard>

        {/* Arrow */}
        <div className="hidden md:flex items-center justify-center">
          <span className="text-4xl text-[#47FFBF]">→</span>
        </div>

        {/* AI-Native Method */}
        <PrismaCard variant="glass" className="border-[#47FFBF]/20">
          <PrismaCardHeader>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">⚡</span>
              <PrismaCardTitle className="text-xl">Método AI-Native</PrismaCardTitle>
            </div>
          </PrismaCardHeader>
          <PrismaCardContent className="space-y-3">
            <ul className="space-y-3 text-white">
              <li className="flex items-start gap-2">
                <span className="shrink-0">•</span>
                <span>Intelligence automatizada en minutos</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="shrink-0">•</span>
                <span>Testing validado con data real</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="shrink-0">•</span>
                <span>Documentación auto-generada</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="shrink-0">•</span>
                <span>Decisiones basadas en evidencia</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="shrink-0">•</span>
                <span>Orquestación de sistemas</span>
              </li>
            </ul>
            <div className="pt-4 mt-4 border-t border-white/10">
              <p className="text-sm font-semibold text-[#47FFBF]">
                Resultado: 30x más rápido, proactivo, escalable
              </p>
            </div>
          </PrismaCardContent>
        </PrismaCard>
      </div>
    </div>
  );
}
