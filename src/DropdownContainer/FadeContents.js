import React, { forwardRef } from "react"
import PropTypes from "prop-types"
import styled, { keyframes } from "styled-components"
import { promoteLayer } from "./utils"

const getFadeContainerKeyFrame = ({ animatingOut, direction }) => {
  if (!direction) return
  return keyframes`
  to {
    transform: translateX(0px);
    opacity: ${animatingOut ? 0 : 1};
  }
`
}
const FadeContainer = styled.div`
  ${promoteLayer}
  animation-name: ${getFadeContainerKeyFrame};
  animation-duration: ${props => props.duration}ms;
  animation-fill-mode: forwards;
  opacity: ${props => (props.direction && !props.animatingOut ? 0 : 1)};
  top: 0;
  left: 0;
`

const propTypes = {
  duration: PropTypes.number,
  direction: PropTypes.oneOf(["right", "left"]),
  animatingOut: PropTypes.bool,
  children: PropTypes.node
}

const FadeContents = forwardRef(
  ({ children, duration, animatingOut, direction }, ref) => (
    <FadeContainer
      // prevent screen readers from reading out hidden content
      aria-hidden={animatingOut}
      animatingOut={animatingOut}
      direction={direction}
      duration={duration}
      ref={ref}
    >
      {children}
    </FadeContainer>
  )
)

FadeContents.propTypes = propTypes

export default FadeContents
