import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function initGSAP() {
  gsap.registerPlugin(ScrollTrigger)

  gsap.config({
    nullTargetWarn: false,
  })

  return gsap
}
