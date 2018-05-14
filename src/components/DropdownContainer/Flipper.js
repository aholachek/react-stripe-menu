import React, { Component } from "react"
import ReactDOM from "react-dom"
import { tween, styler, easing } from "popmotion"

const getFlipChildrenPositions = el => {
  return [...el.querySelectorAll("*[data-flip]")]
    .map(el => [el.dataset.flip, el.getBoundingClientRect()])
    .reduce((acc, curr) => {
      acc[curr[0]] = curr[1]
      return acc
    }, {})
}

export default class Flipper extends Component {

  getSnapshotBeforeUpdate(prevProps, prevState) {
    return {
      cachedFlipChildrenPositions: getFlipChildrenPositions(this.el)
    }
  }

  componentDidMount() {
    this.componentIsMounted = true
  }

  componentWillUnmount() {
    this.componentIsMounted = false
  }

  componentDidUpdate(prevProps, prevState, cachedData) {
    if (this.props.hostNode !== prevProps.hostNode) {
      this.animateMove(cachedData)
    }
  }

  animateMove({ cachedFlipChildrenPositions, filterId }) {
    this.flipAnimationInProgress = true
    const newFlipChildrenPositions = getFlipChildrenPositions(this.el)

    Object.keys(newFlipChildrenPositions).forEach(id => {
      const prevRect = cachedFlipChildrenPositions[id]
      const currentRect = newFlipChildrenPositions[id]
      const el = this.el.querySelector(`*[data-flip="${id}"]`)
      const transforms = ["translateX", "translateY", "scaleY", "scaleX"].filter(t => el.dataset[t])

      const translateX = prevRect.x - currentRect.x
      const translateY = prevRect.y - currentRect.y
      const scaleY = prevRect.height / currentRect.height
      const scaleX = prevRect.width / currentRect.width

      const { stop } = tween({
        from: {
          translateX: transforms.includes("translateX") ? translateX : 0,
          translateY: transforms.includes("translateY") ? translateY : 0,
          scaleX: transforms.includes("scaleX") ? scaleX : 1,
          scaleY: transforms.includes("scaleY") ? scaleY : 1
        },
        to: { translateX: 0, translateY: 0, scaleY: 1, scaleX: 1 },
        ...this.props.tweenConfig
      }).start({
        update: ({ translateX, translateY, scaleX, scaleY }) => {
          if (!this.componentIsMounted) {
            stop()
            return
          }
          styler(el).set({ translateX, translateY, scaleY, scaleX })
          if (transforms.some(t => t.indexOf("scale") === 0) && el.children[0])
            styler(el.children[0]).set({
              scaleY: 1 / scaleY,
              scaleX: 1 / scaleX
            })
        }
      })
    })
  }

  render() {
    const { hostNode, children } = this.props
    return ReactDOM.createPortal(<div ref={el => (this.el = el)}>{children}</div>, hostNode)
  }
}
