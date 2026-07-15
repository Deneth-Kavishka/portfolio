import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { Follower, Comment } from '@/lib/types';

// POST — Admin login
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body as { password: string };

    if (!password) {
      return NextResponse.json(
        { error: 'Password is required.' },
        { status: 400 }
      );
    }

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      token: process.env.ADMIN_PASSWORD,
    });
  } catch (error) {
    console.error('POST /api/admin error:', error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}

// GET — Admin dashboard data
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const db = await getDb();

    const [followerCount, followers, commentCount, recentCommentsRaw] =
      await Promise.all([
        db.collection<Follower>('followers').countDocuments(),
        db.collection<Follower>('followers').find().toArray(),
        db.collection<Comment>('comments').countDocuments(),
        db
          .collection<Comment>('comments')
          .find()
          .sort({ createdAt: -1 })
          .limit(10)
          .toArray(),
      ]);

    const recentComments = recentCommentsRaw.map((c) => ({
      ...c,
      _id: c._id!.toString(),
    }));

    return NextResponse.json({
      followerCount,
      followers,
      commentCount,
      recentComments,
    });
  } catch (error) {
    console.error('GET /api/admin error:', error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
