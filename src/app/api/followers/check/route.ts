import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { Follower } from '@/lib/types';

// GET — Check if a follower exists and get their name
export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email required.' }, { status: 400 });
    }

    const db = await getDb();
    const follower = await db
      .collection<Follower>('followers')
      .findOne({ email: email.toLowerCase().trim() }, { projection: { name: 1, email: 1 } });

    if (!follower) {
      return NextResponse.json({ subscribed: false }, { status: 200 });
    }

    return NextResponse.json({ 
      subscribed: true, 
      name: follower.name || email.split('@')[0],
      email: follower.email
    }, { status: 200 });
  } catch (error) {
    console.error('GET /api/followers/check error:', error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
