"use client";

import { FormEvent, useMemo, useState } from "react";

type FormState = {
  nom: string;
  email: string;
  telephone: string;
  besoin: string;
  sujet: string;
  message: string;
};

type AlertState = {
  type: "success" | "error" | "rate-limit";
  message: string;
};

const initialState: FormState = {
  nom: "",
  email: "",
  telephone: "",
  besoin: "",
  sujet: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState<AlertState | null>(null);

  const alertClassName = useMemo(() => {
    if (!alert) return "";
    if (alert.type === "success") return "border-emerald-400/45 bg-emerald-500/15 text-emerald-100";
    if (alert.type === "rate-limit") return "border-amber-400/45 bg-amber-500/15 text-amber-100";
    return "border-red-400/45 bg-red-500/15 text-red-100";
  }, [alert]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setAlert(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = (await response.json()) as { message?: string; retryAfter?: number };

      if (response.status === 429) {
        const waitMinutes = data.retryAfter ? Math.ceil(data.retryAfter / 60) : 10;
        setAlert({
          type: "rate-limit",
          message: `Trop de tentatives détectées. Merci d'attendre environ ${waitMinutes} minute(s) avant de réessayer.`,
        });
        return;
      }

      if (!response.ok) {
        setAlert({
          type: "error",
          message: data.message ?? "Erreur lors de l'envoi du formulaire.",
        });
        return;
      }

      setAlert({
        type: "success",
        message: "Email envoyé avec succès. Vous recevrez une réponse dans environ 24 heures.",
      });
      setForm(initialState);
    } catch {
      setAlert({
        type: "error",
        message: "Impossible d'envoyer le formulaire pour le moment. Merci de réessayer.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {alert ? (
        <div
          role="status"
          className={`fixed right-4 top-4 z-[120] max-w-sm rounded-sm border px-4 py-3 text-sm shadow-lg backdrop-blur ${alertClassName}`}
        >
          {alert.message}
        </div>
      ) : null}

      <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
        <div className="grid gap-5 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-sm font-medium text-white/82">Nom complet</span>
            <input
              type="text"
              name="nom"
              value={form.nom}
              required
              onChange={(event) => setForm((prev) => ({ ...prev, nom: event.target.value }))}
              placeholder="Votre nom"
              className="h-12 rounded-sm border border-white/12 bg-[#0E0E0E] px-4 text-white outline-none transition-colors placeholder:text-white/35 focus:border-[#FF1E27]/70"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-white/82">Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              required
              onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
              placeholder="votre@email.com"
              className="h-12 rounded-sm border border-white/12 bg-[#0E0E0E] px-4 text-white outline-none transition-colors placeholder:text-white/35 focus:border-[#FF1E27]/70"
            />
          </label>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-sm font-medium text-white/82">Téléphone</span>
            <input
              type="tel"
              name="telephone"
              value={form.telephone}
              onChange={(event) => setForm((prev) => ({ ...prev, telephone: event.target.value }))}
              placeholder="+216 92 073 061"
              className="h-12 rounded-sm border border-white/12 bg-[#0E0E0E] px-4 text-white outline-none transition-colors placeholder:text-white/35 focus:border-[#FF1E27]/70"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-white/82">Type de besoin</span>
            <select
              name="besoin"
              value={form.besoin}
              onChange={(event) => setForm((prev) => ({ ...prev, besoin: event.target.value }))}
              className="h-12 rounded-sm border border-white/12 bg-[#0E0E0E] px-4 text-white outline-none transition-colors focus:border-[#FF1E27]/70"
            >
              <option value="">Sélectionner</option>
              <option>Architecture data</option>
              <option>Analyse & reporting</option>
              <option>Intelligence artificielle</option>
              <option>Développement web</option>
              <option>Autre</option>
            </select>
          </label>
        </div>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-white/82">Sujet</span>
          <input
            type="text"
            name="sujet"
            value={form.sujet}
            required
            onChange={(event) => setForm((prev) => ({ ...prev, sujet: event.target.value }))}
            placeholder="Objet de votre demande"
            className="h-12 rounded-sm border border-white/12 bg-[#0E0E0E] px-4 text-white outline-none transition-colors placeholder:text-white/35 focus:border-[#FF1E27]/70"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-white/82">Message</span>
          <textarea
            name="message"
            rows={7}
            value={form.message}
            required
            onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
            placeholder="Décrivez votre besoin, votre contexte et vos objectifs."
            className="rounded-sm border border-white/12 bg-[#0E0E0E] px-4 py-3 text-white outline-none transition-colors placeholder:text-white/35 focus:border-[#FF1E27]/70"
          />
        </label>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex h-12 items-center justify-center rounded-sm bg-[#FF1E27] px-8 text-sm font-semibold uppercase tracking-[1.3px] text-white transition-colors hover:bg-[#ff3e46] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Envoi en cours..." : "Envoyer la demande"}
          </button>
        </div>
      </form>
    </>
  );
}
