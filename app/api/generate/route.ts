import { NextRequest, NextResponse } from 'next/server';
import { generateAnswer } from '@/lib/gemini';
import { createPrompt } from '@/lib/promptBuilder';
import { generatePDF } from '@/lib/generatePdf';
import { transporter } from '@/lib/mailer';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req: NextRequest) {
  const { name, matric, email } = await req.json();

  const prompt = createPrompt(name, matric);
  const aiAnswer = await generateAnswer(prompt);

  // Generate basic HTML layout for PDF
  const html = `
    <html>
      <head>
        <style>
          body { font-family: sans-serif; padding: 40px; }
          h1 { text-align: center; }
          pre {
            background: #f4f4f4;
            padding: 10px;
            overflow-x: auto;
            font-family: monospace;
          }
        </style>
      </head>
      <body>
        <h1>CSC201 Assignment</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Matric:</strong> ${matric}</p>
        <hr />
        ${aiAnswer
          .replace(/```python/g, '<pre>')
          .replace(/```/g, '</pre>')
          .replace(/\n/g, '<br>')}
      </body>
    </html>
  `;

  const outputPath = path.join('/tmp', `${matric}-assignment.pdf`);
  await generatePDF(html, outputPath);
  const pdfBuffer = await fs.readFile(outputPath);

  // Send Email
  await transporter.sendMail({
    from: `"COS102 Bot" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your Assignment is Ready',
    text: 'Your generated assignment is attached.',
    attachments: [{
      filename: 'assignment.pdf',
      content: pdfBuffer
    }]
  });

  return NextResponse.json({
    message: 'Assignment generated and emailed successfully!',
    pdf: `data:application/pdf;base64,${pdfBuffer.toString('base64')}`,
  });
}
