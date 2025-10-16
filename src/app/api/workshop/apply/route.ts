import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const {
      empresa,
      experiencia,
      cargo,
      linkedin,
      nombre,
      email,
      telefono,
      codigoPais,
      fueReferido,
      referidoPor,
      confirmacion,
      precioFinal,
      codigoCupon,
      leadId // Optional - if provided, we update existing lead
    } = body;

    // Check required fields
    if (!empresa || !experiencia || !cargo || !linkedin || !nombre || !email || !telefono || !confirmacion) {
      return NextResponse.json(
        { error: 'Campos faltantes o inválidos' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Por favor ingresa un email válido' },
        { status: 400 }
      );
    }

    // Validate phone number (basic validation)
    if (telefono.length < 9) {
      return NextResponse.json(
        { error: 'El teléfono debe tener al menos 9 dígitos' },
        { status: 400 }
      );
    }

    // Validate confirmacion is true
    if (confirmacion !== true) {
      return NextResponse.json(
        { error: 'Debes confirmar para continuar' },
        { status: 400 }
      );
    }

    // Validate precio final
    if (!precioFinal || precioFinal <= 0) {
      return NextResponse.json(
        { error: 'Precio final inválido' },
        { status: 400 }
      );
    }

    // Initialize server-side Supabase client
    const supabase = createServerClient();

    // Prepare application data
    const applicationData = {
      empresa,
      experiencia,
      cargo,
      linkedin,
      nombre,
      email: email.toLowerCase(),
      telefono,
      codigo_pais: codigoPais || '+51',
      fue_referido: fueReferido || false,
      referido_por: referidoPor || null,
      confirmacion: true,
      precio_final: precioFinal,
      codigo_cupon: codigoCupon || null,
      status: 'confirmed' as const, // Mark as confirmed application
      dropped_at_step: null, // Completed all steps
      last_updated_at: new Date().toISOString(),
    };

    let data, error;

    if (leadId) {
      // Progressive save happened - UPDATE existing record by lead_id
      const result = await supabase
        .from('ai-workshop')
        .update(applicationData)
        .eq('lead_id', leadId)
        .select();

      data = result.data;
      error = result.error;
    } else {
      // No progressive save - INSERT new record (user may have skipped Step 2 save)
      const result = await supabase
        .from('ai-workshop')
        .insert(applicationData)
        .select();

      data = result.data;
      error = result.error;
    }

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to submit application', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, data },
      { status: 201 }
    );

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
