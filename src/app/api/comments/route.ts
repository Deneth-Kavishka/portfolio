import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getDb } from '@/lib/db';
import { Comment, CommentReaction } from '@/lib/types';

const DEFAULT_REACTIONS: CommentReaction[] = [
  { type: '👍', count: 0 },
  { type: '❤️', count: 0 },
  { type: '🔥', count: 0 },
  { type: '💡', count: 0 },
  { type: '👏', count: 0 },
];

// GET — Fetch comments for a blog post (nested)
export async function GET(request: NextRequest) {
  try {
    const slug = request.nextUrl.searchParams.get('slug');
    const isAdminRequest = request.nextUrl.searchParams.get('admin') === 'true';

    if (!slug) {
      return NextResponse.json(
        { error: 'Missing "slug" query parameter.' },
        { status: 400 }
      );
    }

    // Check admin auth when admin=true is requested
    let showHidden = false;
    if (isAdminRequest) {
      const authHeader = request.headers.get('Authorization');
      if (authHeader === `Bearer ${process.env.ADMIN_PASSWORD}`) {
        showHidden = true;
      }
    }

    const db = await getDb();
    const rawComments = await db
      .collection<Comment>('comments')
      .find({ postSlug: slug })
      .sort({ createdAt: -1 })
      .toArray();

    // Serialize ObjectId to string
    const allComments: Comment[] = rawComments.map((c) => ({
      ...c,
      _id: c._id!.toString(),
    }));

    // Filter out hidden comments unless admin
    const visibleComments = showHidden
      ? allComments
      : allComments.filter((c) => c.hidden !== true);

    // Build nested structure
    const commentMap = new Map<string, Comment>();
    const topLevel: Comment[] = [];

    for (const comment of visibleComments) {
      comment.replies = [];
      commentMap.set(comment._id!, comment);
    }

    for (const comment of visibleComments) {
      if (comment.parentId) {
        const parent = commentMap.get(comment.parentId);
        if (parent) {
          parent.replies!.push(comment);
        } else {
          topLevel.push(comment);
        }
      } else {
        topLevel.push(comment);
      }
    }

    return NextResponse.json({ comments: topLevel });
  } catch (error) {
    console.error('GET /api/comments error:', error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}

// POST — Add a new comment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { postSlug, author, email, content, parentId, isAdmin } = body as {
      postSlug: string;
      author: string;
      email: string;
      content: string;
      parentId?: string;
      isAdmin?: boolean;
    };

    // If admin reply, verify auth
    if (isAdmin) {
      const authHeader = request.headers.get('Authorization');
      if (authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
        return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
      }
    }

    // Validate required fields
    if (!postSlug?.trim() || !content?.trim()) {
      return NextResponse.json(
        { error: 'postSlug, author, email, and content are all required.' },
        { status: 400 }
      );
    }

    if (!isAdmin && (!author?.trim() || !email?.trim())) {
      return NextResponse.json(
        { error: 'postSlug, author, email, and content are all required.' },
        { status: 400 }
      );
    }

    const db = await getDb();
    const comment: Comment = {
      postSlug,
      author: isAdmin ? 'Blog Admin' : author.trim(),
      email: isAdmin ? 'admin' : email.trim().toLowerCase(),
      content: content.trim(),
      parentId: parentId || null,
      reactions: DEFAULT_REACTIONS.map((r) => ({ ...r })),
      createdAt: new Date().toISOString(),
      hidden: false,
      ...(isAdmin ? { isAdmin: true } : {}),
    };

    const result = await db.collection<Comment>('comments').insertOne(comment as unknown as import('mongodb').OptionalId<Comment>);

    return NextResponse.json(
      {
        success: true,
        comment: { ...comment, _id: result.insertedId.toString() },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST /api/comments error:', error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}

// PATCH — Toggle hide/unhide a comment (admin only)
export async function PATCH(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }
    const body = await request.json();
    const { commentId, hidden } = body as { commentId: string; hidden: boolean };
    if (!commentId) {
      return NextResponse.json({ error: 'commentId required.' }, { status: 400 });
    }
    const db = await getDb();
    await db.collection('comments').updateMany(
      { $or: [{ _id: new ObjectId(commentId) }, { parentId: commentId }] },
      { $set: { hidden } }
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('PATCH /api/comments error:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}

// DELETE — Remove a comment (admin only)
export async function DELETE(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const body = await request.json();
    const { commentId } = body as { commentId: string };

    if (!commentId) {
      return NextResponse.json({ error: 'commentId required.' }, { status: 400 });
    }

    const db = await getDb();
    // Delete the comment and all its replies
    await db.collection('comments').deleteOne({ _id: new ObjectId(commentId) });
    await db.collection('comments').deleteMany({ parentId: commentId });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/comments error:', error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
