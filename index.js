var THREE = require('three')

module.exports = View

function View(opts) {
  this.fov = opts.fov || 60
  this.width = opts.width || 512;
  this.height = opts.height || 512;
  this.aspectRatio = opts.aspectRatio || this.width/this.height
  this.nearPlane = opts.nearPlane || 1
  this.farPlane = opts.farPlane || 10000
  this.skyColor = opts.skyColor || 0xBFD1E5
  this.camera = new THREE.PerspectiveCamera(this.fov, this.aspectRatio, this.nearPlane, this.farPlane)
  this.camera.lookAt(new THREE.Vector3(0, 0, 0))

  this.renderer = new THREE.WebGLRenderer({
    antialias: true
  })
  this.renderer.setSize(this.width, this.height)
  this.renderer.setClearColorHex(this.skyColor, 1.0)
  this.renderer.clear()

  this.element = this.renderer.domElement
}


var temporaryPosition = new THREE.Vector3
  , temporaryVector = new THREE.Vector3


View.prototype.cameraPosition = function() {
  temporaryPosition.multiplyScalar(0)
  this.camera.matrixWorld.multiplyVector3(temporaryPosition)
  return temporaryPosition
}

View.prototype.cameraVector = function() {
  temporaryVector.multiplyScalar(0)
  temporaryVector.z = -1
  this.camera.matrixWorld.multiplyVector3(temporaryVector)
  temporaryVector.subSelf(this.cameraPosition()).normalize()
  return temporaryVector
}

View.prototype.resizeWindow = function(width, height) {
  this.camera.aspect = this.aspectRatio = width/height

  this.camera.updateProjectionMatrix()

  this.renderer.setSize( width, height )
}

View.prototype.render = function(scene) {
  this.renderer.render(scene, this.camera)
}