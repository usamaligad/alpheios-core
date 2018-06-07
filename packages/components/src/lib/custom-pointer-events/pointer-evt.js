import EventElement from './event-element.js'

export default class PointerEvt {
  constructor () {
    this.tracking = false
    this.start = new EventElement()
    this.end = new EventElement()
  }

  static alpheiosIgnoreAllTest (dataset) {
    const attrName = 'alpheiosIgnore'
    const attrValue = 'all'
    return dataset.hasOwnProperty(attrName) && dataset[attrName] === attrValue
  }

  static excludeAllCpeTest (dataset) {
    return dataset.hasOwnProperty('alphExcludeAllCpe')
  }

  static excludeCpeTest (dataset) {
    return false
  }

  static get pointerEventSupported () {
    return window.PointerEvent
  }

  setPoint (type, clientX, clientY, target, path = []) {
    this[type].time = new Date().getTime()
    this[type].client.x = clientX
    this[type].client.y = clientY
    this[type].target = target
    if (!Array.isArray(path)) { path = [path] }
    this[type].path = path
    this[type].excluded = this[type].path.some(element =>
      element.dataset && (
        this.constructor.alpheiosIgnoreAllTest(element.dataset) ||
        this.constructor.excludeAllCpeTest(element.dataset) ||
        this.constructor.excludeCpeTest(element.dataset)
      )
    )
    return this
  }

  setStartPoint (clientX, clientY, target, path) {
    return this.setPoint('start', clientX, clientY, target, path)
  }

  setEndPoint (clientX, clientY, target, path) {
    this.setPoint('end', clientX, clientY, target, path)
  }

  get type () {
    return this.constructor.name
  }

  get duration () {
    return this.end.time - this.start.time
  }

  get mvmntX () {
    return this.end.client.x - this.start.client.x
  }

  get mvmntY () {
    return this.end.client.y - this.start.client.y
  }

  get mvmntXAbs () {
    return Math.abs(this.mvmntX)
  }

  get mvmntYAbs () {
    return Math.abs(this.mvmntY)
  }

  get mvmntDist () {
    return Math.sqrt(Math.pow(this.mvmntX, 2) + Math.pow(this.mvmntY, 2))
  }

  static pointerDownListener (event, domEvt) {
    console.log(`Pointer down`, domEvt)
    event.setStartPoint(domEvt.clientX, domEvt.clientY, domEvt.target, domEvt.path)
  }

  static pointerUpListener (event, domEvt) {
    const valid = event.setEndPoint(domEvt.clientX, domEvt.clientY, domEvt.target, domEvt.path)
    console.log(`Pointer up, excluded: ${event.end.excluded}`, domEvt)
    if (valid) { event.evtHandler(event) }
  }

  static touchStartListener (event, domEvt) {
    console.log(`Touch start`, domEvt)
    event.setStartPoint(domEvt.changedTouches[0].clientX, domEvt.changedTouches[0].clientY, domEvt.target, domEvt.path)
  }

  static touchEndListener (event, domEvt) {
    const valid = event.setEndPoint(domEvt.changedTouches[0].clientX, domEvt.changedTouches[0].clientY, domEvt.target, domEvt.path)
    console.log(`Touch end, excluded: ${event.end.excluded}`, domEvt)

    if (valid) { event.evtHandler(event) }
  }

  static dblClickListener (event, domEvt) {
    const valid = event
      .setStartPoint(domEvt.clientX, domEvt.clientY, domEvt.target, domEvt.path)
      .setEndPoint(domEvt.clientX, domEvt.clientY, domEvt.target, domEvt.path)
    console.log(`Mouse double click, [x,y]: [${event.end.client.x}, ${event.end.client.y}], excluded: ${event.end.excluded}`)
    if (valid) { event.evtHandler(event) }
  }

  static addUpDownListeners (element, event) {
    if (this.pointerEventSupported) {
      // Will use pointer events
      element.addEventListener('pointerdown', this.pointerDownListener.bind(this, event), {passive: true})
      element.addEventListener('pointerup', this.pointerUpListener.bind(this, event), {passive: true})
    } else {
      element.addEventListener('touchstart', this.touchStartListener.bind(this, event), {passive: true})
      element.addEventListener('touchend', this.touchEndListener.bind(this, event), {passive: true})
    }
  }

  static addDblClickListener (element, event) {
    element.addEventListener('dblclick', this.dblClickListener.bind(this, event), {passive: true})
  }
}
