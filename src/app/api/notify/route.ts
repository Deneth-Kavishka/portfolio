import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { Follower } from '@/lib/types';
import { transporter } from '@/lib/email';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://deneth.dev';

function buildEmailHtml(
  postTitle: string,
  postSlug: string,
  postExcerpt: string,
  unsubscribeToken: string,
  postCoverImage?: string
) {
  const readUrl = `${SITE_URL}/blog/${postSlug}`;
  const unsubscribeUrl = `${SITE_URL}/api/followers/unsubscribe?token=${unsubscribeToken}`;

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#0a0a1a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a1a;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#111827;border:1px solid #1e3a5f;border-radius:16px;overflow:hidden;">
        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#003366,#0088cc);padding:32px 40px;text-align:center;">
            <h1 style="margin:0;color:#ffffff;font-size:14px;text-transform:uppercase;letter-spacing:2px;">New Blog Post</h1>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:40px;">
            ${postCoverImage ? `<img src="${SITE_URL}${postCoverImage}" alt="Cover Image" style="width:100%;height:auto;border-radius:12px;margin-bottom:24px;border:1px solid #1e3a5f;" />` : ''}
            <h2 style="margin:0 0 16px;color:#00e5ff;font-size:24px;line-height:1.3;">${postTitle}</h2>
            <div style="display:flex;align-items:center;margin-bottom:24px;gap:12px;">
              <img src="${SITE_URL}/icon.png" alt="Deneth Kavishka" style="width:40px;height:40px;border-radius:50%;object-fit:cover;border:1px solid #00e5ff;display:block;" />
              <div>
                <p style="margin:0;color:#f1f5f9;font-weight:600;font-size:14px;">Deneth Kavishka</p>
                <p style="margin:0;color:#94a3b8;font-size:12px;">Author</p>
              </div>
            </div>
            <p style="margin:0 0 32px;color:#94a3b8;font-size:16px;line-height:1.6;">${postExcerpt}</p>
            <table cellpadding="0" cellspacing="0"><tr><td>
              <a href="${readUrl}" style="display:inline-block;padding:14px 36px;background:linear-gradient(135deg,#0088cc,#00e5ff);color:#003366;font-weight:700;text-decoration:none;border-radius:8px;font-size:16px;">
                Read Article
              </a>
            </td></tr></table>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:24px 40px;border-top:1px solid #1e3a5f;text-align:center;">
            <p style="margin:0;color:#475569;font-size:12px;line-height:1.5;">
              You're receiving this because you subscribed to Deneth's blog.<br/>
              <a href="${unsubscribeUrl}" style="color:#0088cc;text-decoration:underline;">Unsubscribe</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// POST — Send notification email to all followers
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const body = await request.json();
    const { postTitle, postSlug, postExcerpt, postCoverImage } = body as {
      postTitle: string;
      postSlug: string;
      postExcerpt: string;
      postCoverImage?: string;
    };

    if (!postTitle?.trim() || !postSlug?.trim() || !postExcerpt?.trim()) {
      return NextResponse.json(
        { error: 'postTitle, postSlug, and postExcerpt are required.' },
        { status: 400 }
      );
    }

    const db = await getDb();
    const followers = await db
      .collection<Follower>('followers')
      .find()
      .toArray();

    let sentCount = 0;
    const errors: string[] = [];

    // Send to each follower
    for (const follower of followers) {
      try {
        await transporter.sendMail({
          from: `"Deneth Kavishka" <${process.env.ADMIN_EMAIL}>`,
          to: follower.email,
          subject: `New Blog Post: ${postTitle}`,
          html: buildEmailHtml(
            postTitle,
            postSlug,
            postExcerpt,
            follower.unsubscribeToken,
            postCoverImage
          ),
        });
        sentCount++;
      } catch (err) {
        console.error(`Failed to send to ${follower.email}:`, err);
        errors.push(follower.email);
      }
    }

    // Send admin copy
    const adminEmail = process.env.ADMIN_EMAIL || 'blog.deneth@gmail.com';
    try {
      await transporter.sendMail({
        from: `"Deneth Kavishka" <${process.env.ADMIN_EMAIL}>`,
        to: adminEmail,
        subject: `[Admin Copy] New Blog Post: ${postTitle}`,
        html: buildEmailHtml(postTitle, postSlug, postExcerpt, 'admin', postCoverImage),
      });
    } catch (err) {
      console.error('Failed to send admin copy:', err);
    }

    return NextResponse.json({
      success: true,
      sentCount,
      totalFollowers: followers.length,
      ...(errors.length > 0 && { failedEmails: errors }),
    });
  } catch (error) {
    console.error('POST /api/notify error:', error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
