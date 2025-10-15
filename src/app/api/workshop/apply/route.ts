import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const { nombre, email, linkedin, experiencia, motivacion, referidoPor } = body;

    if (!nombre || !email || !linkedin || !experiencia || !motivacion) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Insert into Supabase ai-workshop table
    const { data, error } = await supabase
      .from('ai-workshop')
      .insert([
        {
          nombre,
          email,
          linkedin,
          referido_por: referidoPor || null,
          experiencia,
          motivacion,
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
