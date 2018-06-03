import { tween, styler } from "popmotion"

const getInvertedChildren = (el, id) => [
  ...el.querySelectorAll(`*[data-inverse-flip-id="${id}"]`)
]

// if we're scaling an element and we have element children with data-inverse-flip-ids,
// apply the inverse of the transforms so that the children don't distort
const invertTransformsForChildren = (
  childElements,
  { translateX, translateY, scaleY, scaleX },
  options = {}
) => {
  childElements.forEach(child => {
    const inverseVals = {}
    if (child.dataset.translateX) inverseVals.translateX = -translateX
    if (child.dataset.translateY) inverseVals.translateY = -translateY
    if (child.dataset.scaleX) inverseVals.scaleX = 1 / scaleX
    if (child.dataset.scaleY) inverseVals.scaleY = 1 / scaleY

    const setter = styler(child).set(inverseVals)
    if (options.immediate) setter.render()
  })
}

export const animateMove = ({
  flippedElements, // object of position deltas provided by Flipping.js
  containerEl, // the parent ref from our Flipper component
  duration,
  ease
}) => {
  const body = document.querySelector("body")
  const defaultVals = { translateX: 0, translateY: 0, scaleY: 1, scaleX: 1 }

  Object.keys(flippedElements).forEach(id => {
    const { element, delta, type } = flippedElements[id]
    // we only care if the component's position or size changed
    if (type !== "MOVE") return

    // styler is provided by Popmotion to performantly apply styles to a DOM element
    // we'll use this styler to actually apply the animated values
    const elStyler = styler(element)

    const fromVals = { ...defaultVals }
    // we're only going to animate the values that the child has requested to be animated,
    // based on its data-* attributes
    if (element.dataset.translateX) fromVals.translateX = delta.left
    if (element.dataset.translateY) fromVals.translateY = delta.top
    if (element.dataset.scaleX) fromVals.scaleX = delta.width
    if (element.dataset.scaleY) fromVals.scaleY = delta.height

    // before animating, immediately apply FLIP styles to prevent possibility of flicker
    elStyler.set(fromVals).render()
    // and apply any styles that children elements requested to cancel out parent transforms
    invertTransformsForChildren(getInvertedChildren(element, id), fromVals, {
      immediate: true
    })

    // first, initialize the animation by creating a tween
    // then, kick off the tween by calling start, which will gradually update all the transform values
    // contained in the "from" key to the values in the "to key"
    // on each tick of the tween, we'll apply the styles to the element using the elStyler
    // "transforms" is an object like: { translateX, translateY, scaleX, scaleY }
    const { stop } = tween({
      from: fromVals,
      to: defaultVals,
      duration,
      ease
    }).start(transforms => {
      // just to be safe: if the component has been removed from the DOM
      // immediately cancel any in-progress animations
      if (!body.contains(element)) {
        stop()
        return
      }
      elStyler.set(transforms)
      // and apply any styles that children elements requested to cancel out parent transforms
      invertTransformsForChildren(getInvertedChildren(element, id), transforms)
    })
  })
}
