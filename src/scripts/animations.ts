import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function animateHero() {
  const items = document.querySelectorAll<HTMLElement>("[data-hero-item]");
  if (!items.length) return;

  if (REDUCED_MOTION) {
    items.forEach((el) => el.classList.remove("reveal"));
    return;
  }

  gsap.set(items, { y: 26, opacity: 0 });
  gsap.to(items, {
    y: 0,
    opacity: 1,
    duration: 0.7,
    ease: "power3.out",
    stagger: 0.09,
    delay: 0.1,
    onStart: () => items.forEach((el) => el.classList.remove("reveal")),
  });
}

function animateReveals() {
  const groups = new Map<string, HTMLElement[]>();

  document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => {
    if (el.closest("[data-hero-item]") || el.hasAttribute("data-hero-item")) return;
    const key = el.dataset.revealGroup ?? el.dataset.id ?? Math.random().toString(36);
    const list = groups.get(key) ?? [];
    list.push(el);
    groups.set(key, list);
  });

  if (REDUCED_MOTION) {
    document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => el.classList.remove("reveal"));
    return;
  }

  groups.forEach((els) => {
    gsap.set(els, { y: 28, opacity: 0 });
    ScrollTrigger.create({
      trigger: els[0],
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(els, {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.08,
          onStart: () => els.forEach((el) => el.classList.remove("reveal")),
        });
      },
    });
  });
}

function animateCounters() {
  const counters = document.querySelectorAll<HTMLElement>("[data-counter-to]");

  counters.forEach((el) => {
    const to = parseInt(el.dataset.counterTo ?? "0", 10);
    const prefix = el.dataset.counterPrefix ?? "";
    const suffix = el.dataset.counterSuffix ?? "";

    if (REDUCED_MOTION) {
      el.textContent = `${prefix}${to}${suffix}`;
      return;
    }

    const obj = { val: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: () => {
        el.textContent = `${prefix}0${suffix}`;
        gsap.to(obj, {
          val: to,
          duration: 1.3,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = `${prefix}${Math.round(obj.val)}${suffix}`;
          },
        });
      },
    });
  });
}

function animateGalleryHover() {
  document.querySelectorAll<HTMLElement>("[data-hover-zoom] img").forEach((img) => {
    const wrapper = img.closest<HTMLElement>("[data-hover-zoom]");
    if (!wrapper) return;
    wrapper.addEventListener("mouseenter", () => {
      gsap.to(img, { scale: 1.05, duration: 0.5, ease: "power2.out" });
    });
    wrapper.addEventListener("mouseleave", () => {
      gsap.to(img, { scale: 1, duration: 0.5, ease: "power2.out" });
    });
  });
}

export function initRevealAnimations() {
  animateHero();
  animateReveals();
  animateCounters();
  animateGalleryHover();
}
