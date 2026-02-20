
import express from 'express';
import { createServer as createViteServer } from 'vite';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));

  // API Route for sending invoice
  app.post('/api/send-invoice', async (req, res) => {
    const { email, name, pdfBase64, orderId } = req.body;

    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;

    if (!user || !pass) {
      console.error("EMAIL_USER or EMAIL_PASS environment variables are missing.");
      return res.status(500).json({ error: 'სერვერის კონფიგურაციის შეცდომა: ცვლადები ვერ მოიძებნა' });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: user,
        pass: pass,
      },
    });

    try {
      await transporter.verify();

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

              <p style="font-size: 14px; color: #888;">კითხვების შემთხვევაში: <strong>+995 555 682 266</strong></p>
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
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
