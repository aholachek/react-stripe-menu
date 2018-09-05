import React, { Component } from "react"
import PropTypes from "prop-types"
import styled, { keyframes } from "styled-components"

const getFadeContainerKeyFrame = ({ animatingOut, direction }) => {
  if (!direction) return
  return keyframes`
  from {
    transform: translateX(${
      animatingOut ? 0 : direction === "left" ? 75 : -75
    }px);
  }
  to {
    transform: translateX(${
      !animatingOut ? 0 : direction === "left" ? -75 : 75
    }px);
    opacity: ${animatingOut ? 0 : 1};
  }
`
}

const FadeContainer = styled.div`
  animation-name: ${getFadeContainerKeyFrame};
  animation-duration: ${props => props.duration * 0.75}ms;
  animation-fill-mode: forwards;
  position: ${props => (props.animatingOut ? "absolute" : "relative")};
  opacity: ${props => (props.direction && !props.animatingOut ? 0 : 1)};
  animation-timing-function: linear;
  top: 0;
  left: 0;
`

class FadeContents extends Component {
  static propTypes = {
    duration: PropTypes.number,
    direction: PropTypes.oneOf(["right", "left"]),
    animatingOut: PropTypes.bool,
    children: PropTypes.node,
    ref: PropTypes.func
  }

  render() {
    const { children, duration, animatingOut, innerRef, direction } = this.props
    return (
      <FadeContainer
        // prevent screen readers from reading out hidden content
        aria-hidden={animatingOut}
        animatingOut={animatingOut}
        direction={direction}
        duration={duration}
        ref={el => {
          this.el = el
          innerRef(el)
        }}
      >
        {children}
      </FadeContainer>
    )
  }
}

export default FadeContents
