
export default function smoothScrollToBottomPage () {
    const galleryRect = refs.galleryEl.getBoundingClientRect();
    window.scrollBy({
        top: galleryRect.height,
        behavior: "smooth",
    })
}
