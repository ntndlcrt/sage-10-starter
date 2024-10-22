import gsap from 'gsap'

export default {
  name: 'fade-to-black',
  custom: ({ trigger }) =>
    trigger?.getAttribute('data-transition') === 'fade-to-black',

  async leave(data) {
    const done = this.async()

    const overlay = document.createElement('div')
    overlay.classList.add('transition-overlay')
    Object.assign(overlay.style, {
      position: 'fixed',
      inset: 0,
      backgroundColor: '#000',
      clipPath: 'inset(100% 0 0 0)',
      zIndex: 100,
    })

    document.body.appendChild(overlay)

    await gsap.to(overlay, {
      clipPath: 'inset(0% 0 0 0)',
      ease: 'power3.in',
      duration: 0.6,
    })

    done()
  },

  enter(data) {
    const overlay = document.querySelector('.transition-overlay')

    gsap.to(overlay, {
      clipPath: 'inset(0 0 100% 0)',
      ease: 'power3.in',
      delay: 1,
      duration: 0.6,
      onComplete: () => overlay.remove(),
    })
  },
}
