import React, { Component, Children } from "react"
import PropTypes from "prop-types"
import { Flipped } from "react-flip-toolkit"
import {
  DropdownRoot,
  Caret,
  DropdownBackground,
  AltBackground
} from "./Components"
import FadeContents from "./FadeContents"

const getFirstDropdownSectionHeight = el => {
  if (!el) return null
  return el.querySelector("*[data-first-dropdown-section]")
    ? el.querySelector("*[data-first-dropdown-section]").offsetHeight
    : 0
}

const updateAltBackground = ({
  altBackground,
  prevDropdown,
  currentDropdown
}) => {
  const prevHeight = getFirstDropdownSectionHeight(prevDropdown)
  const currentHeight = getFirstDropdownSectionHeight(currentDropdown)

  const immediateSetTranslateY = (el, translateY) => {
    el.style.transform = `translateY(${translateY}px)`
    el.style.transition = "transform 0s"
    requestAnimationFrame(() => (el.style.transitionDuration = ""))
  }

  if (prevHeight) {
    // transition the grey ("alt") background from its previous height to its current height
    immediateSetTranslateY(altBackground, prevHeight)
    requestAnimationFrame(() => {
      altBackground.style.transform = `translateY(${currentHeight}px)`
    })
  } else {
    // just immediately set the background to the appropriate height
    // since we don't have a stored value
    immediateSetTranslateY(altBackground, currentHeight)
  }
}

class DropdownContainer extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    animatingOut: PropTypes.bool,
    direction: PropTypes.oneOf(["left", "right"]),
    tweenConfig: PropTypes.shape({
      duration: PropTypes.number,
      easing: PropTypes.string
    })
  }

  componentDidMount() {
    updateAltBackground({
      altBackground: this.altBackgroundEl,
      prevDropdown: this.prevDropdownEl,
      currentDropdown: this.currentDropdownEl,
      tweenConfig: this.props.tweenConfig
    })
  }

  render() {
    const { children, direction, animatingOut, tweenConfig } = this.props
    const [currentDropdown, prevDropdown] = Children.toArray(children)
    return (
      <DropdownRoot
        direction={direction}
        animatingOut={animatingOut}
        duration={tweenConfig.duration}
      >
        <Flipped flipId="dropdown-caret">
          <Caret />
        </Flipped>
        <Flipped flipId="dropdown">
          <DropdownBackground>
            <Flipped inverseFlipId="dropdown" scale>
              <div>
                <AltBackground
                  innerRef={el => (this.altBackgroundEl = el)}
                  duration={tweenConfig.duration}
                />
                <FadeContents
                  direction={direction}
                  duration={tweenConfig.duration}
                  innerRef={el => (this.currentDropdownEl = el)}
                >
                  {currentDropdown}
                </FadeContents>
                {prevDropdown && (
                  <FadeContents
                    animatingOut
                    direction={direction}
                    duration={tweenConfig.duration}
                    innerRef={el => (this.prevDropdownEl = el)}
                  >
                    {prevDropdown}
                  </FadeContents>
                )}
              </div>
            </Flipped>
          </DropdownBackground>
        </Flipped>
      </DropdownRoot>
    )
  }
}

export default DropdownContainer
