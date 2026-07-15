import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { Follower } from '@/lib/types';
import { transporter } from '@/lib/email';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://deneth.dev';

function htmlPage(title: string, message: string, showBlogLink: boolean) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${title}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #0a0a1a;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #e0e0e0;
    }
    .card {
      background: #111827;
      border: 1px solid #1e3a5f;
      border-radius: 16px;
      padding: 48px;
      max-width: 480px;
      text-align: center;
    }
    h1 { color: #00e5ff; font-size: 1.5rem; margin-bottom: 16px; }
    p { color: #94a3b8; line-height: 1.6; margin-bottom: 24px; }
    a.btn {
      display: inline-block;
      padding: 12px 32px;
      background: linear-gradient(135deg, #0088cc, #00e5ff);
      color: #003366;
      font-weight: 600;
      text-decoration: none;
      border-radius: 8px;
      transition: opacity 0.2s;
    }
    a.btn:hover { opacity: 0.85; }
  </style>
</head>
<body>
  <div class="card">
    <h1>${title}</h1>
    <p>${message}</p>
    ${showBlogLink ? `<a class="btn" href="${SITE_URL}/blog">Back to Blog</a>` : ''}
  </div>
</body>
</html>`;
}

async function sendUnsubscribeEmail(email: string, name: string | undefined) {
  try {
    const displayName = name || 'there';

    await transporter.sendMail({
      from: `"Deneth Kavishka" <${process.env.ADMIN_EMAIL}>`,
      to: email,
      subject: "You've unsubscribed from Deneth Kavishka's Tech Blog",
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#0a0a1a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:40px 24px;">
    <div style="background:#111827;border:1px solid #1e3a5f;border-radius:16px;padding:40px 32px;text-align:center;">
      <img src="${SITE_URL}/icon.png" alt="Deneth Kavishka" style="width:80px;height:80px;border-radius:50%;margin:0 auto 24px;border:2px solid #00e5ff;object-fit:cover;display:block;" />
      <h1 style="color:#94a3b8;font-size:22px;margin-bottom:8px;font-weight:700;">We're Sorry To See You Go</h1>
      <p style="color:#f1f5f9;font-size:16px;margin-bottom:24px;">You've unsubscribed from Deneth Kavishka's Tech Blog</p>
      <div style="height:1px;background:linear-gradient(90deg,transparent,#0088cc,transparent);margin:0 0 24px;"></div>
      <p style="color:#94a3b8;font-size:15px;line-height:1.8;margin-bottom:24px;">
        Hey ${displayName},<br/><br/>
        You have been successfully unsubscribed and will no longer receive email notifications about new blog posts.
      </p>
      <p style="color:#94a3b8;font-size:15px;line-height:1.8;margin-bottom:32px;">
        If this was a mistake, you can always resubscribe anytime by visiting the blog. My content on <strong style="color:#f1f5f9;">Software Engineering</strong>, <strong style="color:#f1f5f9;">Full-Stack Web development</strong>, <strong style="color:#f1f5f9;">AI & ML</strong>, <strong style="color:#f1f5f9;">Data Science</strong>, <strong style="color:#f1f5f9;">Future Trends of Tech</strong>, and <strong style="color:#f1f5f9;">IOT & Robotics</strong> will always be free and open.
      </p>
      <a href="${SITE_URL}/blog" style="display:inline-block;padding:14px 36px;background:linear-gradient(135deg,#0088cc,#00e5ff);color:#003366;font-weight:700;text-decoration:none;border-radius:10px;font-size:15px;">
        Visit the Blog
      </a>
      <div style="margin-top:40px;padding-top:24px;border-top:1px solid #1e3a5f;">
        <p style="color:#64748b;font-size:12px;line-height:1.6;">
          This is a confirmation that you have been removed from Deneth Kavishka's Tech Blog mailing list.<br/>
          You will not receive any further emails.
        </p>
      </div>
    </div>
  </div>
</body>
</html>`,
    });
  } catch (err) {
    console.error('Failed to send unsubscribe email:', err);
  }
}

// GET — Unsubscribe via token
export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get('token');

    if (!token) {
      return new NextResponse(
        htmlPage(
          'Invalid Link',
          'Invalid or expired unsubscribe link.',
          false
        ),
        { status: 400, headers: { 'Content-Type': 'text/html' } }
      );
    }

    const db = await getDb();
    const result = await db
      .collection<Follower>('followers')
      .findOneAndDelete({ unsubscribeToken: token });

    if (!result) {
      return new NextResponse(
        htmlPage(
          'Invalid Link',
          'Invalid or expired unsubscribe link. You may have already unsubscribed.',
          false
        ),
        { status: 404, headers: { 'Content-Type': 'text/html' } }
      );
    }

    // Send farewell confirmation email
    await sendUnsubscribeEmail(result.email, result.name);

    return new NextResponse(
      htmlPage(
        'Unsubscribed Successfully',
        `You have been unsubscribed from Deneth Kavishka's Tech Blog. You will no longer receive blog post notifications. We're sorry to see you go!`,
        true
      ),
      { status: 200, headers: { 'Content-Type': 'text/html' } }
    );
  } catch (error) {
    console.error('GET /api/followers/unsubscribe error:', error);
    return new NextResponse(
      htmlPage('Error', 'Something went wrong. Please try again later.', false),
      { status: 500, headers: { 'Content-Type': 'text/html' } }
    );
  }
}

// POST — Unsubscribe via email (used by frontend button)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body as { email: string };

    if (!email) {
      return NextResponse.json({ error: 'Email required.' }, { status: 400 });
    }

    const db = await getDb();
    const result = await db
      .collection<Follower>('followers')
      .findOneAndDelete({ email: email.toLowerCase() });

    if (!result) {
      return NextResponse.json(
        { error: 'Email not found in subscribers.' },
        { status: 404 }
      );
    }

    // Send farewell confirmation email
    await sendUnsubscribeEmail(result.email, result.name);

    return NextResponse.json({ success: true, message: 'Unsubscribed successfully.' });
  } catch (error) {
    console.error('POST /api/followers/unsubscribe error:', error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}

