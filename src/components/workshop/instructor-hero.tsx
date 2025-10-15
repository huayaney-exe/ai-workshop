import { PrismaCard, PrismaCardContent } from "@/components/prisma/prisma-card";
import { GraduationCap, Rocket, Sprout, Trophy } from "lucide-react";
import Image from "next/image";

export function InstructorHero() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left Column: Photo, Name, Stats */}
        <div className="space-y-6 text-center md:text-left">
          {/* Instructor Photo Card - Same style as testimonials */}
          <div className="relative w-full max-w-sm mx-auto md:mx-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#47FFBF]/20 to-transparent rounded-2xl blur-xl" />
            <PrismaCard variant="glass" className="relative overflow-hidden border-[#47FFBF]/30 p-0">
              <div className="aspect-square relative w-full h-full">
                <Image
                  src="/profile.jpeg"
                  alt="Luis Huayaney - Founder de PRISMA"
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </PrismaCard>
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-white">Luis Huayaney</h2>
            <p className="text-lg text-[#47FFBF] font-medium">Founder de PRISMA</p>
          </div>

          {/* Mini Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 group">
              <p className="text-3xl font-bold text-[#8376FF] group-hover:scale-110 transition-transform duration-300">150+</p>
              <p className="text-xs text-gray-500 mt-1">PMs<br/>Capacitados</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 group">
              <p className="text-3xl font-bold text-[#FF48C7] group-hover:scale-110 transition-transform duration-300">30x</p>
              <p className="text-xs text-gray-500 mt-1">Mejora<br/>Velocidad</p>
            </div>
          </div>
        </div>

        {/* Right Column: Credentials */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-white mb-6">Experiencia & Credenciales</h3>

          <PrismaCard variant="glass" className="hover:border-[#47FFBF]/30 transition-all">
            <PrismaCardContent className="pt-4 pb-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-[#47FFBF]/20 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="h-6 w-6 text-[#47FFBF]" />
                </div>
                <div>
                  <p className="font-semibold text-white">Organizador</p>
                  <p className="text-sm text-gray-400">Colombia Tech Week</p>
                </div>
              </div>
            </PrismaCardContent>
          </PrismaCard>

          <PrismaCard variant="glass" className="hover:border-[#8376FF]/30 transition-all">
            <PrismaCardContent className="pt-4 pb-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-[#8376FF]/20 flex items-center justify-center flex-shrink-0">
                  <Rocket className="h-6 w-6 text-[#8376FF]" />
                </div>
                <div>
                  <p className="font-semibold text-white">Instructor</p>
                  <p className="text-sm text-gray-400">Founder School</p>
                </div>
              </div>
            </PrismaCardContent>
          </PrismaCard>

          <PrismaCard variant="glass" className="hover:border-[#FF48C7]/30 transition-all">
            <PrismaCardContent className="pt-4 pb-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-[#FF48C7]/20 flex items-center justify-center flex-shrink-0">
                  <Sprout className="h-6 w-6 text-[#FF48C7]" />
                </div>
                <div>
                  <p className="font-semibold text-white">Founder</p>
                  <p className="text-sm text-gray-400">Florece.ai</p>
                </div>
              </div>
            </PrismaCardContent>
          </PrismaCard>

          <PrismaCard variant="glass" className="hover:border-[#286CFF]/30 transition-all">
            <PrismaCardContent className="pt-4 pb-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-[#286CFF]/20 flex items-center justify-center flex-shrink-0">
                  <Trophy className="h-6 w-6 text-[#286CFF]" />
                </div>
                <div>
                  <p className="font-semibold text-white">Ganador Startup Perú</p>
                  <p className="text-sm text-gray-400">Con Genera</p>
                </div>
              </div>
            </PrismaCardContent>
          </PrismaCard>
        </div>
      </div>
    </div>
  );
}
