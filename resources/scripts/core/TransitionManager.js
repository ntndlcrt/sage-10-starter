import FadeToBlack from '../transitions/FadeToBlack'
import Default from '../transitions/Default'

export class TransitionManager {
  constructor(app) {
    this.app = app
    this.transitions = [FadeToBlack, Default]
  }

  getTransitions() {
    return this.transitions.map((transition) => ({
      ...transition,
      enter: async (data) => {
        await transition.enter(data)
        this.app.blockManager.init()
        // this.app.utilityManager.init()
      },
    }))
  }
}
