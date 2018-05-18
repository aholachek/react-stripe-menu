import React, { Component, Children } from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import Flipper from "../Flipper"
import TransitionContents from "./TransitionContents"
import Dropdown from "./Dropdown"
import { tween, styler } from "popmotion"

const animateDropdownEnter = ({ el, tweenConfig }) => {
  const { stop } = tween({
    from: { rotateX: 45, opacity: 0 },
    to: { rotateX: 0, opacity: 1 },
    ...tweenConfig
  }).start(styler(el).set)
}

const animateDropdownLeave = ({ el, tweenConfig }) => {
  tween({
    from: { rotateX: 0, opacity: 1 },
    to: { rotateX: 45, opacity: 0 },
    ...tweenConfig
  }).start(styler(el).set)
}

const getFirstDropdownSectionHeight = el => {
  return el.querySelector("*[data-dropdown-section]").offsetHeight
}

const updateAltBackground = ({ el, altBackground, tweenConfig }) => {
  const dropdownContents = el.querySelectorAll("*[data-transition]")
  const currentHeight = getFirstDropdownSectionHeight(dropdownContents[0])

  if (dropdownContents.length == 2) {
    // transition the grey background from its previous height to its current height
    const prevHeight = getFirstDropdownSectionHeight(dropdownContents[1])
    tween({
      from: {
        translateY: prevHeight
      },
      to: { translateY: currentHeight },
      ...tweenConfig
    }).start(styler(altBackground).set)
  } else {
    // just set the background to the appropriate height without a transition
    styler(altBackground).set({ translateY: currentHeight })
  }
}

class DropdownContainer extends Component {
  static propTypes = {
    animatingOut: PropTypes.bool,
    hostNode: PropTypes.object,
    children: PropTypes.node,
    direction: PropTypes.string,
    tweenConfig: PropTypes.object
  }

  componentDidMount() {
    if (!this.props.direction) {
      animateDropdownEnter({ el: this.el, tweenConfig: this.props.tweenConfig })
    }
    updateAltBackground({
      el: this.el,
      altBackground: this.altBackground,
      tweenConfig: this.props.tweenConfig
    })
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.animatingOut && !prevProps.animatingOut) {
      animateDropdownLeave({ el: this.el, tweenConfig: this.props.tweenConfig })
    }
  }

  render() {
    const { hostNode, children, direction, tweenConfig } = this.props

    return (
      <Dropdown
        containerRef={el => {
          this.el = el
        }}
        altBackgroundRef={el => (this.altBackground = el)}
      >
        {children}
      </Dropdown>
    )
  }
}

export default DropdownContainer
