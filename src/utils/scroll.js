// Scroll to a section (or the top) through Lenis when it is active.
// The fixed-nav offset comes from `scroll-padding-top` on <html>, which both
// Lenis and native smooth scrolling respect — so no extra offset here.
export const scrollToId = (id) => {
  const target = id === 'top' ? 0 : document.getElementById(id)
  if (target === null) return
  if (window.__lenis) {
    window.__lenis.scrollTo(target, { force: true })
  } else if (target === 0) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// onClick handler for in-page anchors: keeps real hrefs (works without JS)
// while routing the scroll through Lenis. When `after` closes an overlay
// (the mobile menu pauses scrolling while open), close it first and scroll
// once scrolling has resumed.
export const handleAnchor = (id, after) => (e) => {
  e.preventDefault()
  if (id !== 'top') history.replaceState(null, '', `#${id}`)
  if (after) {
    after()
    setTimeout(() => scrollToId(id), 60)
  } else {
    scrollToId(id)
  }
}
