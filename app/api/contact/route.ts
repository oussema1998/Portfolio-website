import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

type RateBucket = {
  count: number;
  firstAttemptAt: number;
};

type ContactPayload = {
  nom: string;
  email: string;
  telephone: string;
  besoin: string;
  sujet: string;
  message: string;
};

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const OWNER_EMAIL = "belhaouene.oussema@esprit.tn";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const globalState = globalThis as typeof globalThis & {
  __contactRateLimiter?: Map<string, RateBucket>;
};

const rateLimiter = globalState.__contactRateLimiter ?? new Map<string, RateBucket>();
globalState.__contactRateLimiter = rateLimiter;

const getClientIp = (request: NextRequest): string => {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const firstIp = forwardedFor.split(",")[0]?.trim();
    if (firstIp) {
      return firstIp;
    }
  }

  return request.headers.get("x-real-ip") ?? "unknown";
};

const validatePayload = (payload: ContactPayload): string | null => {
  if (!payload.nom.trim()) return "Le nom est requis.";
  if (!payload.email.trim() || !emailPattern.test(payload.email)) return "Email invalide.";
  if (!payload.sujet.trim()) return "Le sujet est requis.";
  if (!payload.message.trim()) return "Le message est requis.";
  return null;
};

const isRateLimited = (ip: string, now: number): { blocked: boolean; retryAfter: number } => {
  const current = rateLimiter.get(ip);

  if (!current) {
    rateLimiter.set(ip, { count: 1, firstAttemptAt: now });
    return { blocked: false, retryAfter: 0 };
  }

  const elapsed = now - current.firstAttemptAt;

  if (elapsed > RATE_LIMIT_WINDOW_MS) {
    rateLimiter.set(ip, { count: 1, firstAttemptAt: now });
    return { blocked: false, retryAfter: 0 };
  }

  if (current.count >= RATE_LIMIT_MAX) {
    const retryAfter = Math.ceil((RATE_LIMIT_WINDOW_MS - elapsed) / 1000);
    return { blocked: true, retryAfter };
  }

  current.count += 1;
  rateLimiter.set(ip, current);
  return { blocked: false, retryAfter: 0 };
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<ContactPayload>;
    const payload: ContactPayload = {
      nom: body.nom ?? "",
      email: body.email ?? "",
      telephone: body.telephone ?? "",
      besoin: body.besoin ?? "",
      sujet: body.sujet ?? "",
      message: body.message ?? "",
    };

    const validationError = validatePayload(payload);
    if (validationError) {
      return NextResponse.json({ message: validationError }, { status: 400 });
    }

    const ip = getClientIp(request);
    const now = Date.now();
    const rateStatus = isRateLimited(ip, now);

    if (rateStatus.blocked) {
      return NextResponse.json(
        {
          message:
            "Vous avez dépassé la limite de tentatives. Merci d'attendre avant un nouvel envoi.",
          retryAfter: rateStatus.retryAfter,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateStatus.retryAfter),
          },
        },
      );
    }

    const notifierEmail = process.env.EMAIL_NOTIFIER;
    const notifierPass = process.env.EMAIL_PASS;

    if (!notifierEmail || !notifierPass) {
      return NextResponse.json(
        { message: "Configuration email manquante sur le serveur." },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: notifierEmail,
        pass: notifierPass,
      },
    });

    const ownerSubject = `Nouveau formulaire contact - ${payload.sujet}`;
    const ownerText = [
      "Nouveau formulaire reçu depuis le site.",
      "",
      `Nom: ${payload.nom}`,
      `Email: ${payload.email}`,
      `Téléphone: ${payload.telephone || "Non renseigné"}`,
      `Type de besoin: ${payload.besoin || "Non renseigné"}`,
      `Sujet: ${payload.sujet}`,
      "",
      "Message:",
      payload.message,
      "",
      `IP source: ${ip}`,
      `Date: ${new Date().toLocaleString("fr-FR")}`,
    ].join("\n");

    const ownerHtml = `
      <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.5;color:#111">
        <h2 style="margin:0 0 12px;color:#FF1E27">Nouveau formulaire reçu</h2>
        <p>Un nouveau message a été soumis via votre formulaire de contact.</p>
        <table cellpadding="6" cellspacing="0" style="border-collapse:collapse;margin-top:8px">
          <tr><td><strong>Nom</strong></td><td>${payload.nom}</td></tr>
          <tr><td><strong>Email</strong></td><td>${payload.email}</td></tr>
          <tr><td><strong>Téléphone</strong></td><td>${payload.telephone || "Non renseigné"}</td></tr>
          <tr><td><strong>Besoin</strong></td><td>${payload.besoin || "Non renseigné"}</td></tr>
          <tr><td><strong>Sujet</strong></td><td>${payload.sujet}</td></tr>
          <tr><td><strong>IP source</strong></td><td>${ip}</td></tr>
          <tr><td><strong>Date</strong></td><td>${new Date().toLocaleString("fr-FR")}</td></tr>
        </table>
        <p style="margin-top:14px"><strong>Message:</strong><br/>${payload.message.replace(/\n/g, "<br/>")}</p>
      </div>
    `;

    const userSubject = `Re: ${payload.sujet} - Formulaire bien reçu`;
    const userText = [
      `Bonjour ${payload.nom},`,
      "",
      "Merci pour votre message.",
      "Nous confirmons la bonne réception de votre formulaire.",
      "Vous serez contacté dans environ 24 heures.",
      "",
      `Sujet reçu: ${payload.sujet}`,
      "",
      "Bien cordialement,",
      "Oussema Belhaouene",
    ].join("\n");

    const userHtml = `
      <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.5;color:#111">
        <h2 style="margin:0 0 12px;color:#FF1E27">Message bien reçu</h2>
        <p>Bonjour ${payload.nom},</p>
        <p>Merci pour votre message. Nous confirmons la bonne réception de votre formulaire.</p>
        <p>Vous serez contacté dans environ <strong>24 heures</strong>.</p>
        <p><strong>Sujet reçu:</strong> ${payload.sujet}</p>
        <p style="margin-top:16px">Bien cordialement,<br/>Oussema Belhaouene</p>
      </div>
    `;

    await transporter.sendMail({
      from: `Portfolio Oussema <${notifierEmail}>`,
      to: OWNER_EMAIL,
      replyTo: payload.email,
      subject: ownerSubject,
      text: ownerText,
      html: ownerHtml,
    });

    await transporter.sendMail({
      from: `Portfolio Oussema <${notifierEmail}>`,
      to: payload.email,
      subject: userSubject,
      text: userText,
      html: userHtml,
    });

    return NextResponse.json({ message: "Email envoyé avec succès." });
  } catch {
    return NextResponse.json(
      { message: "Échec de l'envoi. Merci de réessayer." },
      { status: 500 },
    );
  }
}
