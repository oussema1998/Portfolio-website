"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useSitePreferences } from "../context/SitePreferencesContext";

const testimonialsByLocale = {
  fr: [
    {
      name: "Farid Khouani",
      role: "PDG",
      organization: "@Elyssa-call",
      organizationUrl:
        "https://www.https://www.elyssa-call.com/",
      image: "/images/temoignages/farid_khouani.png",
      rating: 5,
      quote:
        "J'ai eu l'opportunité de collaborer avec Oussema sur un projet. Il a fourni un travail de grande qualité tout en respectant les délais fixés.",
    },
    {
      name: "Yosra Makhlouf",
      role: "Ingénieure en informatique",
      organization: "@BVMT",
      organizationUrl: "https://www.linkedin.com/company/tunisstockexchange/",
      image: "/images/temoignages/yosra_makhlouf.png",
      rating: 5,
      quote:
        "J'ai encadré Oussema durant son stage en data. Il s'est distingué par son sérieux, sa discipline et son engagement tout au long de la mission. Bonne continuation à lui.",
    },
    {
      name: "Safouene Zouari",
      role: "Enseignant",
      organization: "@ESPRIT",
      organizationUrl: "https://www.esprit.tn/",
      image: "/images/temoignages/safouene_zouari.png",
      rating: 5,
      quote:
        "Oussema est un étudiant ambitieux, bien organisé et rigoureux. Il se distingue par son dynamisme et son professionnalisme.",
    },
    {
      name: "Zied Saidi",
      role: "Responsable vie scolaire",
      organization: "@ESPRIT",
      organizationUrl: "https://www.esprit.tn/",
      image: "/images/temoignages/zied_saidi.png",
      rating: 4.5,
      quote:
        "J’ai eu l’occasion de collaborer avec Oussema lors de l’organisation de plusieurs événements, alors qu’il occupait le poste de président d’un club à ESPRIT. Il s’est distingué par son dynamisme, son sens de l’initiative et son engagement.",
    },
  ],
  en: [
    {
      name: "Farid Khouani",
      role: "CEO",
      organization: "@Elyssa-call",
      organizationUrl:
        "https://www.linkedin.com/in/khouani-farid-c-e-o-d%E2%80%99elyssa-call-494082279/",
      image: "/images/temoignages/farid_khouani.png",
      rating: 5,
      quote:
        "I had the opportunity to collaborate with Oussema on a project. He delivered high-quality work while meeting the set deadlines.",
    },
    {
      name: "Yosra Makhlouf",
      role: "Software engineer",
      organization: "@BVMT",
      organizationUrl: "https://www.linkedin.com/company/tunisstockexchange/",
      image: "/images/temoignages/yosra_makhlouf.png",
      rating: 5,
      quote:
        "I supervised Oussema during his data internship. He stood out for his seriousness, discipline, and commitment throughout the mission. Wishing him all the best.",
    },
    {
      name: "Safouene Zouari",
      role: "Instructor",
      organization: "@ESPRIT",
      organizationUrl: "https://www.esprit.tn/",
      image: "/images/temoignages/safouene_zouari.png",
      rating: 5,
      quote:
        "Oussema is an ambitious, well-organized, and rigorous student. He stands out for his dynamism and professionalism.",
    },
    {
      name: "Zied Saidi",
      role: "Student life manager",
      organization: "@ESPRIT",
      organizationUrl: "https://www.esprit.tn/",
      image: "/images/temoignages/zied_saidi.png",
      rating: 4.5,
      quote:
        "I had the opportunity to collaborate with Oussema in organizing several events when he was president of a club at ESPRIT. He stood out for his dynamism, initiative, and commitment.",
    },
  ],
} as const;

