import React, { Component, Children } from "react"
import PropTypes from "prop-types"
import {
  DropdownRoot,
  TransformOriginTopLeft,
  Caret,
  DropdownBackground,
  AltBackground
} from "./Components"
import FadeContents from "./FadeContents"
import { tween, styler } from "popmotion"

const getFirstDropdownSectionHeight = el => {
  if (!el) return null
  return el.querySelector("*[data-first-dropdown-section]")
    ? el.querySelector("*[data-first-dropdown-section]").offsetHeight
    : 0
}

const updateAltBackground = ({
  altBackground,
  prevDropdown,
  currentDropdown,
  tweenConfig
}) => {
  const prevHeight = getFirstDropdownSectionHeight(prevDropdown)
  const currentHeight = getFirstDropdownSectionHeight(currentDropdown)

  if (prevHeight) {
    // transition the grey ("alt") background from its previous height to its current height
    tween({
      from: {
        translateY: prevHeight
      },
      to: { translateY: currentHeight },
      ...tweenConfig
    }).start(styler(altBackground).set)
  } else {
    // just immediately set the background to the appropriate height
    // since we don't have a stored value
    styler(altBackground).set({ translateY: currentHeight })
  }
}

class DropdownContainer extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    animatingOut: PropTypes.bool,
    direction: PropTypes.oneOf(["left", "right"]),
    tweenConfig: PropTypes.shape({
      duration: PropTypes.number,
      easing: PropTypes.func
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
      {/* separate caret component out so that the main DropdownBackground can have overflow:hidden */}
        <Caret data-flip-key="dropdown-caret" />
        <DropdownBackground data-flip-key="dropdown">
        {/* using styled-components to make sure that all FLIP-ped components have transform-origin: 0 0; set */}
          <TransformOriginTopLeft data-inverse-flip-key="dropdown">
            <AltBackground innerRef={el => (this.altBackgroundEl = el)} />
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
          </TransformOriginTopLeft>
        </DropdownBackground>
      </DropdownRoot>
    )
  }
}

export default DropdownContainer
