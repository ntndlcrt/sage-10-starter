import ImageReveal from '../utils/ImageReveal'

export default class UtilityManager {
  constructor() {
    this.activeUtils = []
    this.utils = [{ selector: '.media.--reveal', Class: ImageReveal }]
  }

  init() {
    this.destroyUtils()
    this.initUtils()
  }

  initUtils() {
    this.utils.forEach(({ selector, Class }) => {
      document.querySelectorAll(selector).forEach((element) => {
        this.activeUtils.push(new Class(element))
      })
    })
  }

  destroyUtils() {
    this.activeUtils.forEach((util) => util.destroy?.())
    this.activeUtils = []
  }
}
