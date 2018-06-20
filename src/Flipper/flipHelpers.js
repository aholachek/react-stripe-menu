import { tween, styler } from "popmotion"

const getInvertedChildren = (el, id) => [
  ...el.querySelectorAll(`*[data-inverse-flip-key="${id}"]`)
]

// if we're scaling an element and we have children with data-inverse-flip-keys
// apply the inverse of the scale so that the children don't distort
const invertTransformsForChildren = (
  childElements,
  { scaleY, scaleX },
  options = {}
) => {
  childElements.forEach(child => {
    const setter = styler(child).set({
      scaleX: 1 / scaleX,
      scaleY: 1 / scaleY
    })
    if (options.immediate) setter.render()
  })
}

export const animateMove = ({
  flippedElements, // object of position deltas provided by Flipping.js
  duration,
  ease
}) => {
  const body = document.querySelector("body")

  Object.keys(flippedElements).forEach(id => {
    const { element, delta, type } = flippedElements[id]
    // we only care if the component's position or size changed
    if (type !== "MOVE") return

    // creates a function that applies styles to the DOM element
    const elStyler = styler(element)

    const fromVals = {
      translateX: delta.left,
      translateY: delta.top,
      scaleX: delta.width,
      scaleY: delta.height
    }

    // before animating, immediately apply transforms
    // to prevent possibility of flicker
    // "render()" is a Popmotion method to force immediate
    // style application
    elStyler.set(fromVals).render()
    // and apply any styles that children elements requested to
    // cancel out parent transforms
    invertTransformsForChildren(getInvertedChildren(element, id), fromVals, {
      immediate: true
    })

    // kick off the tween by calling start, which will gradually update all
    // the values contained in the "from" key to the values in the "to" key
    const { stop } = tween({
      from: fromVals,
      to: { translateX: 0, translateY: 0, scaleY: 1, scaleX: 1 },
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
      invertTransformsForChildren(getInvertedChildren(element, id), transforms)
    })
  })
}
