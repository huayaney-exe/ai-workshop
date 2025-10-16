import { PrismaCard, PrismaCardContent, PrismaCardHeader, PrismaCardTitle } from "@/components/prisma/prisma-card";

export function ComparisonSection() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-white">¿Por qué dar el salto al enfoque AI-native?</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {/* Traditional Product Management */}
        <PrismaCard variant="glass" className="border-red-500/20">
          <PrismaCardHeader>
            <PrismaCardTitle className="text-xl text-white">Tradicional Product Management</PrismaCardTitle>
          </PrismaCardHeader>
          <PrismaCardContent className="space-y-3">
            <ul className="space-y-3 text-white">
              <li className="flex items-start gap-2">
                <span className="shrink-0">•</span>
                <span>Lento, dependiente de procesos manuales</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="shrink-0">•</span>
                <span>Mucho tiempo en tareas operativas</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="shrink-0">•</span>
                <span>Validación tardía, pocos prototipos</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="shrink-0">•</span>
                <span>Decisiones por intuición y reuniones</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="shrink-0">•</span>
                <span>Delivery reactivo, poca iteración</span>
              </li>
            </ul>
          </PrismaCardContent>
        </PrismaCard>

        {/* AI-Native Product Management */}
        <PrismaCard variant="glass" className="border-[#47FFBF]/20">
          <PrismaCardHeader>
            <PrismaCardTitle className="text-xl text-white">AI-Native Product Management</PrismaCardTitle>
          </PrismaCardHeader>
          <PrismaCardContent className="space-y-3">
            <ul className="space-y-3 text-white">
              <li className="flex items-start gap-2">
                <span className="shrink-0">•</span>
                <span>Rápido, impulsado por automatización</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="shrink-0">•</span>
                <span>Más tiempo para crear valor real</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="shrink-0">•</span>
                <span>Aprendizaje continuo y testeo en minutos</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="shrink-0">•</span>
                <span>Decisiones basadas en data y evidencia</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="shrink-0">•</span>
                <span>Delivery ágil, adaptación constante</span>
              </li>
            </ul>
          </PrismaCardContent>
        </PrismaCard>
      </div>
    </div>
  );
}
