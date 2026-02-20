
import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'მეთოდი დაუშვებელია' });
  }

  try {
    const { email, name, pdfBase64, orderId } = req.body;

    if (!email || !pdfBase64) {
      return res.status(400).json({ error: 'აკლია აუცილებელი მონაცემები' });
    }

    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;

    if (!user || !pass) {
      console.error("EMAIL_USER or EMAIL_PASS environment variables are missing.");
      return res.status(500).json({ error: 'სერვერის კონფიგურაციის შეცდომა: ცვლადები ვერ მოიძებნა' });
    }

    // Gmail SMTP Transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: user,
        pass: pass.replace(/\s/g, ''), // Strip spaces from app password if any
      },
    });

    // Verify connection
    await transporter.verify();

    // Clean up base64 string
    const rawBase64 = pdfBase64.split(',').pop();

    const mailOptions = {
      from: `"Niamori | ნიამორი" <${user}>`,
      to: email,
      bcc: 'niamorimarketing@gmail.com',
      subject: `შეკვეთა #${orderId} - ინვოისი - ნიამორი`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; border: 1px solid #f0f0f0; border-radius: 20px; overflow: hidden;">
          <div style="background-color: #000000; padding: 40px; text-align: center;">
            <h1 style="color: #d4af37; margin: 0; letter-spacing: 8px; font-size: 28px; text-transform: uppercase;">NIAMORI</h1>
          </div>
          <div style="padding: 50px 40px;">
            <h2 style="font-size: 22px; font-weight: 900; color: #000;">გამარჯობა ${name},</h2>
            <p>გმადლობთ ნიამორის არჩევისთვის. თქვენი შეკვეთა წარმატებით მიღებულია.</p>
            <p>ინვოისი მიბმულია ამ წერილზე PDF ფორმატში.</p>
            
            <div style="margin: 30px 0; padding: 20px; background-color: #fcf9f0; border-radius: 10px;">
              <p style="margin: 0; font-size: 12px; color: #998750; font-weight: bold;">შეკვეთის ნომერი: #${orderId}</p>
            </div>

            <p style="font-size: 14px; color: #888;">კითხვების შემთხვევაში: <strong>+995 599 235 129</strong></p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: `invoice-${orderId}.pdf`,
          content: rawBase64,
          encoding: 'base64',
          contentType: 'application/pdf'
        }
      ]
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    
    return res.status(200).json({ success: true, messageId: info.messageId });
  } catch (error: any) {
    console.error('Nodemailer Error:', error);
    return res.status(500).json({ 
      error: 'მეილის გაგზავნა ვერ მოხერხდა', 
      details: error.message,
      code: error.code
    });
  }
}
