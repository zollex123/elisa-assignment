"use strict";
const images = [
    { product: "assets/products/image-product-1.jpg", thumbnail: "assets/thumbnails/image-product-1-thumbnail.jpg" },
    { product: "assets/products/image-product-2.jpg", thumbnail: "assets/thumbnails/image-product-2-thumbnail.jpg" },
    { product: "assets/products/image-product-3.jpg", thumbnail: "assets/thumbnails/image-product-3-thumbnail.jpg" },
    { product: "assets/products/image-product-4.jpg", thumbnail: "assets/thumbnails/image-product-4-thumbnail.jpg" },
];
const totalImages = images.length;
// Gallery elements
const galleryImage = document.querySelector(".gallery__image");
const galleryThumbs = document.querySelectorAll(".gallery__thumb");
const galleryPrev = document.querySelector(".gallery__arrow--prev");
const galleryNext = document.querySelector(".gallery__arrow--next");
// Lightbox elements
const lightbox = document.querySelector(".lightbox");
const lightboxOverlay = document.querySelector(".lightbox__overlay");
const lightboxImage = document.querySelector(".lightbox__image");
const lightboxThumbs = document.querySelectorAll(".lightbox__thumb");
const lightboxPrev = document.querySelector(".lightbox__arrow--prev");
const lightboxNext = document.querySelector(".lightbox__arrow--next");
const lightboxClose = document.querySelector(".lightbox__close");
const galleryLiveRegion = document.querySelector(".gallery__live-region");
const lightboxLiveRegion = document.querySelector(".lightbox__live-region");
let galleryIndex = 0;
let lightboxIndex = 0;
let triggerElement = null;
function announce(region, index) {
    region.textContent = `Product image ${index + 1} of ${totalImages}`;
}
function isDesktop() {
    return window.matchMedia("(min-width: 768px)").matches;
}
// Update the gallery main image and active thumbnail
function setGalleryImage(index) {
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
function setLightboxImage(index) {
    lightboxIndex = index;
    lightboxImage.src = images[index].product;
    lightboxImage.alt = `Product image ${index + 1} of ${totalImages}`;
    lightboxThumbs.forEach((thumb, i) => {
        thumb.classList.toggle("lightbox__thumb--active", i === index);
        thumb.setAttribute("aria-current", i === index ? "true" : "false");
    });
    announce(lightboxLiveRegion, index);
}
function openLightbox() {
    if (!isDesktop())
        return;
    triggerElement = document.activeElement;
    lightboxIndex = galleryIndex;
    setLightboxImage(lightboxIndex);
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    lightboxClose.focus();
}
function closeLightbox() {
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
galleryImage.addEventListener("keydown", (e) => {
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
document.addEventListener("keydown", (e) => {
    if (!lightbox.hidden) {
        // Lightbox is open
        if (e.key === "Escape") {
            closeLightbox();
        }
        else if (e.key === "ArrowLeft") {
            e.preventDefault();
            setLightboxImage((lightboxIndex - 1 + totalImages) % totalImages);
        }
        else if (e.key === "ArrowRight") {
            e.preventDefault();
            setLightboxImage((lightboxIndex + 1) % totalImages);
        }
        else if (e.key === "Tab") {
            trapFocus(e);
        }
    }
    else {
        // Gallery keyboard nav
        if (e.key === "ArrowLeft") {
            const galleryMain = document.querySelector(".gallery__main");
            if (galleryMain?.contains(document.activeElement)) {
                e.preventDefault();
                setGalleryImage((galleryIndex - 1 + totalImages) % totalImages);
            }
        }
        else if (e.key === "ArrowRight") {
            const galleryMain = document.querySelector(".gallery__main");
            if (galleryMain?.contains(document.activeElement)) {
                e.preventDefault();
                setGalleryImage((galleryIndex + 1) % totalImages);
            }
        }
    }
});
// Focus trap for lightbox
function trapFocus(e) {
    const focusable = lightbox.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey) {
        if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
        }
    }
    else {
        if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    }
}
