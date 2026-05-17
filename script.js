const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const revealItems = document.querySelectorAll(".reveal");
const skillItems = document.querySelectorAll(".skill");
const tiltTarget = document.querySelector("[data-tilt]");
const editableSelector = "input, textarea, [contenteditable='true']";

if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
        const isOpen = navToggle.getAttribute("aria-expanded") === "true";
        navToggle.setAttribute("aria-expanded", String(!isOpen));
        navMenu.classList.toggle("is-open", !isOpen);
        document.body.classList.toggle("menu-open", !isOpen);
    });

    navMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navToggle.setAttribute("aria-expanded", "false");
            navMenu.classList.remove("is-open");
            document.body.classList.remove("menu-open");
        });
    });
}

skillItems.forEach((skill) => {
    const value = skill.dataset.value || "0";
    skill.style.setProperty("--value", `${value}%`);
});

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            if (entry.target.classList.contains("skills-panel") || entry.target.classList.contains("compact-skills")) {
                skillItems.forEach((skill) => skill.classList.add("is-visible"));
            }
            observer.unobserve(entry.target);
        });
    },
    { threshold: 0.18 }
);

revealItems.forEach((item) => observer.observe(item));

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
        const target = document.querySelector(anchor.getAttribute("href"));
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});

if (tiltTarget && window.matchMedia("(pointer: fine)").matches) {
    tiltTarget.addEventListener("mousemove", (event) => {
        const rect = tiltTarget.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        tiltTarget.style.transform = `rotateX(${y * -7}deg) rotateY(${x * 8}deg)`;
    });

    tiltTarget.addEventListener("mouseleave", () => {
        tiltTarget.style.transform = "";
    });
}

document.addEventListener("contextmenu", (event) => {
    if (!event.target.closest(editableSelector)) event.preventDefault();
});

document.addEventListener("dragstart", (event) => {
    event.preventDefault();
});

document.addEventListener("selectstart", (event) => {
    if (!event.target.closest(editableSelector)) event.preventDefault();
});

document.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();
    const blockedCombo =
        key === "f12" ||
        (event.ctrlKey && key === "u") ||
        (event.ctrlKey && key === "s") ||
        (event.ctrlKey && key === "p") ||
        (event.ctrlKey && event.shiftKey && ["i", "j", "c"].includes(key));

    if (blockedCombo && !event.target.closest(editableSelector)) {
        event.preventDefault();
        event.stopPropagation();
    }
});
