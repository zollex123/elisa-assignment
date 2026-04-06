const images = [
  { product: "assets/products/image-product-1.jpg", thumbnail: "assets/thumbnails/image-product-1-thumbnail.jpg" },
  { product: "assets/products/image-product-2.jpg", thumbnail: "assets/thumbnails/image-product-2-thumbnail.jpg" },
  { product: "assets/products/image-product-3.jpg", thumbnail: "assets/thumbnails/image-product-3-thumbnail.jpg" },
  { product: "assets/products/image-product-4.jpg", thumbnail: "assets/thumbnails/image-product-4-thumbnail.jpg" },
];

const totalImages = images.length;

// Gallery elements
const galleryImage = document.querySelector(".gallery__image") as HTMLImageElement;
const galleryThumbs = document.querySelectorAll(".gallery__thumb");
const galleryPrev = document.querySelector(".gallery__arrow--prev") as HTMLButtonElement;
const galleryNext = document.querySelector(".gallery__arrow--next") as HTMLButtonElement;

// Lightbox elements
const lightbox = document.querySelector(".lightbox") as HTMLElement;
const lightboxOverlay = document.querySelector(".lightbox__overlay") as HTMLElement;
const lightboxImage = document.querySelector(".lightbox__image") as HTMLImageElement;
const lightboxThumbs = document.querySelectorAll(".lightbox__thumb");
const lightboxPrev = document.querySelector(".lightbox__arrow--prev") as HTMLButtonElement;
const lightboxNext = document.querySelector(".lightbox__arrow--next") as HTMLButtonElement;
const lightboxClose = document.querySelector(".lightbox__close") as HTMLButtonElement;

const galleryLiveRegion = document.querySelector(".gallery__live-region") as HTMLElement;
const lightboxLiveRegion = document.querySelector(".lightbox__live-region") as HTMLElement;

let galleryIndex = 0;
let lightboxIndex = 0;
let triggerElement: HTMLElement | null = null;

function announce(region: HTMLElement, index: number): void {
  region.textContent = `Product image ${index + 1} of ${totalImages}`;
}

function isDesktop(): boolean {
  return window.matchMedia("(min-width: 768px)").matches;
}

// Update the gallery main image and active thumbnail
function setGalleryImage(index: number): void {
  galleryIndex = index;
  galleryImage.src = images[index].product;
  galleryImage.alt = `Product image ${index + 1} of ${totalImages}`;

  galleryThumbs.forEach((thumb, i) => {
    thumb.classList.toggle("gallery__thumb--active", i === index);
    thumb.setAttribute("aria-current", i === index ? "true" : "false");
  });
  announce(galleryLiveRegion, index);
}

// Update the lightbox image and active thumbnail
function setLightboxImage(index: number): void {
  lightboxIndex = index;
  lightboxImage.src = images[index].product;
  lightboxImage.alt = `Product image ${index + 1} of ${totalImages}`;

  lightboxThumbs.forEach((thumb, i) => {
    thumb.classList.toggle("lightbox__thumb--active", i === index);
    thumb.setAttribute("aria-current", i === index ? "true" : "false");
  });
  announce(lightboxLiveRegion, index);
}

function openLightbox(): void {
  if (!isDesktop()) return;
  triggerElement = document.activeElement as HTMLElement;
  lightboxIndex = galleryIndex;
  setLightboxImage(lightboxIndex);
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  lightboxClose.focus();
}

function closeLightbox(): void {
  lightbox.hidden = true;
  document.body.style.overflow = "";
  triggerElement?.focus();
}

// Gallery arrows
galleryPrev.addEventListener("click", () => {
  setGalleryImage((galleryIndex - 1 + totalImages) % totalImages);
});

galleryNext.addEventListener("click", () => {
  setGalleryImage((galleryIndex + 1) % totalImages);
});

// Gallery thumbnails
galleryThumbs.forEach((thumb, i) => {
  thumb.addEventListener("click", () => setGalleryImage(i));
});

// Gallery image click -> open lightbox
galleryImage.addEventListener("click", openLightbox);
galleryImage.addEventListener("keydown", (e: KeyboardEvent) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    openLightbox();
  }
});

// Lightbox arrows
lightboxPrev.addEventListener("click", () => {
  setLightboxImage((lightboxIndex - 1 + totalImages) % totalImages);
});

lightboxNext.addEventListener("click", () => {
  setLightboxImage((lightboxIndex + 1) % totalImages);
});

// Lightbox thumbnails
lightboxThumbs.forEach((thumb, i) => {
  thumb.addEventListener("click", () => setLightboxImage(i));
});

// Close lightbox
lightboxClose.addEventListener("click", closeLightbox);
lightboxOverlay.addEventListener("click", closeLightbox);

// Keyboard handling
document.addEventListener("keydown", (e: KeyboardEvent) => {
  if (!lightbox.hidden) {
    // Lightbox is open
    if (e.key === "Escape") {
      closeLightbox();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setLightboxImage((lightboxIndex - 1 + totalImages) % totalImages);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setLightboxImage((lightboxIndex + 1) % totalImages);
    } else if (e.key === "Tab") {
      trapFocus(e);
    }
  } else {
    // Gallery keyboard nav
    if (e.key === "ArrowLeft") {
      const galleryMain = document.querySelector(".gallery__main");
      if (galleryMain?.contains(document.activeElement)) {
        e.preventDefault();
        setGalleryImage((galleryIndex - 1 + totalImages) % totalImages);
      }
    } else if (e.key === "ArrowRight") {
      const galleryMain = document.querySelector(".gallery__main");
      if (galleryMain?.contains(document.activeElement)) {
        e.preventDefault();
        setGalleryImage((galleryIndex + 1) % totalImages);
      }
    }
  }
});

// Swipe support for mobile
function addSwipe(el: HTMLElement, onPrev: () => void, onNext: () => void): void {
  let startX = 0;
  const THRESHOLD = 50;

  el.addEventListener("touchstart", (e: TouchEvent) => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  el.addEventListener("touchend", (e: TouchEvent) => {
    const delta = e.changedTouches[0].clientX - startX;
    if (Math.abs(delta) < THRESHOLD) return;
    if (delta > 0) onPrev();
    else onNext();
  }, { passive: true });
}

const galleryMain = document.querySelector(".gallery__main") as HTMLElement;
addSwipe(
  galleryMain,
  () => setGalleryImage((galleryIndex - 1 + totalImages) % totalImages),
  () => setGalleryImage((galleryIndex + 1) % totalImages)
);

// Focus trap for lightbox
function trapFocus(e: KeyboardEvent): void {
  const focusable = lightbox.querySelectorAll<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (e.shiftKey) {
    if (document.activeElement === first) {
      e.preventDefault();
      last.focus();
    }
  } else {
    if (document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
}
