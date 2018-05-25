import React, { Component } from "react"
import PropTypes from "prop-types"
import { tween, styler, easing } from "popmotion"

const getFlipChildrenPositions = el => {
  return [...el.querySelectorAll("*[data-flip]")]
    .map(child => [child.dataset.flip, child.getBoundingClientRect()])
    .reduce((acc, curr) => ({ ...acc, [curr[0]]: curr[1] }), {})
}

class Flipper extends Component {
  static propTypes = {
    flipKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool
    ]),
    children: PropTypes.node.isRequired,
    duration: PropTypes.number,
    easing: PropTypes.func
  }

  static defaultProps = {
    duration: 250,
    easing: easing.easeOut
  }

  getSnapshotBeforeUpdate(prevProps) {
    return {
      cachedFlipChildrenPositions: getFlipChildrenPositions(this.el)
    }
  }

  componentDidUpdate(prevProps, prevState, cachedData) {
    if (
      this.props.flipKey !== undefined &&
      this.props.flipKey !== prevProps.flipKey
    ) {
      this.animateMove(cachedData)
    }
  }

  animateMove({ cachedFlipChildrenPositions }) {
    const newFlipChildrenPositions = getFlipChildrenPositions(this.el)
    const defaultVals = { translateX: 0, translateY: 0, scaleY: 1, scaleX: 1 }

    Object.keys(newFlipChildrenPositions).forEach(id => {
      const prevRect = cachedFlipChildrenPositions[id]
      const currentRect = newFlipChildrenPositions[id]
      if (!prevRect || !currentRect) return
      const el = this.el.querySelector(`*[data-flip="${id}"]`)

      const fromVals = { ...defaultVals }
      // we're only going to animate the values that the child wants animated,
      // based on its data-* attributes
      if (el.dataset.translateX)
        fromVals.translateX = prevRect.x - currentRect.x
      if (el.dataset.translateY)
        fromVals.translateY = prevRect.y - currentRect.y
      if (el.dataset.scaleX)
        fromVals.scaleX = prevRect.width / currentRect.width
      if (el.dataset.scaleY)
        fromVals.scaleY = prevRect.height / currentRect.height

      // before animating, immediately apply FLIP styles to prevent flicker
      styler(el)
        .set(fromVals)
        .render()

      const body = document.querySelector("body")

      const { stop } = tween({
        from: fromVals,
        to: defaultVals,
        duration: this.props.duration,
        easing: this.props.easing
      }).start(({ translateX, translateY, scaleX, scaleY }) => {

        // just to be safe: if the whole component has been removed from the DOM
        // (e.g. if the current page changed), let's immediately cancel
        // any in-progress animations
        if (!body.contains(el)) {
          stop && stop()
          return
        }
        // set the appropriate values for this tick of the animation
        styler(el).set({ translateX, translateY, scaleY, scaleX })

        // if we're scaling and we have children with data-inverse-flip-ids,
        // apply the inverse of the scale so that the children don't distort

        const childElements = [
          ...el.querySelectorAll(`*[data-inverse-flip-id="${id}"]`)
        ]

        childElements.forEach(child => {
          const inverseVals = {}
          if (child.dataset.translateX) inverseVals.translateX = -translateX
          if (child.dataset.translateY) inverseVals.translateY = -translateY
          if (child.dataset.scaleX) inverseVals.scaleX = 1 / scaleX
          if (child.dataset.scaleY) inverseVals.scaleY = 1 / scaleY

          styler(child).set(inverseVals)
        })
      })
    })
  }

  render() {
    return <div ref={el => (this.el = el)}>{this.props.children}</div>
  }
}

export default Flipper
