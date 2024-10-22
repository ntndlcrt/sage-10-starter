import barba from '@barba/core'

export default function initBarba(transitionManager) {
  document.querySelectorAll('a').forEach((link) => {
    const href = link.getAttribute('href')
    const target = link.getAttribute('target')

    if (
      href && // Has href
      !target && // No target attribute
      !link.hasAttribute('download') && // Not a download link
      href.indexOf('#') !== 0 && // Not an anchor link
      href.indexOf('tel:') !== 0 && // Not a telephone link
      href.indexOf('mailto:') !== 0 && // Not a mailto link
      href.indexOf(window.location.origin) !== -1 // Same origin
    ) {
      link.setAttribute('data-barba', 'link')
    }
  })

  return barba.init({
    preventRunning: true,
    transitions: transitionManager.getTransitions(),
  })
}
