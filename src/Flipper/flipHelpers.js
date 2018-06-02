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
  containerEl,
  duration,
  ease
}) => flippedElements => {
  const body = document.querySelector("body")
  const defaultVals = { translateX: 0, translateY: 0, scaleY: 1, scaleX: 1 }

  Object.keys(flippedElements).forEach(id => {
    const { element, delta } = flippedElements[id]

    const fromVals = { ...defaultVals }
    // we're only going to animate the values that the child wants animated,
    // based on its data-* attributes
    if (element.dataset.translateX) fromVals.translateX = delta.left
    if (element.dataset.translateY) fromVals.translateY = delta.top
    if (element.dataset.scaleX) fromVals.scaleX = delta.width
    if (element.dataset.scaleY) fromVals.scaleY = delta.height

    // before animating, immediately apply FLIP styles to prevent flicker
    // (which was only detectable on Safari)
    styler(element)
      .set(fromVals)
      .render()
    invertTransformsForChildren(getInvertedChildren(element, id), fromVals, {
      immediate: true
    })

    // now start the animation
    const { stop } = tween({
      from: fromVals,
      to: defaultVals,
      duration,
      ease
    }).start(transforms => {
      // just to be safe: if the component has been removed from the DOM
      // immediately cancel any in-progress animations
      if (!body.contains(element)) {
        stop && stop()
        return
      }
      styler(element).set(transforms)
      // for children that requested it, cancel out the transform by applying the inverse transform
      invertTransformsForChildren(getInvertedChildren(element, id), transforms)
    })
  })
}
