import React, { Component } from "react"
import PropTypes from "prop-types"
import Flipper from "./Flipper"
import TransitionContents from "./TransitionContents"
import DropdownCaret from "./DropdownComponents/Caret"
import AltBackground from "./DropdownComponents/AltBackground"
import Dropdown from "./DropdownComponents/Dropdown"
import DropdownContainer from './DropdownComponents/Container'
import { tween, styler } from "popmotion"

const animateDropdownEnter = ({ el, tweenConfig }) => {
  tween({
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

const animateAltBackground = ({ el, cachedAltTranslateY, altTranslateY, tweenConfig }) => {
  if (cachedAltTranslateY) {
    tween({
      from: {
        translateY: cachedAltTranslateY
      },
      to: { translateY: altTranslateY },
      ...tweenConfig
    }).start(styler(el).set)
  } else {
    styler(el).set({ translateY: altTranslateY })
  }
}

const getFirstDropdownSectionHeight = el =>
  el.querySelector("*[data-dropdown-section]").offsetHeight

class AnimatedDropdown extends Component {
  state = { cachedChildren: null }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    return {
      cachedChildren: prevProps.children,
      cachedAltTranslateY: getFirstDropdownSectionHeight(this.el)
    }
  }
  componentDidMount() {
    animateDropdownEnter({ el: this.el, tweenConfig: this.props.tweenConfig })
    animateAltBackground({
      el: this.altBackground,
      altTranslateY: getFirstDropdownSectionHeight(this.el),
      tweenConfig: this.props.tweenConfig
    })
  }
  componentDidUpdate(prevProps, prevState, { cachedChildren, cachedAltTranslateY }) {
    if (this.props.animatingOut && !prevProps.animatingOut) {
      animateDropdownLeave({ el: this.el, tweenConfig: this.props.tweenConfig })
    }
    if (cachedChildren.type !== this.props.children.type) {
      animateAltBackground({
        el: this.altBackground,
        cachedAltTranslateY,
        altTranslateY: getFirstDropdownSectionHeight(this.el),
        tweenConfig: this.props.tweenConfig
      })
      this.setState({
        cachedChildren
      })
      setTimeout(() => {
        this.setState({ cachedChildren: null })
      }, this.props.tweenConfig.duration)
    }
  }

  render() {
    const { animatingOut, hostNode, children, direction, tweenConfig } = this.props
    const { cachedChildren } = this.state
    return (
      <Flipper hostNode={hostNode} tweenConfig={tweenConfig}>
        <DropdownContainer innerRef={el => (this.el = el)}>
          <DropdownCaret />
          <Dropdown>
            <TransitionContents direction={direction} tweenConfig={tweenConfig}>
              {children}
            </TransitionContents>
            {cachedChildren && (
              <TransitionContents animatingOut direction={direction} tweenConfig={tweenConfig}>
                {cachedChildren}
              </TransitionContents>
            )}
            <AltBackground innerRef={el => (this.altBackground = el)} />
          </Dropdown>
        </DropdownContainer>
      </Flipper>
    )
  }
}

export default AnimatedDropdown
