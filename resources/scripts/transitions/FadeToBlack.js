// transitions/FadeToBlack.js
import gsap from 'gsap'

export default {
  name: 'fade-to-black',
  custom: ({ trigger }) =>
    trigger?.getAttribute('data-transition') === 'fade-to-black',

  leave: () => {
    const overlay = document.createElement('div')
    overlay.classList.add('transition-overlay')
    Object.assign(overlay.style, {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: '#000',
      zIndex: 100,
      opacity: 0,
    })

    document.body.appendChild(overlay)

    return gsap.to(overlay, {
      opacity: 1,
      duration: 0.6,
    })
  },

  enter: () => {
    const overlay = document.querySelector('.transition-overlay')
    return gsap.to(overlay, {
      opacity: 0,
      duration: 0.6,
      onComplete: () => overlay.remove(),
    })
  },
}
