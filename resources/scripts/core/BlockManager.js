import Testimonial from '../blocks/Testimonial'

export default class BlockManager {
  constructor() {
    this.activeBlocks = new Map()
    this.blockList = [{ selector: '.b-testimonial', Class: Testimonial }]
  }

  init() {
    this.destroyBlocks()
    this.initBlocks()
  }

  initBlocks() {
    this.blockList.forEach(({ selector, Class }) => {
      document.querySelectorAll(selector).forEach((element) => {
        // Use dataset or ID as unique identifier
        const id = element.dataset.blockId || element.id || crypto.randomUUID()
        const instance = new Class(element)
        this.activeBlocks.set(id, instance)
      })
    })
  }

  destroyBlocks() {
    this.activeBlocks.forEach((block) => {
      if (typeof block.destroy === 'function') {
        block.destroy()
      }
    })
    this.activeBlocks.clear()
  }

  addBlock(selector, BlockClass) {
    this.blockList.push({ selector, Class: BlockClass })
  }

  getBlock(id) {
    return this.activeBlocks.get(id)
  }
}
