import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import type { WorkshopApplication } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate required fields
    const { nombre, email, linkedin, referidoPor, experiencia, motivacion } = body;

    if (!nombre || !email || !linkedin || !experiencia || !motivacion) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Prepare data for Supabase
    const applicationData: WorkshopApplication = {
      nombre,
      email: email.toLowerCase(),
      linkedin,
      referido_por: referidoPor || null,
      experiencia,
      motivacion,
    };

    // Insert into Supabase
    const { data, error } = await supabase
      .from('ai-workshop')
      .insert([applicationData])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to submit application', details: error.message },
        { status: 500 }
      );
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Application submitted successfully',
        data
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
