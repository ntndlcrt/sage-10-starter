import domReady from '@roots/sage/client/dom-ready'
import barba from '@barba/core'
import BlockManager from './core/BlockManager'
import UtilityManager from './core/UtilityManager'
import TransitionManager from './core/TransitionManager'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

/**
 * @see {@link https://webpack.js.org/api/hot-module-replacement/}
 */
if (import.meta.webpackHot) import.meta.webpackHot.accept(console.error)

class App {
  constructor() {
    this.blockManager = new BlockManager()
    this.utilityManager = new UtilityManager()
    this.transitionManager = new TransitionManager(this)
  }

  async init() {
    await this.initBarba()
    this.initGSAP()
    this.initLenis()
    this.blockManager.init()
    this.utilityManager.init()
  }

  async initBarba() {
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

    barba.init({
      preventRunning: true,
      transitions: this.transitionManager.getTransitions(),
    })
  }

  initGSAP() {
    gsap.registerPlugin(ScrollTrigger)
  }

  initLenis() {
    const lenis = new Lenis({
      // duration: 1.2,
      // easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      // orientation: 'vertical',
      // gestureOrientation: 'vertical',
      // smoothWheel: true,
      // wheelMultiplier: 1,
      // smoothTouch: false, // Touch smooth scroll can feel odd on mobile
      // touchMultiplier: 2,
      // infinite: false,
      // // Improved settings for smoother feel
      // lerp: 0.1, // Lower = smoother
      // normalizeWheel: true,
      // syncTouch: true,
      // syncTouchLerp: 0.075,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }
}

/**
 * Application entrypoint
 */

domReady(async () => {
  const app = new App()
  await app.init()
})

if (import.meta.webpackHot) import.meta.webpackHot.accept(console.error)
