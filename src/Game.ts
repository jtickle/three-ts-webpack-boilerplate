import THREE from 'three'

export class Game {
  scene
  camera
  renderer
  event

  lastAnimTime: number
  rafNumber: number

  constructor () {
    this.animate = this.animate.bind(this)
    this.resize = this.resize.bind(this)

    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.camera.position.z = 5
    this.renderer = new THREE.WebGLRenderer()
    document.body.appendChild(this.renderer.domElement)

    this.event = new THREE.EventDispatcher()

    this.lastAnimTime = 0
    this.rafNumber = 0

    window.addEventListener('resize', () => {
      const width = Math.floor(this.renderer.domElement.parentElement?.clientWidth ?? 0)
      const height = Math.floor(this.renderer.domElement.parentElement?.clientHeight ?? 0)

      if (width + height === 0) { return }

      this.event.dispatchEvent({ type: 'screen-resize', width, height })
    })
    this.event.addEventListener('screen-resize', this.resize)
  }

  animate (thisAnimTime: DOMHighResTimeStamp): void {
    this.rafNumber = requestAnimationFrame(this.animate)

    const dt = (thisAnimTime - this.lastAnimTime) / 1000
    this.lastAnimTime = thisAnimTime

    this.event.dispatchEvent({ type: 'frame', dt })

    this.renderer.render(this.scene, this.camera)
  }

  resize (event: THREE.Event): void {
    this.renderer.setSize(event.width, event.height)
    this.camera.aspect = event.width / event.height
    this.camera.updateProjectionMatrix()
  }

  start (): void {
    this.animate(0)
    window.dispatchEvent(new Event('resize'))
  }

  stop (): void {
    if (this.rafNumber !== 0) { window.cancelAnimationFrame(this.rafNumber) }
  }
}
