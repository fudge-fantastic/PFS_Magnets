/**
 * Email Service - SMTP Email Sending with Nodemailer
 *
 * This service handles sending emails for inquiries using SMTP configuration.
 * It sends two emails:
 * 1. Admin notification email
 * 2. Customer confirmation email
 */

import nodemailer from 'nodemailer';
import type { Inquiry } from './api';

// SMTP Configuration from environment variables
const SMTP_CONFIG = {
  server: process.env.SMTP_SERVER || 'smtpout.secureserver.net',
  port: parseInt(process.env.SMTP_PORT || '587'),
  username: process.env.SMTP_USERNAME || 'support@pixelforgestudio.in',
  password: process.env.SMTP_PASSWORD || '',
  fromEmail: process.env.SMTP_FROM_EMAIL || 'support@pixelforgestudio.in',
  adminEmail: process.env.ADMIN_EMAIL || 'support@pixelforgestudio.in'
};

/**
 * Create SMTP transporter
 */
function createTransporter() {
  if (!SMTP_CONFIG.password) {
    throw new Error('SMTP_PASSWORD is not configured');
  }

  return nodemailer.createTransport({
    host: SMTP_CONFIG.server,
    port: SMTP_CONFIG.port,
    secure: false, // true for 465, false for other ports
    auth: {
      user: SMTP_CONFIG.username,
      pass: SMTP_CONFIG.password
    },
    tls: {
      rejectUnauthorized: false // For self-signed certificates
    }
  });
}

/**
 * Generate admin notification email HTML
 */
