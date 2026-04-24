"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const slides = [
  { src: "/images/slider_page_1.jpg" },
  { src: "/images/slider_page_2.jpg" },
  { src: "/images/slider_page_3.jpg" },
];

const loopedSlides = [slides[slides.length - 1], ...slides, slides[0]];
const firstLoopIndex = 0;
const lastLoopIndex = slides.length + 1;

export default function HomeSlider() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number | null>(null);
  const sliderTimeoutRef = useRef<number | null>(null);
  const restartAutoplayRef = useRef<() => void>(() => {});
  const isDraggingRef = useRef(false);

  useEffect(() => {
    isDraggingRef.current = isDragging;
  }, [isDragging]);

  useEffect(() => {
    const clearAutoplay = () => {
      if (sliderTimeoutRef.current !== null) {
        window.clearTimeout(sliderTimeoutRef.current);
      }
    };

    const scheduleNext = () => {
      clearAutoplay();
      sliderTimeoutRef.current = window.setTimeout(() => {
        if (!isDraggingRef.current) {
          setIsTransitionEnabled(true);
          setCurrentSlide((prev) => Math.min(prev + 1, lastLoopIndex));
        }
        scheduleNext();
      }, 5000);
    };

    restartAutoplayRef.current = scheduleNext;
    scheduleNext();

    return clearAutoplay;
  }, []);

  const goToPrevious = () => {
    setIsTransitionEnabled(true);
    setCurrentSlide((prev) => Math.max(prev - 1, firstLoopIndex));
    restartAutoplayRef.current();
  };

  const goToNext = () => {
    setIsTransitionEnabled(true);
    setCurrentSlide((prev) => Math.min(prev + 1, lastLoopIndex));
    restartAutoplayRef.current();
  };

  const handleSlideTransitionEnd = () => {
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

  const finishDrag = (deltaX: number) => {
    const sliderWidth = sliderRef.current?.offsetWidth ?? 1;
    const threshold = Math.min(120, Math.max(50, sliderWidth * 0.12));

    if (deltaX > threshold) {
      goToPrevious();
    } else if (deltaX < -threshold) {
      goToNext();
    }

    setDragOffset(0);
    setIsDragging(false);
    dragStartX.current = null;
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    if ((event.target as HTMLElement).closest("button")) {
      return;
    }

    dragStartX.current = event.clientX;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || dragStartX.current === null) {
      return;
    }

    const rawOffset = event.clientX - dragStartX.current;
    const sliderWidth = sliderRef.current?.offsetWidth ?? 1;
    const clampedOffset = Math.max(-sliderWidth * 0.6, Math.min(sliderWidth * 0.6, rawOffset));

    setDragOffset(clampedOffset);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) {
      return;
    }

    finishDrag(event.clientX - dragStartX.current);
  };

  const handlePointerCancel = () => {
    setDragOffset(0);
    setIsDragging(false);
    dragStartX.current = null;
  };

  return (
    <section className="w-full pt-6 pb-0">
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
          className={`flex ${
            isDragging || !isTransitionEnabled
              ? "transition-none"
              : "transition-transform duration-700 ease-in-out"
          }`}
          style={{ transform: `translateX(calc(-${currentSlide * 100}% + ${dragOffset}px))` }}
          onTransitionEnd={handleSlideTransitionEnd}
        >
          {loopedSlides.map((slide, index) => (
            <div
              key={`${slide.src}-${index}`}
              className="relative min-w-full aspect-[16/9] max-md:aspect-[9/14]"
            >
              <div className="absolute inset-0">
                <Image
                  src={slide.src}
                  alt={`Slide ${((index - 1 + slides.length) % slides.length) + 1}`}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority={index === 1}
                  draggable={false}
                />
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={goToPrevious}
          onPointerDown={(event) => event.stopPropagation()}
          aria-label="Image precedente"
          className="absolute left-3 top-1/2 grid h-12 w-9 -translate-y-1/2 place-items-center bg-zinc-500/35 text-xl font-semibold text-white backdrop-blur-sm transition hover:bg-zinc-500/55 sm:left-4"
        >
          {"<"}
        </button>

        <button
          type="button"
          onClick={goToNext}
          onPointerDown={(event) => event.stopPropagation()}
          aria-label="Image suivante"
          className="absolute right-3 top-1/2 grid h-12 w-9 -translate-y-1/2 place-items-center bg-zinc-500/35 text-xl font-semibold text-white backdrop-blur-sm transition hover:bg-zinc-500/55 sm:right-4"
        >
          {">"}
        </button>
      </div>
    </section>
  );
}
