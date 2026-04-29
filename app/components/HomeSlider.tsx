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
              className="relative min-w-full aspect-[16/9]"
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
              />

              <div className="absolute inset-0 bg-black/25" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <h2 className="text-4xl font-bold">{slide.title}</h2>
                  <Link
                    href={slide.ctaHref}
                    className="mt-6 inline-block bg-[#FF1E27] px-6 py-3 text-white"
                  >
                    {slide.ctaLabel}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={goToPrevious}
          aria-label={locale === "fr" ? "Image precedente" : "Previous image"}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-white"
        >
          {"<"}
        </button>

        <button
          onClick={goToNext}
          aria-label={locale === "fr" ? "Image suivante" : "Next image"}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white"
        >
          {">"}
        </button>
      </div>
    </section>
  );
}