import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, serviceSlug, serviceName, grimoireTitle, pdfUrl } = body;

    // Validate required fields
    if (!email || !serviceSlug || !serviceName || !grimoireTitle || !pdfUrl) {
      return NextResponse.json(
        { message: "Missing required fields for the ritual" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "The email sigil is malformed" },
        { status: 400 }
      );
    }

    // In production, you would:
    // 1. Store the lead in your database/CRM
    // 2. Send the PDF via email using Resend
    // 3. Track the conversion

    // For now, we'll send a confirmation email with the download link
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: "Grimoire Keeper <grimoires@projectsixxx.com>",
          to: email,
          subject: `Your Grimoire: ${grimoireTitle} | Projectsixxx`,
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
              </head>
              <body style="margin: 0; padding: 0; background: #0a0a0f; font-family: Georgia, serif; color: #f0ebe3;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
                  <tr>
                    <td style="text-align: center; padding: 40px 0;">
                      <h1 style="font-family: 'Cinzel Decorative', Georgia, serif; color: #c0392b; font-size: 28px; margin: 0 0 16px; letter-spacing: 2px;">
                        THE GRIMOIRE IS BOUND
                      </h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="background: #11111a; border: 1px solid rgba(212, 165, 116, 0.12); border-radius: 8px; padding: 32px;">
                      <p style="font-size: 16px; line-height: 1.7; color: #d4c8b8; margin: 0 0 24px;">
                        The ritual is complete. Your grimoire has been inscribed and sealed.
                      </p>
                      
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
                        <tr>
                          <td style="padding: 16px; background: rgba(192, 57, 43, 0.08); border-radius: 4px;">
                            <p style="margin: 0; font-size: 14px; color: #a89888; text-transform: uppercase; letter-spacing: 1px;">Grimoire</p>
                            <p style="margin: 8px 0 0; font-family: 'Cinzel Decorative', Georgia, serif; color: #f0ebe3; font-size: 20px;">${grimoireTitle}</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 16px; background: rgba(192, 57, 43, 0.08); border-radius: 4px;">
                            <p style="margin: 0; font-size: 14px; color: #a89888; text-transform: uppercase; letter-spacing: 1px;">Service</p>
                            <p style="margin: 8px 0 0; font-family: 'Cinzel Decorative', Georgia, serif; color: #f0ebe3; font-size: 20px;">${serviceName}</p>
                          </td>
                        </tr>
                      </table>

                      <p style="font-size: 16px; line-height: 1.7; color: #d4c8b8; margin: 0 0 24px;">
                        The knowledge within was forged for those who walk the path of ${serviceName.toLowerCase()}. 
                        May it serve your empire well.
                      </p>

                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                        <tr>
                          <td style="text-align: center;">
                            <a href="${pdfUrl}" target="_blank" rel="noopener" style="display: inline-block; background: #c0392b; color: #030305; padding: 16px 32px; text-decoration: none; font-family: Inter, system-ui, sans-serif; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; border-radius: 0;">
                              READ THE GRIMOIRE
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="text-align: center; padding: 32px 0 0;">
                      <p style="font-size: 12px; color: #7a6d62; line-height: 1.6; margin: 0;">
                        This grimoire was summoned at your request. If you did not seek this knowledge, 
                        the seal was never broken.<br>
                        <a href="https://projectsixxx.com/unsubscribe" style="color: #c0392b; text-decoration: none;">Unseal from future missives</a> | 
                        <a href="https://projectsixxx.com/privacy" style="color: #c0392b; text-decoration: none;">Privacy Scroll</a>
                      </p>
                    </td>
                  </tr>
                </table>
              </body>
            </html>
          `,
        });
      } catch (emailError) {
        console.error("Failed to send grimoire email:", emailError);
        // Don't fail the request if email fails - the user can still download from the browser
      }
    }

    // Log the lead (in production, send to CRM/database)
    console.log("Grimoire requested:", {
      email,
      serviceSlug,
      serviceName,
      grimoireTitle,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "The grimoire has been bound and sent to your inbox.",
    });
  } catch (error) {
    console.error("Grimoire delivery error:", error);
    return NextResponse.json(
      { message: "The ritual failed. The spirits are restless." },
      { status: 500 }
    );
  }
}