import THREE from 'three'

export class UnitCube extends THREE.Mesh {
  geometry
  material

  constructor () {
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    super(geometry, material)

    this.geometry = geometry
    this.material = material

    this.onFrame = this.onFrame.bind(this)
  }

  onFrame (event: THREE.Event): void {
    this.rotation.x += 0.5 * event.dt
    this.rotation.y += 1 * event.dt
    this.rotation.z += 2 * event.dt
  }
}
