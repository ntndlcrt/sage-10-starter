import Block from './Block'

export class Testimonial extends Block {
  setupAnimations() {
    this.title = this.query('h1')

    console.log(this.title)
  }

  bindEvents() {
    // this.on('click', this, console.log('hello'))
    this.on('click', this.title, () => {
      console.log('hello')
    })
  }
}