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
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: '#000',
      zIndex: 100,
      opacity: 0,
    })

    document.body.appendChild(overlay)

    // Hide old content when overlay is black
    await gsap.to(overlay, {
      opacity: 1,
      duration: 0.6,
      onComplete: () => {
        gsap.set(data.current.container, { display: 'none' })
        done()
      },
    })
  },

  enter(data) {
    const overlay = document.querySelector('.transition-overlay')

    // Make sure new content is visible before starting fade out
    gsap.set(data.next.container, { opacity: 1 })

    return gsap.to(overlay, {
      opacity: 0,
      duration: 0.6,
      onComplete: () => overlay.remove(),
    })
  },
}
