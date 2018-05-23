import React, { Component } from "react"
import PropTypes from "prop-types"
import { tween, styler } from "popmotion"
import styled from "styled-components"

const TransitionEl = styled.div`
  position: ${props => (props.animatingOut ? "absolute" : "relative")};
  top: 0;
  left: 0;
`

const translateDistance = 75

const transitionContentsIn = (el, direction, tweenConfig) => {
  tween({
    from: {
      translateX:
        direction === "right" ? -translateDistance : translateDistance,
      opacity: 0
    },
    to: { translateX: 0, opacity: 1 },
    ...tweenConfig
  }).start(styler(el).set)
}

const transitionContentsOut = (el, tweenConfig) => {
  tween({
    from: {
      opacity: 1
    },
    to: {
      opacity: 0
    },
    easing: tweenConfig.easing,
    duration: tweenConfig.duration * 0.66
  }).start(styler(el).set)
}

export default class TransitionContents extends Component {
  static propTypes = {
    animatingOut: PropTypes.bool,
    children: PropTypes.node.isRequired,
    tweenConfig: PropTypes.object,
    direction: PropTypes.oneOf(["left", "right"])
  }

  static defaultProps = {
    tweenConfig: {
      duration: 300
    }
  }

  componentDidMount() {
    const { animatingOut, direction } = this.props
    if (animatingOut) transitionContentsOut(this.el, this.props.tweenConfig)
    else if (direction)
      transitionContentsIn(this.el, direction, this.props.tweenConfig)
  }

  render() {
    const { animatingOut, children } = this.props
    // data attribute is a hack to enable DropdownContainer/index to correctly size the "altBackground" element
    return (
      <TransitionEl
        innerRef={el => (this.el = el)}
        animatingOut={animatingOut}
        data-transition
      >
        {children}
      </TransitionEl>
    )
  }
}
