import { PrismaCard, PrismaCardContent } from "@/components/prisma/prisma-card";

const agenda = [
  {
    hour: "Hora 1",
    title: "El Método",
    description: "Fundamentos AI-native. Las 3 esferas repensadas. Por qué funciona 30x más rápido.",
    color: "#47FFBF",
  },
  {
    hour: "Hora 2",
    title: "El Stack",
    description: "Instalación hands-on. Configuración profesional. Listo para usar.",
    color: "#8376FF",
  },
  {
    hour: "Hora 3",
    title: "Demostración en Vivo",
    description: "Ejecución completa. De cero a producto definido. Sin editar.",
    color: "#FF48C7",
  },
  {
    hour: "Hora 4",
    title: "Tu Práctica",
    description: "Ejecutas el workflow. Feedback en vivo. Dominas el método.",
    color: "#286CFF",
  },
];

export function AgendaTimeline() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#47FFBF] via-[#8376FF] via-[#FF48C7] to-[#286CFF] opacity-30" />

        <div className="space-y-8">
          {agenda.map((item, index) => (
            <div key={index} className="relative pl-20">
              {/* Timeline dot */}
              <div
                className="absolute left-6 top-6 h-5 w-5 rounded-full border-4 border-black"
                style={{ backgroundColor: item.color }}
              />

              <PrismaCard
                variant="glass"
                className="hover:border-white/30 transition-all group"
                style={{
                  borderColor: `${item.color}20`,
                }}
              >
                <PrismaCardContent className="pt-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <span
                      className="text-sm font-mono font-semibold px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: `${item.color}20`,
                        color: item.color,
                      }}
                    >
                      {item.hour}
                    </span>
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed">{item.description}</p>
                </PrismaCardContent>
              </PrismaCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
