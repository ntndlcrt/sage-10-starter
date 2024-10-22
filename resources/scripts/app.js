import domReady from '@roots/sage/client/dom-ready'
import BlockManager from './core/BlockManager'
import UtilityManager from './core/UtilityManager'
import TransitionManager from './core/TransitionManager'
import initBarba from './libs/Barba'
import initGSAP from './libs/GSAP'
import initLenis from './libs/Lenis'
import initCursor from './libs/Cursor'

class App {
  constructor() {
    this.blockManager = new BlockManager()
    this.utilityManager = new UtilityManager()
    this.transitionManager = new TransitionManager(this)

    this.instances = {
      gsap: null,
      lenis: null,
      cursor: null,
    }
  }

  async init() {
    this.instances.gsap = initGSAP()
    await initBarba(this.transitionManager)
    this.instances.lenis = initLenis()
    this.instances.cursor = initCursor()

    this.blockManager.init()
    this.utilityManager.init()
  }
}

domReady(async () => {
  const app = new App()
  await app.init()
})

if (import.meta.webpackHot) import.meta.webpackHot.accept(console.error)
