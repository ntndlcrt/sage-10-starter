export default class Block {
  constructor(element) {
    this.element = element
    this.isInitialized = false
    this.eventListeners = new Map()
    this.observers = new Map()
    this.animations = new Map()
    this.init()
  }

  init() {
    if (this.isInitialized) return

    // Call child class functions if they exist
    this.setupAnimations?.()
    this.setupObservers?.()
    this.bindEvents?.()

    this.isInitialized = true
  }

  // Utility methods
  on(eventName, element, callback, options = {}) {
    const handler = callback.bind(this)
    element.addEventListener(eventName, handler, options)

    if (!this.eventListeners.has(element)) {
      this.eventListeners.set(element, [])
    }
    this.eventListeners.get(element).push({ eventName, handler, options })
  }

  observe(element, callback, options = {}) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => callback.call(this, entry))
    }, options)

    observer.observe(element)
    this.observers.set(element, observer)
  }

  createAnimation(name, element, props) {
    const animation = gsap.to(element, {
      paused: true,
      ...props,
    })
    this.animations.set(name, animation)
    return animation
  }

  destroy() {
    this.eventListeners.forEach((listeners, element) => {
      listeners.forEach(({ eventName, handler, options }) => {
        element.removeEventListener(eventName, handler, options)
      })
    })
    this.eventListeners.clear()

    this.observers.forEach((observer) => observer.disconnect())
    this.observers.clear()

    this.animations.forEach((animation) => animation.kill())
    this.animations.clear()

    this.isInitialized = false
  }

  query(selector) {
    return this.element.querySelector(selector)
  }

  queryAll(selector) {
    return this.element.querySelectorAll(selector)
  }
}
