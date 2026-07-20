/* PUNCH · scroll choreography
   GSAP + ScrollTrigger + Lenis. Velocity marquee adapted from
   21st.dev "Scroll Velocity Text" (cnippet.dev), rewritten for vanilla GSAP. */

(function () {
  "use strict";

  var forceMotion = /[?&]motion=1/.test(location.search); // QA override
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches && !forceMotion;
  if (prefersReduced || typeof gsap === "undefined") {
    return; // base CSS is the fully static, everything-visible layout
  }
  document.documentElement.classList.add("motion");

  gsap.registerPlugin(ScrollTrigger);

  /* ---------- smooth scroll ---------- */
  var lenis = new Lenis({ lerp: 0.12 });
  window.__lenis = lenis;
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
  gsap.ticker.lagSmoothing(0);

  // Anchor links route through Lenis so pinned sections resolve correctly
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var target = document.querySelector(a.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -72 });
    });
  });

  /* ---------- nav: hide on scroll down, show on scroll up ---------- */
  var nav = document.querySelector(".nav");
  var navY = gsap.quickTo(nav, "yPercent", { duration: 0.35, ease: "power3.out" });
  ScrollTrigger.create({
    start: 120,
    end: "max",
    onUpdate: function (self) {
      navY(self.direction === 1 ? -110 : 0);
    }
  });

  /* ---------- hero intro (after loader curtain, ~1.15s) ---------- */
  var intro = gsap.timeline({ delay: 1.05, defaults: { ease: "expo.out" } });
  intro
    .to(".hero-title .line-inner", { y: 0, duration: 1, stagger: 0.09 })
    .to("[data-intro]", { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }, "-=0.6")
    .fromTo(".hero-can",
      { y: 90, rotate: 10, opacity: 0 },
      { y: 0, rotate: 0, opacity: 1, duration: 0.9, ease: "back.out(1.4)" }, "-=0.8")
    .fromTo(".sticker",
      { scale: 0.6, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, stagger: 0.08, ease: "back.out(2)" }, "-=0.45");

  /* hero background word: slow parallax drift */
  gsap.to(".hero-bgword", {
    yPercent: 24,
    ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
  });
  /* hero can: gentle counter-parallax so the hero feels layered */
  gsap.to(".hero-can", {
    y: -60,
    ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
  });

  /* ---------- velocity marquee ---------- */
  (function marquee() {
    var track = document.querySelector(".marquee-track");
    var block = track.querySelector(".marquee-block");
    if (!track || !block) return;

    function ensureCopies() {
      var bw = block.offsetWidth;
      if (!bw) return;
      var need = Math.max(3, Math.ceil(window.innerWidth / bw) + 2);
      while (track.children.length < need) {
        var clone = block.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        track.appendChild(clone);
      }
    }
    ensureCopies();
    window.addEventListener("resize", ensureCopies);

    var x = 0;
    var smoothVel = 0;
    var lastY = window.scrollY;
    var dir = 1;
    var BASE_SPEED = 110; // px/s

    gsap.ticker.add(function (time, deltaMS) {
      var dt = deltaMS / 1000;
      if (dt <= 0) return;
      var y = lenis.scroll !== undefined ? lenis.scroll : window.scrollY;
      var rawVel = (y - lastY) / dt; // px/s of page scroll
      lastY = y;
      smoothVel += (rawVel - smoothVel) * Math.min(1, dt * 6);

      var boost = gsap.utils.clamp(-4, 4, smoothVel / 900);
      if (Math.abs(boost) > 0.15) dir = boost >= 0 ? 1 : -1;

      x += dir * BASE_SPEED * (1 + Math.abs(boost)) * dt;
      var bw = block.offsetWidth || 1;
      var wrapped = ((x % bw) + bw) % bw;
      track.style.transform = "translateX(" + -wrapped + "px)";
    });
  })();

  /* ---------- flavors: pinned color-morph ---------- */
  (function flavors() {
    var section = document.querySelector(".flavors");
    var names = gsap.utils.toArray(".flavor-name");
    var canLabels = gsap.utils.toArray(".can-flavor-stack .can-flavor");
    var details = gsap.utils.toArray(".flavor-detail");
    var can = document.querySelector(".flavor-can");

    var palette = [
      { bg: "#FFBE0B", can: "#FFBE0B", deep: "#F59300" },
      { bg: "#FF4D8D", can: "#FF4D8D", deep: "#E62E75" },
      { bg: "#9BE015", can: "#9BE015", deep: "#7CC406" }
    ];

    // JS owns visibility from here (CSS .is-active handles the no-JS case)
    gsap.set(names, { opacity: function (i) { return i === 0 ? 1 : 0; }, y: function (i) { return i === 0 ? 0 : 60; } });
    gsap.set(details, { opacity: function (i) { return i === 0 ? 1 : 0; }, y: function (i) { return i === 0 ? 0 : 30; } });
    gsap.set(canLabels, { opacity: function (i) { return i === 0 ? 1 : 0; } });

    var tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=260%",
        pin: true,
        scrub: 1,
        anticipatePin: 1
      }
    });

    for (var i = 1; i < palette.length; i++) {
      var label = "flavor" + i;
      tl.addLabel(label, "+=0.55"); // rest on each flavor before switching
      tl.to(section, { backgroundColor: palette[i].bg, duration: 1 }, label);
      tl.to(can, { "--can": palette[i].can, "--can-deep": palette[i].deep, duration: 1 }, label);
      tl.to(names[i - 1], { opacity: 0, y: -60, rotate: -2, duration: 0.5 }, label);
      tl.fromTo(names[i], { opacity: 0, y: 60, rotate: 2 }, { opacity: 1, y: 0, rotate: 0, duration: 0.5 }, label + "+=0.35");
      tl.to(details[i - 1], { opacity: 0, y: -30, duration: 0.4 }, label);
      tl.fromTo(details[i], { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.4 }, label + "+=0.35");
      tl.to(canLabels[i - 1], { opacity: 0, duration: 0.3 }, label + "+=0.1");
      tl.to(canLabels[i], { opacity: 1, duration: 0.3 }, label + "+=0.4");
      // little can shake on every switch
      tl.fromTo(can, { rotate: 0 }, { rotate: 3, duration: 0.12, yoyo: true, repeat: 3 }, label + "+=0.2");
    }
    tl.to({}, { duration: 0.55 }); // rest on the last flavor
  })();

  /* ---------- why: reveals + count-ups ---------- */
  gsap.utils.toArray(".why-head, .reviews h2").forEach(function (el) {
    gsap.fromTo(el, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 0.9, ease: "expo.out",
      scrollTrigger: { trigger: el, start: "top 85%", once: true }
    });
  });

  ScrollTrigger.batch(".cell", {
    start: "top 88%",
    once: true,
    onEnter: function (batch) {
      gsap.fromTo(batch, { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "expo.out"
      });
    }
  });

  gsap.utils.toArray("[data-count]").forEach(function (el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      once: true,
      onEnter: function () {
        gsap.fromTo(el, { textContent: 0 }, {
          textContent: target,
          duration: 1.2,
          ease: "power2.out",
          snap: { textContent: 1 }
        });
      }
    });
  });

  /* ---------- ritual: horizontal pan ---------- */
  (function ritual() {
    var wrap = document.querySelector(".ritual");
    var track = document.querySelector(".ritual-track");
    if (!wrap || !track) return;

    var panTween = gsap.to(track, {
      x: function () { return -(track.scrollWidth - window.innerWidth); },
      ease: "none",
      scrollTrigger: {
        trigger: wrap,
        start: "top top",
        end: function () { return "+=" + (track.scrollWidth - window.innerWidth); },
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1
      }
    });

    // giant verbs pop as their panel slides in
    gsap.utils.toArray(".panel h3").forEach(function (h) {
      gsap.fromTo(h, { scale: 0.8, opacity: 0.3 }, {
        scale: 1, opacity: 1, ease: "power2.out",
        scrollTrigger: {
          trigger: h,
          containerAnimation: panTween,
          start: "left 75%",
          end: "left 25%",
          scrub: true
        }
      });
    });
  })();

  /* ---------- reviews: staggered settle ---------- */
  ScrollTrigger.batch(".review", {
    start: "top 85%",
    once: true,
    onEnter: function (batch) {
      gsap.fromTo(batch,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.85, stagger: 0.12, ease: "back.out(1.3)" });
    }
  });

  /* ---------- cta: scrub zoom ---------- */
  gsap.fromTo(".cta-word",
    { scale: 0.72, opacity: 0.35 },
    {
      scale: 1, opacity: 1, ease: "none",
      scrollTrigger: {
        trigger: ".cta",
        start: "top bottom",
        end: "center 60%",
        scrub: true
      }
    });

  window.addEventListener("load", function () { ScrollTrigger.refresh(); });
})();
