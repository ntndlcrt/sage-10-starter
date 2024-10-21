import gsap from 'gsap'

export default {
  name: 'default',

  async leave(data) {
    const done = this.async()

    await gsap.to(data.current.container, {
      opacity: 0,
      duration: 0.4,
    })

    done()
  },

  enter(data) {
    gsap.from(data.next.container, {
      opacity: 0,
      duration: 0.4,
    })
  },
}
