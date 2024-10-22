import MouseFollower from 'mouse-follower'
import gsap from 'gsap'

export default function initCursor() {
  MouseFollower.registerGSAP(gsap)

  const cursor = new MouseFollower({
    container: document.body,
    speed: 0.3,
    ease: 'power2.out',
  })

  return cursor
}
