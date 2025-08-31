document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".main-header");
  const headerLogo = document.querySelector(".header-logo");
  const heroSection = document.getElementById("hero");
  const heroLogoContainer = document.querySelector(".hero-logo-container");
  const heroLogoImg = document.querySelector(".hero-logo-img");
  const progressDotsSidebar = document.querySelectorAll(
    ".progress-dots-sidebar .dot"
  );
  const headerNavLinks = document.querySelectorAll(".header-nav-links a");
  const sections = document.querySelectorAll("section[id]");

  // Animación del Logo y Visibilidad del Header
  const handleHeaderAndLogoAnimation = () => {
    const heroRect = heroSection.getBoundingClientRect();
    const headerRect = header.getBoundingClientRect();
    const headerHeight = header.offsetHeight;
    const activationPoint = heroRect.bottom - headerHeight;

    if (window.scrollY > activationPoint) {
      headerLogo.classList.add("scrolled");
      if (heroLogoContainer && heroLogoImg) {
        const heroLogoRect = heroLogoImg.getBoundingClientRect();
        const headerLogoRect = headerLogo.getBoundingClientRect();
        const startX = heroLogoRect.left + heroLogoRect.width / 2;
        const startY = heroLogoRect.top + heroLogoRect.height / 2;
        const endX = headerLogoRect.left + headerLogoRect.width / 2;
        const endY = headerLogoRect.top + headerLogoRect.height / 2;
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        const scale = (headerLogoRect.height * 0.8) / heroLogoRect.height;
        heroLogoContainer.classList.add("moving");
        heroLogoContainer.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${scale}) rotate(-10deg)`;
        heroLogoContainer.style.filter =
          "blur(2px) grayscale(0.5) brightness(1.2)";
      }
    } else {
      headerLogo.classList.remove("scrolled");
      if (heroLogoContainer) {
        heroLogoContainer.classList.remove("moving");
        heroLogoContainer.style.transform =
          "translate(0, 0) scale(1) rotate(0)";
        heroLogoContainer.style.opacity = "1";
        heroLogoContainer.style.pointerEvents = "auto";
        heroLogoContainer.style.filter = "none";
      }
    }
  };

  // Barra de Progreso Lateral y Navegación en Header
  const updateActiveDotAndNav = () => {
    let currentActiveId = null;
    const viewportCenter = window.scrollY + window.innerHeight / 2;
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      if (viewportCenter >= sectionTop && viewportCenter < sectionBottom) {
        currentActiveId = section.id;
      }
    });
    progressDotsSidebar.forEach((dot) => {
      if (dot.dataset.section === currentActiveId) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
    headerNavLinks.forEach((link) => {
      const href = link.getAttribute("href").replace("#", "");
      if (href === currentActiveId) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  };

  // Scroll Suave al Hacer Clic en los Links y Puntos
  const setupSmoothScroll = (elements) => {
    elements.forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = el.getAttribute("href")
          ? el.getAttribute("href").replace("#", "")
          : el.dataset.section;
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          const offsetTop = targetSection.offsetTop - header.offsetHeight + 1;
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      });
    });
  };

  setupSmoothScroll(Array.from(progressDotsSidebar));
  setupSmoothScroll(Array.from(headerNavLinks));

  window.addEventListener("scroll", () => {
    handleHeaderAndLogoAnimation();
    updateActiveDotAndNav();
  });

  handleHeaderAndLogoAnimation();
  updateActiveDotAndNav();
});
