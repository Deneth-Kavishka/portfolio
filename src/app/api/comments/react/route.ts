import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { ReactionType } from '@/lib/types';
import { ObjectId } from 'mongodb';

const VALID_REACTIONS: ReactionType[] = ['👍', '❤️', '🔥', '💡', '👏'];

// POST — Add reaction to a comment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { commentId, reaction } = body as {
      commentId: string;
      reaction: ReactionType;
    };

    if (!commentId || !reaction) {
      return NextResponse.json(
        { error: 'commentId and reaction are required.' },
        { status: 400 }
      );
    }

    if (!VALID_REACTIONS.includes(reaction)) {
      return NextResponse.json(
        { error: 'Invalid reaction type.' },
        { status: 400 }
      );
    }

    if (!ObjectId.isValid(commentId)) {
      return NextResponse.json(
        { error: 'Invalid comment ID.' },
        { status: 400 }
      );
    }

    const db = await getDb();
    const result = await db.collection('comments').updateOne(
      { _id: new ObjectId(commentId), 'reactions.type': reaction },
      { $inc: { 'reactions.$.count': 1 } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Comment not found or reaction type invalid.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('POST /api/comments/react error:', error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
