import React, { Component } from "react"
import { tween, styler } from "popmotion"

const getFlipChildrenPositions = el => {
  return [...el.querySelectorAll("*[data-flip]")]
    .map(el => [el.dataset.flip, el.getBoundingClientRect()])
    .reduce((acc, curr) => ({ ...acc, [curr[0]]: curr[1] }), {})
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
    if (this.props.flipKey !== undefined && this.props.flipKey !== prevProps.flipKey) {
      this.animateMove(cachedData)
    }
  }

  animateMove({ cachedFlipChildrenPositions, cachedContents }) {
    const newFlipChildrenPositions = getFlipChildrenPositions(this.el)
    const defaultVals = { translateX: 0, translateY: 0, scaleY: 1, scaleX: 1 }

    Object.keys(newFlipChildrenPositions).forEach(id => {
      const prevRect = cachedFlipChildrenPositions[id]
      const currentRect = newFlipChildrenPositions[id]
      if (!prevRect || !currentRect) return
      const el = this.el.querySelector(`*[data-flip="${id}"]`)

      const fromVals = { ...defaultVals }
      if (el.dataset.translateX) fromVals.translateX = prevRect.x - currentRect.x
      if (el.dataset.translateY) fromVals.translateY = prevRect.y - currentRect.y
      if (el.dataset.scaleX) fromVals.scaleX = prevRect.width / currentRect.width
      if (el.dataset.scaleY) fromVals.scaleY = prevRect.height / currentRect.height

      const { stop } = tween({
        from: fromVals,
        to: defaultVals,
        ...this.props.tweenConfig
      }).start(({ translateX, translateY, scaleX, scaleY }) => {
        if (!this.componentIsMounted) {
          stop()
          return
        }
        styler(el).set({ translateX, translateY, scaleY, scaleX })
        if (el.dataset.scaleX || el.dataset.scaleY) {
          ;[...el.querySelectorAll(`*[data-inverse-flip-id="${id}"]`)].forEach(el => {
            styler(el).set({
              scaleY: 1 / scaleY,
              scaleX: 1 / scaleX
            })
          })
        }
      })
    })
  }

  render() {
    return <div ref={el => (this.el = el)}>{this.props.children}</div>
  }
}
