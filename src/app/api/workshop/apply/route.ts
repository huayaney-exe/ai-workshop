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
      fueReferido,
      referidoPor,
      confirmacion
    } = body;

    // Check required fields
    if (!empresa || !experiencia || !cargo || !linkedin || !nombre || !email || !confirmacion) {
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

    // Validate confirmacion is true
    if (confirmacion !== true) {
      return NextResponse.json(
        { error: 'Debes confirmar para continuar' },
        { status: 400 }
      );
    }

    // Initialize server-side Supabase client
    const supabase = createServerClient();

    // Insert into Supabase ai-workshop table
    const { data, error } = await supabase
      .from('ai-workshop')
      .insert([
        {
          empresa,
          experiencia,
          cargo,
          linkedin,
          nombre,
          email,
          fue_referido: fueReferido || false,
          referido_por: referidoPor || null,
          confirmacion: true,
        }
      ])
      .select();

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