export default function TestimonialsSection() {
  const { locale } = useSitePreferences();
  const isFrench = locale === "fr";
  const testimonials = testimonialsByLocale[locale as keyof typeof testimonialsByLocale];
  const testimonialsLoop = [testimonials[testimonials.length - 1], ...testimonials, testimonials[0]];
  const firstLoopIndex = 0;
  const lastLoopIndex = testimonials.length + 1;
  const copy = isFrench
    ? {
        kicker: "Témoignages",
        title: "Témoignages et recommandations",
        ratingLabel: "étoiles sur 5",
      }
    : {
        kicker: "Testimonials",
        title: "Testimonials and recommendations",
        ratingLabel: "stars out of 5",
      };

  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(1);
  const [isTestimonialTransitionEnabled, setIsTestimonialTransitionEnabled] = useState(true);
  const [testimonialDragOffset, setTestimonialDragOffset] = useState(0);
  const [isTestimonialDragging, setIsTestimonialDragging] = useState(false);
  const testimonialTimeoutRef = useRef<number | null>(null);
  const restartAutoplayRef = useRef<() => void>(() => {});
  const testimonialSliderRef = useRef<HTMLDivElement>(null);
  const testimonialDragStartXRef = useRef<number | null>(null);
  const isTestimonialDraggingRef = useRef(false);

  useEffect(() => {
    isTestimonialDraggingRef.current = isTestimonialDragging;
  }, [isTestimonialDragging]);

  useEffect(() => {
    const clearAutoplay = () => {
      if (testimonialTimeoutRef.current !== null) {
        window.clearTimeout(testimonialTimeoutRef.current);
      }
    };

    const scheduleNext = () => {
      clearAutoplay();
      testimonialTimeoutRef.current = window.setTimeout(() => {
        if (!isTestimonialDraggingRef.current) {
          setIsTestimonialTransitionEnabled(true);
          setActiveTestimonialIndex((currentIndex) =>
            Math.min(currentIndex + 1, lastLoopIndex),
          );
        }
        scheduleNext();
      }, 7000);
    };

    restartAutoplayRef.current = scheduleNext;
    scheduleNext();

    return clearAutoplay;
  }, []);

  const displayedTestimonialIndex =
    (activeTestimonialIndex - 1 + testimonials.length) % testimonials.length;

  const handleTestimonialTransitionEnd = () => {
    if (activeTestimonialIndex !== firstLoopIndex && activeTestimonialIndex !== lastLoopIndex) {
      return;
    }

    setIsTestimonialTransitionEnabled(false);

    if (activeTestimonialIndex === lastLoopIndex) {
      setActiveTestimonialIndex(1);
    } else {
      setActiveTestimonialIndex(testimonials.length);
    }

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setIsTestimonialTransitionEnabled(true);
      });
    });
  };

  const goToPreviousTestimonial = () => {
    setIsTestimonialTransitionEnabled(true);
    setActiveTestimonialIndex((currentIndex) => Math.max(currentIndex - 1, firstLoopIndex));
    restartAutoplayRef.current();
  };

  const goToNextTestimonial = () => {
    setIsTestimonialTransitionEnabled(true);
    setActiveTestimonialIndex((currentIndex) => Math.min(currentIndex + 1, lastLoopIndex));
    restartAutoplayRef.current();
  };

  const finishTestimonialDrag = (deltaX: number) => {
    const sliderWidth = testimonialSliderRef.current?.offsetWidth ?? 1;
    const threshold = Math.min(120, Math.max(50, sliderWidth * 0.12));

    if (deltaX > threshold) {
      goToPreviousTestimonial();
    } else if (deltaX < -threshold) {
      goToNextTestimonial();
    } else {
      restartAutoplayRef.current();
    }

    setTestimonialDragOffset(0);
    setIsTestimonialDragging(false);
    testimonialDragStartXRef.current = null;
  };

  const handleTestimonialPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    if ((event.target as HTMLElement).closest("a,button")) {
      return;
    }

    testimonialDragStartXRef.current = event.clientX;
    setIsTestimonialDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleTestimonialPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isTestimonialDragging || testimonialDragStartXRef.current === null) {
      return;
    }

    const rawOffset = event.clientX - testimonialDragStartXRef.current;
    const sliderWidth = testimonialSliderRef.current?.offsetWidth ?? 1;
    const clampedOffset = Math.max(-sliderWidth * 0.6, Math.min(sliderWidth * 0.6, rawOffset));

    setTestimonialDragOffset(clampedOffset);
  };

  const handleTestimonialPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (testimonialDragStartXRef.current === null) {
      return;
    }

    finishTestimonialDrag(event.clientX - testimonialDragStartXRef.current);
  };

  const handleTestimonialPointerCancel = () => {
    setTestimonialDragOffset(0);
    setIsTestimonialDragging(false);
    testimonialDragStartXRef.current = null;
  };

  return (
    <section className="w-full bg-[#151515] px-4 py-16 md:px-8 md:py-20">
      <div className="mx-auto w-full max-w-[1480px] text-white">
        <div className="flex flex-col gap-4 text-center md:items-center">
          <span className="block text-xl font-bold uppercase tracking-[2.2px] text-[#FF1E27] md:text-2xl">
            {copy.kicker}
          </span>
          <h2 className="text-4xl font-semibold md:text-5xl">{copy.title}</h2>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <div
            ref={testimonialSliderRef}
            className={`overflow-hidden select-none ${
              isTestimonialDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            onDragStart={(event) => event.preventDefault()}
            onPointerDown={handleTestimonialPointerDown}
            onPointerMove={handleTestimonialPointerMove}
            onPointerUp={handleTestimonialPointerUp}
            onPointerCancel={handleTestimonialPointerCancel}
            style={{ touchAction: "pan-y" }}
          >
            <div
              className={`flex ${
                isTestimonialDragging || !isTestimonialTransitionEnabled
                  ? "transition-none"
                  : "transition-transform duration-700 ease-out"
              }`}
              style={{
                transform: `translateX(calc(-${activeTestimonialIndex * 100}% + ${testimonialDragOffset}px))`,
              }}
              onTransitionEnd={handleTestimonialTransitionEnd}
            >
              {testimonialsLoop.map((testimonial, index) => (
                <article
                  key={`${testimonial.name}-${index}`}
                  className="flex min-h-[360px] w-full shrink-0 flex-col items-center justify-center px-6 py-8 text-center md:px-10"
                >
                  <div className="relative h-36 w-36 overflow-hidden rounded-full">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      sizes="144px"
                      className="object-cover"
                      draggable={false}
                    />
                  </div>

                  <h3 className="mt-5 text-2xl font-bold text-white [font-family:var(--font-display)]">
                    {testimonial.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium uppercase tracking-[1px] text-white/75">
                    {testimonial.role}{" "}
                    <a
                      href={testimonial.organizationUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-white underline decoration-white/40 underline-offset-4 transition-colors hover:text-[#FF1E27]"
                    >
                      {testimonial.organization}
                    </a>
                  </p>

                  <div
                    className="mt-5 flex items-center gap-1"
                    aria-label={`${testimonial.rating} ${copy.ratingLabel}`}
                  >
                    {Array.from({ length: 5 }).map((_, index) => {
                      const starValue = index + 1;
                      const isFullStar = testimonial.rating >= starValue;
                      const isHalfStar = !isFullStar && testimonial.rating >= starValue - 0.5;

                      if (isHalfStar) {
                        return (
                          <span
                            key={`${testimonial.name}-${index}`}
                            className="relative inline-block h-5 w-5"
                            aria-hidden="true"
                          >
                            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-[#8A8A8A]">
                              <path d="M12 2.3l2.83 5.73 6.32.92-4.58 4.46 1.08 6.3L12 16.76l-5.65 2.97 1.08-6.3-4.58-4.46 6.32-.92L12 2.3z" />
                            </svg>
                            <span className="absolute inset-y-0 left-0 w-1/2 overflow-hidden">
                              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-[#FF1E27]">
                                <path d="M12 2.3l2.83 5.73 6.32.92-4.58 4.46 1.08 6.3L12 16.76l-5.65 2.97 1.08-6.3-4.58-4.46 6.32-.92L12 2.3z" />
                              </svg>
                            </span>
                          </span>
                        );
                      }

                      return (
                        <svg
                          key={`${testimonial.name}-${index}`}
                          viewBox="0 0 24 24"
                          className={`h-5 w-5 ${isFullStar ? "fill-[#FF1E27]" : "fill-[#8A8A8A]"}`}
                          aria-hidden="true"
                        >
                          <path d="M12 2.3l2.83 5.73 6.32.92-4.58 4.46 1.08 6.3L12 16.76l-5.65 2.97 1.08-6.3-4.58-4.46 6.32-.92L12 2.3z" />
                        </svg>
                      );
                    })}
                  </div>

                  {testimonial.quote ? (
                    <p className="mt-5 text-base leading-7 text-white/90">"{testimonial.quote}"</p>
                  ) : null}
                </article>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2" aria-label="Navigation témoignages">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.name}
                type="button"
                onClick={() => {
                  setIsTestimonialTransitionEnabled(true);
                  setActiveTestimonialIndex(index + 1);
                  restartAutoplayRef.current();
                }}
                aria-label={`Afficher le témoignage ${index + 1}`}
                aria-current={index === displayedTestimonialIndex}
                className={`rounded-full transition-all ${
                  index === displayedTestimonialIndex
                    ? "h-4 w-4 bg-[#FF1E27] shadow-[0_0_0_3px_rgba(255,30,39,0.18)]"
                    : "h-2.5 w-2.5 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
