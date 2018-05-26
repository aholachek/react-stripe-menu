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

export const getFlippedElementPositions = el => {
  return [...el.querySelectorAll("*[data-flip]")]
    .map(child => [child.dataset.flip, child.getBoundingClientRect()])
    .reduce((acc, curr) => ({ ...acc, [curr[0]]: curr[1] }), {})
}

export const animateMove = ({
  containerEl,
  cachedFlipChildrenPositions,
  duration,
  ease
}) => {
  const body = document.querySelector("body")
  const newFlipChildrenPositions = getFlippedElementPositions(containerEl)
  const defaultVals = { translateX: 0, translateY: 0, scaleY: 1, scaleX: 1 }

  Object.keys(newFlipChildrenPositions).forEach(id => {

    const prevRect = cachedFlipChildrenPositions[id]
    const currentRect = newFlipChildrenPositions[id]
    if (!prevRect || !currentRect) return
    const el = containerEl.querySelector(`*[data-flip="${id}"]`)

    const fromVals = { ...defaultVals }
    // we're only going to animate the values that the child wants animated,
    // based on its data-* attributes
    if (el.dataset.translateX) fromVals.translateX = prevRect.left - currentRect.left
    if (el.dataset.translateY) fromVals.translateY = prevRect.top - currentRect.top
    if (el.dataset.scaleX) fromVals.scaleX = prevRect.width / currentRect.width
    if (el.dataset.scaleY)
      fromVals.scaleY = prevRect.height / currentRect.height

    // before animating, immediately apply FLIP styles to prevent flicker
    // (which was only detectable on Safari)
    styler(el)
      .set(fromVals)
      .render()
    invertTransformsForChildren(getInvertedChildren(el, id), fromVals, {
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
      if (!body.contains(el)) {
        stop && stop()
        return
      }
      styler(el).set(transforms)
      // for children that requested it, cancel out the transform by applying the inverse transform
      invertTransformsForChildren(getInvertedChildren(el, id), transforms)
    })
  })
}
