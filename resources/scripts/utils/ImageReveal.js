import gsap from 'gsap'

export default class ImageReveal {
  constructor(element) {
    this.element = element
    this.inner = this.element.querySelector('.media__inner')
    this.media =
      this.element.querySelector('img') || this.element.querySelector('video')
    this.init()
  }

  init() {
    gsap.set(this.inner, {
      clipPath: 'inset(0 0 100% 0)',
    })

    gsap.set(this.media, {
      scale: 1.2,
    })

    const tl = gsap.timeline({
      defaults: {
        duration: 1.2,
        ease: 'power3.out',
      },
      scrollTrigger: {
        trigger: this.element,
        start: 'top center',
      },
    })

    tl.to(this.inner, {
      clipPath: 'inset(0 0 0% 0)',
    }).to(
      this.media,
      {
        scale: 1,
      },
      '<'
    )
  }
}
