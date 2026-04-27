"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const slides = [
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
];

const slidesLoop = [slides[slides.length - 1], ...slides, slides[0]];
const firstLoopIndex = 0;
const lastLoopIndex = slides.length + 1;

export default function HomeSlider() {
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
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    if ((event.target as HTMLElement).closest("a,button")) {
      return;
    }

    dragStartXRef.current = event.clientX;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || dragStartXRef.current === null) {
      return;
    }

    const rawOffset = event.clientX - dragStartXRef.current;
    const sliderWidth = sliderRef.current?.offsetWidth ?? 1;
    const clampedOffset = Math.max(-sliderWidth * 0.6, Math.min(sliderWidth * 0.6, rawOffset));
    setDragOffset(clampedOffset);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartXRef.current === null) {
      return;
    }

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
        className={`home-slider-frame relative w-full overflow-hidden border border-zinc-900/10 bg-black shadow-[0_24px_80px_rgba(0,0,0,0.28)] select-none ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        onDragStart={(event) => event.preventDefault()}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        style={{ touchAction: "pan-y" }}
      >
        <div
          className={`flex ${isDragging || !isTransitionEnabled ? "transition-none" : "transition-transform duration-700 ease-out"}`}
          style={{ transform: `translateX(calc(-${currentSlide * 100}% + ${dragOffset}px))` }}
          onTransitionEnd={handleTransitionEnd}
        >
          {slidesLoop.map((slide, index) => (
            <div
              key={`${slide.image}-${index}`}
              className="relative min-w-full aspect-[16/9] max-md:aspect-[9/14]"
            >
              <Image
                src={slide.image}
                alt={`Slide ${index + 1}`}
                fill
                sizes="100vw"
                className="object-cover"
                priority={index === 0}
              />

              <div className="pointer-events-none absolute inset-0 bg-black/25" />

              <div className="absolute inset-0 z-10 flex items-center justify-center px-5 sm:px-8">
                <div className="w-full max-w-3xl text-center md:translate-x-6 md:text-left">
                  <h2 className="text-3xl font-bold uppercase leading-tight text-white [font-family:var(--font-display)] sm:text-4xl md:text-5xl">
                    {slide.title}
                  </h2>
                  <Link
                    href={slide.ctaHref}
                    className="mt-6 inline-flex items-center bg-[#FF1E27] px-6 py-3 text-sm font-semibold uppercase tracking-[1.1px] text-white transition-colors hover:bg-[#e51620] sm:text-base"
                  >
                    {slide.ctaLabel}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={goToPrevious}
          aria-label="Image precedente"
          className="absolute left-3 top-1/2 grid h-12 w-9 -translate-y-1/2 place-items-center bg-zinc-500/35 text-xl font-semibold text-white backdrop-blur-sm transition hover:bg-zinc-500/55 sm:left-4"
        >
          {"<"}
        </button>

        <button
          type="button"
          onClick={goToNext}
          aria-label="Image suivante"
          className="absolute right-3 top-1/2 grid h-12 w-9 -translate-y-1/2 place-items-center bg-zinc-500/35 text-xl font-semibold text-white backdrop-blur-sm transition hover:bg-zinc-500/55 sm:right-4"
        >
          {">"}
        </button>
      </div>
    </section>
  );
}
