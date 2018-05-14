import React, { Component } from "react"
import PropTypes from "prop-types"
import { tween, styler } from "popmotion"
import styled from "styled-components"

const TransitionEl = styled.div`
  position: ${props => (props.animatingOut ? "absolute" : "relative")};
  z-index: ${props => (props.animatingOut ? 2 : 1)};
  top: 0;
  left: 0;
`

const translateDistance = 120

const transitionContentsIn = (el, direction, tweenConfig) => {
  tween({
    from: {
      translateX: direction === "left" ? translateDistance : -translateDistance,
      opacity: 0
    },
    to: { translateX: 0, opacity: 1 },
    ...tweenConfig
  }).start(styler(el).set)
}

const transitionContentsOut = (el, direction, tweenConfig) => {
  tween({
    from: { translateX: 0, opacity: 1 },
    to: { translateX: direction === "left" ? -translateDistance : translateDistance, opacity: 0 },
    ...tweenConfig
  }).start(styler(el).set)
}

export default class TransitionContents extends Component {
  componentDidMount() {
    const { animatingOut, direction } = this.props
    if (animatingOut) transitionContentsOut(this.el, direction, this.props.tweenConfig)
    else if (direction) transitionContentsIn(this.el, direction, this.props.tweenConfig)
  }

  render() {
    const { animatingOut, children, duration } = this.props
    return (
      <TransitionEl innerRef={el => (this.el = el)} animatingOut={animatingOut}>
        {children}
      </TransitionEl>
    )
  }
}
