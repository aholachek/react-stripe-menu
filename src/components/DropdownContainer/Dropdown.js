import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import Flipped from "../Flipper/Flipped"
import FlipTracker from "../Flipper/Flipped"

const TransformOriginTopLeft = styled.div`
  transform-origin: 0 0;
`

const Caret = styled.div`
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  border-width: 10px;
  border-style: solid;
  border-color: transparent transparent var(--white);
  top: -20px;
  left: calc(50% - 10px);
  z-index: 1;
`

const DropdownBackground = styled.div`
  transform-origin: 0 0;
  background-color: var(--white);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 50px 100px rgba(50, 50, 93, 0.1), 0 15px 35px rgba(50, 50, 93, 0.15),
    0 5px 15px rgba(0, 0, 0, 0.1);
`

const AltBackground = styled.div`
  background-color: var(--grey);
  width: 200%;
  height: 100%;
  position: absolute;
  top: 0;
  left: -50%;
  transform-origin: 0 0;
  z-index: 0;
`

const Dropdown = ({ children, containerRef, altBackgroundRef }) => {
  return (
    <TransformOriginTopLeft innerRef={el => containerRef(el)}>
      <Flipped flipId="dropdown-caret" translateX>
        <Caret />
      </Flipped>
      <Flipped flipId="dropdown" translateX scaleX scaleY>
        <DropdownBackground>
          <Flipped inverseFlipId="dropdown">
            <TransformOriginTopLeft>
              <AltBackground innerRef={el => altBackgroundRef(el)} />
              {children}
            </TransformOriginTopLeft>
          </Flipped>
        </DropdownBackground>
      </Flipped>
    </TransformOriginTopLeft>
  )
}

export default Dropdown