function generateAdminEmailHtml(inquiry: Inquiry): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Inquiry - PixelForge Studio</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #f472b6 0%, #fb7185 100%); padding: 30px; border-radius: 15px 15px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">📬 New Inquiry Received</h1>
      </div>

      <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 15px 15px;">
        <div style="background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
          <h2 style="color: #f472b6; margin-top: 0; border-bottom: 2px solid #f472b6; padding-bottom: 10px;">Customer Information</h2>

          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 10px 0; font-weight: bold; width: 140px;">Name:</td>
              <td style="padding: 10px 0;">${inquiry.first_name} ${inquiry.last_name}</td>
            </tr>
            <tr style="background: #f8f9fa;">
              <td style="padding: 10px; font-weight: bold;">Email:</td>
              <td style="padding: 10px;"><a href="mailto:${inquiry.email}" style="color: #f472b6; text-decoration: none;">${inquiry.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold;">Phone:</td>
              <td style="padding: 10px 0;">${inquiry.phone_number || 'Not provided'}</td>
            </tr>
            <tr style="background: #f8f9fa;">
              <td style="padding: 10px; font-weight: bold;">Subject:</td>
              <td style="padding: 10px;">${inquiry.subject}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold;">Newsletter:</td>
              <td style="padding: 10px 0;">
                ${inquiry.subscribe_newsletter
                  ? '<span style="color: #10b981; font-weight: bold;">✓ Yes</span>'
                  : '<span style="color: #6b7280;">✗ No</span>'}
              </td>
            </tr>
            <tr style="background: #f8f9fa;">
              <td style="padding: 10px; font-weight: bold;">Reference ID:</td>
              <td style="padding: 10px;"><code style="background: #e5e7eb; padding: 4px 8px; border-radius: 4px; font-family: monospace;">${inquiry.reference_id}</code></td>
            </tr>
          </table>

          <h3 style="color: #f472b6; margin-top: 30px; margin-bottom: 15px;">Message</h3>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #f472b6;">
            <p style="margin: 0; white-space: pre-wrap;">${inquiry.message}</p>
          </div>

          <div style="margin-top: 30px; padding: 20px; background: #fef3f2; border-radius: 8px; border-left: 4px solid #fb7185;">
            <p style="margin: 0; color: #991b1b;">
              <strong>⚡ Action Required:</strong> Please respond to this inquiry within 2-4 hours.
            </p>
          </div>
        </div>

        <div style="text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px;">
          <p>This is an automated notification from PixelForge Studio</p>
          <p style="margin: 5px 0;">© ${new Date().getFullYear()} PixelForge Studio. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Generate customer confirmation email HTML
 */
function generateCustomerEmailHtml(inquiry: Inquiry): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank You - PixelForge Studio</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #f472b6 0%, #fb7185 100%); padding: 30px; border-radius: 15px 15px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">✨ Thank You for Contacting Us!</h1>
      </div>

      <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 15px 15px;">
        <div style="background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
          <p style="font-size: 18px; margin-top: 0;">Dear ${inquiry.first_name},</p>

          <p style="font-size: 16px; color: #4b5563;">
            Thank you for reaching out to <strong>PixelForge Studio</strong>! We've received your inquiry and our team is already reviewing it.
          </p>

          <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; margin: 25px 0;">
            <p style="margin: 0; color: #166534;">
              <strong>✓ Your inquiry has been successfully submitted</strong>
            </p>
          </div>

          <h3 style="color: #f472b6; margin-top: 25px; margin-bottom: 15px;">Inquiry Details</h3>
          <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
            <tr style="background: #f8f9fa;">
              <td style="padding: 10px; font-weight: bold; width: 140px;">Reference ID:</td>
              <td style="padding: 10px;"><code style="background: #e5e7eb; padding: 4px 8px; border-radius: 4px; font-family: monospace;">${inquiry.reference_id}</code></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold;">Subject:</td>
              <td style="padding: 10px 0;">${inquiry.subject}</td>
            </tr>
            <tr style="background: #f8f9fa;">
              <td style="padding: 10px; font-weight: bold;">Submitted:</td>
              <td style="padding: 10px;">${new Date().toLocaleString('en-IN', {
                dateStyle: 'full',
                timeStyle: 'short',
                timeZone: 'Asia/Kolkata'
              })}</td>
            </tr>
          </table>

          <h3 style="color: #f472b6; margin-top: 30px; margin-bottom: 15px;">What's Next?</h3>
          <ul style="color: #4b5563; padding-left: 20px;">
            <li style="margin-bottom: 10px;">Our team will review your inquiry thoroughly</li>
            <li style="margin-bottom: 10px;">We typically respond within <strong>2-4 hours</strong> during business hours</li>
            <li style="margin-bottom: 10px;">You'll receive a response at <strong>${inquiry.email}</strong></li>
            <li style="margin-bottom: 10px;">Please save your reference ID for future communication</li>
          </ul>

          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 25px 0;">
            <p style="margin: 0; color: #92400e;">
              <strong>📞 Need urgent assistance?</strong><br>
              Call us at: <a href="tel:+917219846935" style="color: #f472b6; text-decoration: none; font-weight: bold;">+91 7219846935</a>
            </p>
          </div>

          ${inquiry.subscribe_newsletter ? `
            <div style="background: #ede9fe; padding: 20px; border-radius: 8px; border-left: 4px solid #a855f7; margin: 25px 0;">
              <p style="margin: 0; color: #581c87;">
                <strong>🎉 You're subscribed to our newsletter!</strong><br>
                You'll receive updates on new products and special offers.
              </p>
            </div>
          ` : ''}

          <p style="font-size: 16px; margin-top: 30px; color: #4b5563;">
            Thank you for choosing PixelForge Studio for your custom magnet needs!
          </p>

          <p style="font-size: 16px; margin-bottom: 0; color: #4b5563;">
            Best regards,<br>
            <strong style="color: #f472b6;">The PixelForge Studio Team</strong>
          </p>
        </div>

        <div style="text-align: center; margin-top: 30px;">
          <p style="color: #6b7280; font-size: 14px; margin: 5px 0;">
            PixelForge Studio - Creating Beautiful Memories
          </p>
          <p style="color: #6b7280; font-size: 14px; margin: 5px 0;">
            © ${new Date().getFullYear()} PixelForge Studio. All rights reserved.
          </p>
          <div style="margin-top: 20px;">
            <a href="https://pixelforgestudio.in" style="color: #f472b6; text-decoration: none; margin: 0 10px;">Website</a>
            <span style="color: #d1d5db;">|</span>
            <a href="https://pixelforgestudio.in/gallery" style="color: #f472b6; text-decoration: none; margin: 0 10px;">Gallery</a>
            <span style="color: #d1d5db;">|</span>
            <a href="https://pixelforgestudio.in/contact" style="color: #f472b6; text-decoration: none; margin: 0 10px;">Contact</a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Send inquiry emails (admin notification + customer confirmation)
 */
export async function sendInquiryEmails(inquiry: Inquiry): Promise<{ success: boolean; message: string }> {
  try {
    // Validate required fields
    if (!inquiry.first_name || !inquiry.last_name || !inquiry.email || !inquiry.subject || !inquiry.message) {
      throw new Error('Missing required inquiry fields');
    }

    if (!inquiry.reference_id) {
      throw new Error('Reference ID is required');
    }

    // Create transporter
    const transporter = createTransporter();

    // Send admin notification email
    const adminEmailHtml = generateAdminEmailHtml(inquiry);
    await transporter.sendMail({
      from: `"PixelForge Studio" <${SMTP_CONFIG.fromEmail}>`,
      to: SMTP_CONFIG.adminEmail,
      subject: `🔔 New Inquiry: ${inquiry.subject}`,
      html: adminEmailHtml
    });

    console.log('Admin email sent successfully to:', SMTP_CONFIG.adminEmail);

    // Send customer confirmation email
    const customerEmailHtml = generateCustomerEmailHtml(inquiry);
    await transporter.sendMail({
      from: `"PixelForge Studio" <${SMTP_CONFIG.fromEmail}>`,
      to: inquiry.email,
      subject: `Thank you for contacting PixelForge Studio - ${inquiry.subject}`,
      html: customerEmailHtml
    });

    console.log('Customer confirmation email sent successfully to:', inquiry.email);

    return {
      success: true,
      message: 'Emails sent successfully'
    };

  } catch (error: any) {
    console.error('Error sending emails:', error);
    return {
      success: false,
      message: error.message || 'Failed to send emails'
    };
  }
}

/**
 * Test SMTP connection
 */
export async function testSMTPConnection(): Promise<{ success: boolean; message: string }> {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    return {
      success: true,
      message: 'SMTP connection successful'
    };
  } catch (error: any) {
    console.error('SMTP connection error:', error);
    return {
      success: false,
      message: error.message || 'SMTP connection failed'
    };
  }
}
