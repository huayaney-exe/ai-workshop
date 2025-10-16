"use client";

import { PrismaCard } from "@/components/prisma/prisma-card";

const companies = [
  // Banking & Financial
  { name: "BCP", category: "banking" },
  { name: "Interbank", category: "banking" },
  { name: "BBVA", category: "banking" },
  { name: "Scotiabank", category: "banking" },
  { name: "Mibanco", category: "banking" },
  { name: "Credicorp", category: "banking" },

  // Insurance & Pension
  { name: "RIMAC", category: "insurance" },
  { name: "Pacífico", category: "insurance" },
  { name: "Interseguro", category: "insurance" },
  { name: "Prima AFP", category: "pension" },
  { name: "Profuturo", category: "pension" },
  { name: "AFP Habitat", category: "pension" },

  // Fintech & Payments
  { name: "Yape", category: "fintech" },
  { name: "Niubiz", category: "fintech" },
  { name: "Izipay", category: "fintech" },

  // Retail & Consumer
  { name: "Falabella", category: "retail" },
  { name: "Ripley", category: "retail" },
  { name: "Supermercados Peruanos", category: "retail" },
  { name: "Alicorp", category: "consumer" },
  { name: "Ferreycorp", category: "industrial" },

  // Telecommunications
  { name: "Entel", category: "telecom" },
  { name: "Movistar", category: "telecom" },

  // Construction & Infrastructure
  { name: "Cosapi", category: "construction" },
  { name: "Unacen", category: "construction" },
  { name: "LAP", category: "infrastructure" },

  // Consulting & Services
  { name: "PwC", category: "consulting" },
  { name: "Deloitte", category: "consulting" },
  { name: "Belcorp", category: "consumer" },

  // Education
  { name: "UTEC", category: "education" },
  { name: "UP", category: "education" },
];

export function CompanyLogos() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Empresas del Ecosistema
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Profesionales de estas organizaciones líderes han participado en nuestros workshops
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-7xl mx-auto">
        {companies.map((company, index) => (
          <PrismaCard
            key={index}
            variant="glass"
            className="group relative overflow-hidden border-white/10 hover:border-[#47FFBF]/30 transition-all duration-300 hover:scale-105"
          >
            <div className="aspect-video flex items-center justify-center p-4">
              {/* Gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#47FFBF]/0 to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

              {/* Company name as logo */}
              <span className="relative z-10 text-center font-bold text-white/60 group-hover:text-white transition-colors duration-300 text-sm sm:text-base lg:text-lg">
                {company.name}
              </span>
            </div>
          </PrismaCard>
        ))}
      </div>

      {/* Optional: Add a note */}
      <p className="text-center text-sm text-gray-500 max-w-2xl mx-auto mt-8">
        Estas empresas representan parte del ecosistema donde profesionales han aplicado metodologías AI-native en Product Management
      </p>
    </div>
  );
}
