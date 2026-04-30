"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSitePreferences } from "../context/SitePreferencesContext";

const slidesByLocale = {
  fr: [
    {
      image: "/images/slider_page_1.jpg",
      title: "Expertise et réalisations",
      ctaLabel: "Voir mes projets",
      ctaHref: "/projets",
    },
    {
      image: "/images/slider_page_2.jpg",
      title: "Activitées transversales et loisirs",
      ctaLabel: "Voir mes activités",
      ctaHref: "/activites",
    },
    {
      image: "/images/slider_page_3.jpg",
      title: "Découvrez mes services",
      ctaLabel: "Voir mes services",
      ctaHref: "/services",
    },
  ],
  en: [
    {
      image: "/images/slider_page_1.jpg",
      title: "Expertise and achievements",
      ctaLabel: "View my projects",
      ctaHref: "/projets",
    },
    {
      image: "/images/slider_page_2.jpg",
      title: "Cross-functional activities and hobbies",
      ctaLabel: "View my activities",
      ctaHref: "/activites",
    },
    {
      image: "/images/slider_page_3.jpg",
      title: "Discover my services",
      ctaLabel: "View my services",
      ctaHref: "/services",
    },
  ],
} as const;

type Locale = keyof typeof slidesByLocale;

export default function HomeSlider() {
  const { locale } = useSitePreferences();

  const slides = slidesByLocale[locale as Locale];

  const slidesLoop = [
    slides[slides.length - 1],
    ...slides,
    slides[0],
  ];

  const firstLoopIndex = 0;
  const lastLoopIndex = slides.length + 1;

  const [currentSlide, setCurrentSlide] = useState(1);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);
  const dragStartXRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    isDraggingRef.current = isDragging;
  }, [isDragging]);

  useEffect(() => {
    const clearAutoplay = () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };

    const scheduleNext = () => {
      clearAutoplay();
      timeoutRef.current = window.setTimeout(() => {
        if (!isDraggingRef.current) {
          setIsTransitionEnabled(true);
          setCurrentSlide((prev) => Math.min(prev + 1, lastLoopIndex));
        }
        scheduleNext();
      }, 5000);
    };

    scheduleNext();

    return clearAutoplay;
  }, []);

  const restartAutoplay = () => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      if (!isDraggingRef.current) {
        setIsTransitionEnabled(true);
        setCurrentSlide((prev) => Math.min(prev + 1, lastLoopIndex));
      }
      restartAutoplay();
    }, 5000);
  };

  const handleTransitionEnd = () => {
    if (currentSlide !== firstLoopIndex && currentSlide !== lastLoopIndex) {
      return;
    }

    setIsTransitionEnabled(false);

    if (currentSlide === lastLoopIndex) {
      setCurrentSlide(1);
    } else {
      setCurrentSlide(slides.length);
    }

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setIsTransitionEnabled(true);
      });
    });
  };

  const goToPrevious = () => {
    setIsTransitionEnabled(true);
    setCurrentSlide((prev) => Math.max(prev - 1, firstLoopIndex));
    restartAutoplay();
  };

  const goToNext = () => {
    setIsTransitionEnabled(true);
    setCurrentSlide((prev) => Math.min(prev + 1, lastLoopIndex));
    restartAutoplay();
  };

  const finishDrag = (deltaX: number) => {
    const sliderWidth = sliderRef.current?.offsetWidth ?? 1;
    const threshold = Math.min(120, Math.max(50, sliderWidth * 0.12));

    if (deltaX > threshold) {
      goToPrevious();
    } else if (deltaX < -threshold) {
      goToNext();
    } else {
      restartAutoplay();
    }

    setDragOffset(0);
    setIsDragging(false);
    dragStartXRef.current = null;
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if ((event.target as HTMLElement).closest("a,button")) return;

    dragStartXRef.current = event.clientX;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || dragStartXRef.current === null) return;

    const rawOffset = event.clientX - dragStartXRef.current;
    const sliderWidth = sliderRef.current?.offsetWidth ?? 1;

    const clampedOffset = Math.max(
      -sliderWidth * 0.6,
      Math.min(sliderWidth * 0.6, rawOffset)
    );

    setDragOffset(clampedOffset);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartXRef.current === null) return;
    finishDrag(event.clientX - dragStartXRef.current);
  };

  const handlePointerCancel = () => {
    setDragOffset(0);
    setIsDragging(false);
    dragStartXRef.current = null;
  };

  return (
    <section className="w-full py-0">
      <div
        ref={sliderRef}
        className={`relative w-full overflow-hidden bg-black select-none ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        style={{ touchAction: "pan-y" }}
      >
        <div
          className={`flex ${
            isDragging || !isTransitionEnabled
              ? "transition-none"
              : "transition-transform duration-700 ease-out"
          }`}
          style={{
            transform: `translateX(calc(-${currentSlide * 100}% + ${dragOffset}px))`,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {slidesLoop.map((slide, index) => (
            <div
              key={`${slide.image}-${index}`}
              className="relative min-w-full"
              style={{ aspectRatio: "16/9", minHeight: "320px" }}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover object-center"
                priority={index === 0}
              />

              {/* Dégradé sombre à gauche */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent" />

              {/* Contenu — padding augmenté pour s'éloigner du bord */}
              <div className="absolute inset-0 flex items-center">
                <div className="px-16 sm:px-24 md:px-32 lg:px-40 max-w-2xl">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-lg">
                    {slide.title}
                  </h2>
                  <Link
                    href={slide.ctaHref}
                    className="mt-6 inline-block bg-[#FF1E27] px-8 py-4 text-white font-semibold text-base sm:text-lg tracking-wide hover:bg-[#cc1820] transition-colors duration-200"
                  >
                    {slide.ctaLabel}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bouton précédent — décalé du bord avec mx, fond blanc transparent, sans bordure */}
        <button
          onClick={goToPrevious}
          aria-label={locale === "fr" ? "Image précédente" : "Previous image"}
          className="
            absolute top-1/2 -translate-y-1/2
            left-3 sm:left-4
            h-14 w-10 sm:h-20 sm:w-14
            flex items-center justify-center
            bg-white/20 hover:bg-white/35
            text-white
            rounded-sm
            transition-all duration-200
            backdrop-blur-sm
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 sm:w-7 sm:h-7"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Bouton suivant — décalé du bord avec mx, fond blanc transparent, sans bordure */}
        <button
          onClick={goToNext}
          aria-label={locale === "fr" ? "Image suivante" : "Next image"}
          className="
            absolute top-1/2 -translate-y-1/2
            right-3 sm:right-4
            h-14 w-10 sm:h-20 sm:w-14
            flex items-center justify-center
            bg-white/20 hover:bg-white/35
            text-white
            rounded-sm
            transition-all duration-200
            backdrop-blur-sm
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 sm:w-7 sm:h-7"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </section>
  );
}