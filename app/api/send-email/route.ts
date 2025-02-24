import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  const { name, email, message } = await request.json()

  // Debugging: Log environment variables
  console.log('ZOHO_EMAIL:', process.env.ZOHO_EMAIL)
  console.log('ZOHO_PASSWORD:', process.env.ZOHO_PASSWORD ? '***' : 'Not set')

  // Configure Nodemailer with Zoho SMTP
  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true, // Use SSL
    auth: {
      user: process.env.ZOHO_EMAIL, // Your Zoho email address
      pass: process.env.ZOHO_PASSWORD, // Your Zoho password or app password
    },
  })

  // Email content
  const mailOptions = {
    from: process.env.ZOHO_EMAIL, // Sender address
    to: process.env.ZOHO_EMAIL, // Recipient address (your email)
    subject: `New Message from ${name} (${email})`,
    text: message,
    html: `<p>You have a new message from <strong>${name}</strong> (${email}):</p><p>${message}</p>`,
  }

  try {
    // Verify SMTP connection
    await transporter.verify()
    console.log('SMTP connection verified')

    // Send email
    await transporter.sendMail(mailOptions)
    console.log('Email sent successfully')
    return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json({ message: 'Failed to send email.' }, { status: 500 })
  }
}