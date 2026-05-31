(() => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (prefersReducedMotion || !supportsHover) {
    return;
  }

  const sparkleSettings = {
    colors: ["#60a5fa", "#93c5fd", "#ffffff", "#f8fafc"],
    maxSparkles: 32,
    minSize: 5,
    maxSize: 12,
    lifetime: 720,
    mouseMoveDelay: 22
  };

  let lastSparkleTime = 0;

  function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
  }

  function createSparkle(x, y, isBurst = false) {
    const sparkle = document.createElement("span");
    const size = randomBetween(sparkleSettings.minSize, sparkleSettings.maxSize);
    const driftX = randomBetween(-28, 28);
    const driftY = randomBetween(isBurst ? -42 : -24, isBurst ? 18 : 24);
    const rotate = randomBetween(-90, 90);
    const color = sparkleSettings.colors[Math.floor(Math.random() * sparkleSettings.colors.length)];

    sparkle.className = "cursor-sparkle";
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    sparkle.style.background = color;
    sparkle.style.setProperty("--sparkle-x", `${driftX}px`);
    sparkle.style.setProperty("--sparkle-y", `${driftY}px`);
    sparkle.style.setProperty("--sparkle-rotate", `${rotate}deg`);

    document.body.appendChild(sparkle);

    window.setTimeout(() => {
      sparkle.remove();
    }, sparkleSettings.lifetime);
  }

  function trimSparkles() {
    const sparkles = document.querySelectorAll(".cursor-sparkle");

    if (sparkles.length <= sparkleSettings.maxSparkles) {
      return;
    }

    Array.from(sparkles)
      .slice(0, sparkles.length - sparkleSettings.maxSparkles)
      .forEach((sparkle) => sparkle.remove());
  }

  window.addEventListener("mousemove", (event) => {
    const now = performance.now();

    if (now - lastSparkleTime < sparkleSettings.mouseMoveDelay) {
      return;
    }

    lastSparkleTime = now;
    createSparkle(event.clientX, event.clientY);
    trimSparkles();
  });

  window.addEventListener("click", (event) => {
    for (let index = 0; index < 8; index += 1) {
      createSparkle(event.clientX, event.clientY, true);
    }

    trimSparkles();
  });
})();
