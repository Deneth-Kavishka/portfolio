import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { getDb } from '@/lib/db';
import { Follower } from '@/lib/types';
import { transporter } from '@/lib/email';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://deneth.dev';

async function sendWelcomeEmail(email: string, name: string | undefined, unsubscribeToken: string) {
  try {
    const displayName = name || 'there';

    await transporter.sendMail({
      from: `"Deneth Kavishka" <${process.env.ADMIN_EMAIL}>`,
      to: email,
      subject: "Welcome! You've subscribed to Deneth Kavishka's Tech Blog!",
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#0a0a1a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:40px 24px;">
    <div style="background:#111827;border:1px solid #1e3a5f;border-radius:16px;padding:40px 32px;text-align:center;">
      <img src="${SITE_URL}/icon.png" alt="Deneth Kavishka" style="width:80px;height:80px;border-radius:50%;margin:0 auto 24px;border:2px solid #00e5ff;object-fit:cover;display:block;" />
      <h1 style="color:#00e5ff;font-size:24px;margin-bottom:8px;font-weight:700;">You're In!</h1>
      <p style="color:#f1f5f9;font-size:16px;margin-bottom:24px;">Welcome to Deneth Kavishka's Tech Blog</p>
      <div style="height:1px;background:linear-gradient(90deg,transparent,#0088cc,transparent);margin:0 0 24px;"></div>
      <p style="color:#94a3b8;font-size:15px;line-height:1.8;margin-bottom:24px;">
        Hey ${displayName}! 👋<br/><br/>
        Thank you for subscribing to my blog! You'll now receive email notifications whenever I publish new articles about <strong style="color:#f1f5f9;">Software Engineering</strong>, <strong style="color:#f1f5f9;">Full-Stack Web development</strong>, <strong style="color:#f1f5f9;">AI & ML</strong>, <strong style="color:#f1f5f9;">Data Science</strong>, <strong style="color:#f1f5f9;">Future Trends of Tech</strong>, and <strong style="color:#f1f5f9;">IOT & Robotics</strong>.
      </p>
      <p style="color:#94a3b8;font-size:15px;line-height:1.8;margin-bottom:32px;">
        In the meantime, feel free to check out my latest articles and projects on the blog.
      </p>
      <a href="${SITE_URL}/blog" style="display:inline-block;padding:14px 36px;background:linear-gradient(135deg,#0088cc,#00e5ff);color:#003366;font-weight:700;text-decoration:none;border-radius:10px;font-size:15px;">
        Explore the Blog →
      </a>
      <div style="margin-top:40px;padding-top:24px;border-top:1px solid #1e3a5f;">
        <p style="color:#64748b;font-size:12px;line-height:1.6;">
          You received this email because you subscribed to Deneth Kavishka's Tech Blog.<br/>
          <a href="${SITE_URL}/api/followers/unsubscribe?token=${unsubscribeToken}" style="color:#0088cc;text-decoration:underline;">Unsubscribe</a>
        </p>
      </div>
    </div>
  </div>
</body>
</html>`,
    });
  } catch (err) {
    console.error('Failed to send welcome email:', err);
  }
}

// POST — Subscribe a new follower
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name } = body as { email: string; name?: string };

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    const db = await getDb();
    const collection = db.collection<Follower>('followers');

    // Check for duplicate
    const existing = await collection.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json(
        { error: 'This email is already subscribed.' },
        { status: 409 }
      );
    }

    const unsubscribeToken = crypto.randomUUID();
    const follower: Follower = {
      email: email.toLowerCase(),
      name: name || undefined,
      subscribedAt: new Date().toISOString(),
      unsubscribeToken,
    };

    await collection.insertOne(follower as any);

    // Send welcome confirmation email
    await sendWelcomeEmail(email.toLowerCase(), name, unsubscribeToken);

    return NextResponse.json(
      { success: true, message: 'Subscribed successfully!' },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST /api/followers error:', error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}

// GET — List all followers (admin only)
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const db = await getDb();
    const followers = await db
      .collection<Follower>('followers')
      .find()
      .toArray();

    return NextResponse.json({ followers });
  } catch (error) {
    console.error('GET /api/followers error:', error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}

// DELETE — Remove a follower (admin only)
export async function DELETE(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const body = await request.json();
    const { email } = body as { email: string };

    if (!email) {
      return NextResponse.json({ error: 'Email required.' }, { status: 400 });
    }

    const db = await getDb();
    await db.collection('followers').deleteOne({ email: email.toLowerCase() });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/followers error:', error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
