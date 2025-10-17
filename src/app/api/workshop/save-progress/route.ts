import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      step, // Which step is being saved (should be 2)
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
      motivacion,
    } = body;

    // Only save at Step 2 (before price reveal)
    if (step !== 2) {
      return NextResponse.json(
        { success: true, saved: false, message: 'Only Step 2 triggers progressive save' },
        { status: 200 }
      );
    }

    // Validate all required fields for Step 2
    if (!email || !nombre || !empresa || !experiencia || !cargo || !linkedin || !telefono || !motivacion) {
      return NextResponse.json(
        { error: 'Campos requeridos faltantes' },
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

    // Initialize server-side Supabase client
    const supabase = createServerClient();

    // Prepare complete lead data (all fields collected through Step 2)
    const dataToSave = {
      email: email.toLowerCase(),
      nombre,
      empresa,
      experiencia,
      cargo,
      linkedin,
      telefono,
      codigo_pais: codigoPais || '+51',
      fue_referido: fueReferido || false,
      referido_por: referidoPor || null,
      motivacion,
      status: 'step_2_complete',
      dropped_at_step: 2,
      last_updated_at: new Date().toISOString(),

      // Fields not yet collected (Step 3)
      confirmacion: null,
      precio_final: null,
      codigo_cupon: null,
    };

    // Insert new record - creates unique lead_id for this session
    const { data, error } = await supabase
      .from('ai-workshop')
      .insert(dataToSave)
      .select();

    if (error) {
      // Silent failure - log but don't block user
      console.error('Progressive save error (non-blocking):', error);

      // Return success anyway to avoid disrupting UX
      return NextResponse.json(
        {
          success: true,
          saved: false,
          message: 'Progreso no guardado, pero puedes continuar'
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        saved: true,
        lead_id: data?.[0]?.lead_id,
        status: data?.[0]?.status,
        message: 'Progreso guardado exitosamente'
      },
      { status: 200 }
    );

  } catch (error) {
    // Silent failure - log but don't block user
    console.error('Progressive save exception (non-blocking):', error);

    // Return success to avoid disrupting UX
    return NextResponse.json(
      {
        success: true,
        saved: false,
        message: 'Progreso no guardado, pero puedes continuar'
      },
      { status: 200 }
    );
  }
}
