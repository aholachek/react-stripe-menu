import React, { Component, Children } from "react"
import PropTypes from "prop-types"
import {
  DropdownRoot,
  TransformOriginTopLeft,
  Caret,
  DropdownBackground,
  AltBackground,
  FadeInContents,
  FadeOutContents
} from "./Components"
import Flipped from "../Flipper/Flipped"
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
    styler(altBackground)
      .set({ translateY: currentHeight })
      .render()
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
        <Flipped flipId="dropdown-caret" translateX>
          <Caret />
        </Flipped>
        <Flipped flipId="dropdown" translateX scaleX scaleY>
          <DropdownBackground>
            <Flipped inverseFlipId="dropdown" scaleX scaleY>
              <TransformOriginTopLeft>
                <AltBackground innerRef={el => (this.altBackgroundEl = el)} />
                <FadeInContents
                  direction={direction}
                  duration={tweenConfig.duration}
                  innerRef={el => (this.currentDropdownEl = el)}
                >
                  {currentDropdown}
                </FadeInContents>
                {prevDropdown && (
                  <FadeOutContents
                    direction={direction}
                    duration={tweenConfig.duration}
                    innerRef={el => (this.prevDropdownEl = el)}
                  >
                    {prevDropdown}
                  </FadeOutContents>
                )}
              </TransformOriginTopLeft>
            </Flipped>
          </DropdownBackground>
        </Flipped>
      </DropdownRoot>
    )
  }
}

export default DropdownContainer
