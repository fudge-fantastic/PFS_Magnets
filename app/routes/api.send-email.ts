/**
 * API Route: Send Email via SMTP
 *
 * This server action handles sending inquiry emails via SMTP using nodemailer.
 * Called after inquiry is saved to Supabase database.
 */

import { type ActionFunctionArgs } from 'react-router';
import { sendInquiryEmails } from '~/lib/email.server';
import type { Inquiry } from '~/lib/api';

export async function action({ request }: ActionFunctionArgs) {
  // Only allow POST requests
  if (request.method !== 'POST') {
    return Response.json(
      { success: false, message: 'Method not allowed' },
      { status: 405 }
    );
  }

  try {
    // Parse request body
    const inquiry: Inquiry = await request.json();

    // Validate required fields
    if (!inquiry.first_name || !inquiry.last_name || !inquiry.email || !inquiry.subject || !inquiry.message) {
      return Response.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!inquiry.reference_id) {
      return Response.json(
        { success: false, message: 'Reference ID is required' },
        { status: 400 }
      );
    }

    // Send emails via SMTP
    const result = await sendInquiryEmails(inquiry);

    if (result.success) {
      return Response.json({
        success: true,
        message: 'Emails sent successfully'
      });
    } else {
      return Response.json(
        { success: false, message: result.message },
        { status: 500 }
      );
    }

  } catch (error: any) {
    console.error('Email API error:', error);
    return Response.json(
      { success: false, message: error.message || 'Failed to send emails' },
      { status: 500 }
    );
  }
}
