import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { v2 as cloudinary } from "cloudinary";
import dbConnect from "@/lib/mongo";
import Assignment from "@/models/Assignment";
import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";
import { v4 as uuidv4 } from "uuid";
import { generateAnswer } from "@/lib/gemini";
import os from "os";
import { marked } from "marked";
import Payment from "@/models/Payment";
const tmpDir = os.tmpdir();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: NextRequest) {
  const { fullName, matricNumber, email, trx_ref } = await req.json();

  if (!fullName || !matricNumber || !email || !trx_ref) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    await dbConnect();
    const paymentDone = await Payment.findOne({ trx_ref });

    if (paymentDone) {
      const assignment = await Assignment.findOne({ email }).sort({
        createdAt: -1,
      });

      return NextResponse.json(
        {
          message: "Assignment already generated",
          pdfUrl: assignment?.pdfUrl,
          assignmentId: assignment?.assignmentId,
        },
        { status: 200 }
      );
    }

    // 1. Generate answer
    const prompt = `
    Generate a university-level Python programming assignment for the following 7 questions. Structure the response with 'COS102 Assignment' at the top. Then, for each question, provide a numbered section that includes:
    The question restated briefly.
    Well-indented Python code with unique variable names and values.
    The expected full output also in a code block,
    Ensure all answers are unique in code style, variable names, and explanation tone.

    Assignment questions:
    1. Generate a multiplication table from 1 to 10 using Python.
    2. Write a Python program to calculate Simple Interest with P ranging from 1 to 20, T = 2, and R = 5%.
    3. Write Python code to compute grades for 45 students based on UNILAG grading system.
    4. Write a flexible Python program to solve the quadratic formula:
        x = (–b ± √(b² - 4ac)) / 2a
    5. Write a Python program to print even numbers from 1 to 200 and compute their average.
    6. A store charges different prices based on quantity. Write a program to calculate total cost.
    7. Write a program to create a list of increasing 1's like [1, 11, 111, ...] up to 100 ones.

    Include well-indented code blocks and detailed explanations.
`;

    const markdown = await generateAnswer(prompt);
    const assignmentText = marked(markdown);

    // 2. Create styled HTML
    const html = `
  <html>
    <head>
    <style>
        body {
          font-family: Arial, Helvetica, sans-serif;
          font-size: 12pt;
          line-height: 1.5;
          color: #000;
          padding: 0;
        }

        h1, h2, h3 {
          color: #000033;
          font-weight: bold;
          margin-top: 24pt;
          margin-bottom: 12pt;
        }

        p {
          margin: 12pt 0;
        }

        pre {
          font-family: "Courier New", monospace;
          font-size: 10pt;
          background-color: #f3f3f3;
          border: 1px solid #ccc;
          border-radius: 5px;
          padding: 12px;
          white-space: pre-wrap;
          word-wrap: break-word;
          margin: 16pt 0;
        }

        code {
          font-family: "Courier New", monospace;
          font-size: 10pt;
          background-color: #f3f3f3;
          padding: 2px 4px;
          border-radius: 4px;
        }

        .page-break {
          page-break-before: always;
        }

        hr {
          border: none;
          border-top: 2px solid #000;
          margin: 30pt 0;
        }

        .page {
          page-break-after: always;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Matric No:</strong> ${matricNumber}</p>
        <p><strong>Email:</strong> ${email}</p>
      </div>
      <hr />
      <div class="content">
        ${assignmentText}
      </div>
    </body>
  </html>
  `;

    const pdfPath = path.join(tmpDir, `${uuidv4()}.pdf`);
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });
    await page.pdf({
      path: pdfPath,
      format: "A4",
      margin: {
        top: "1.54cm",
        bottom: "1.54cm",
        left: "2.17cm",
        right: "2.17cm",
      },
      printBackground: true,
    });
    await browser.close();

    const cloudResult = await cloudinary.uploader.upload(pdfPath, {
      resource_type: "raw",
      folder: "assignments",
      type: "upload",
    });
    fs.unlinkSync(pdfPath);
    const pdfUrl = cloudResult.secure_url;

    const assignment = await Assignment.create({
      fullName,
      matricNumber,
      email,
      pdfUrl,
      assignmentId: `COS102_${Date.now().toString().slice(-6)}_${Math.random()
        .toString(36)
        .substr(2, 4)
        .toUpperCase()}`,
    });

    await assignment.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER!,
        pass: process.env.EMAIL_PASS!,
      },
    });

    await transporter.sendMail({
      from: `Assignment Bot <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Assignment PDF",
      html: `<p>Hi ${fullName},</p>
           <p>Thanks for your submission. Your generated assignment is attached.</p>
           <a href="${pdfUrl}">Download your PDF</a>`,
    });

    const newPayment = await Payment.create({
      trx_ref,
      status: "completed",
    });

    await newPayment.save();
    return NextResponse.json(
      {
        message: "Assignment generated successfully",
        pdfUrl,
        assignmentId: await Assignment.findOne({ email })
          .sort({ createdAt: -1 })
          .then((doc) => doc.assignmentId),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in assignment generation:", error);
    return NextResponse.json(
      { error: "Failed to generate assignment. Please try again." },
      { status: 500 }
    );
  }
}
