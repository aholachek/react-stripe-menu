import React, { Component } from "react"
import PropTypes from "prop-types"
import { getFlippedElementPositions, animateMove } from "./flipHelpers"

import { easing } from "popmotion"

class Flipper extends Component {
  static propTypes = {
    flipKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool
    ]),
    children: PropTypes.node.isRequired,
    duration: PropTypes.number,
    ease: PropTypes.func
  }

  static defaultProps = {
    duration: 250,
    ease: easing.easeOut
  }

  getSnapshotBeforeUpdate(prevProps) {
    if (prevProps.flipKey !== this.props.flipKey) {
      return getFlippedElementPositions(this.el)
    }
  }

  componentDidUpdate(prevProps, prevState, cachedFlipChildrenPositions) {
    if (
      this.props.flipKey !== undefined &&
      this.props.flipKey !== prevProps.flipKey
    ) {
      animateMove({
        containerEl: this.el,
        cachedFlipChildrenPositions,
        duration: this.props.duration,
        ease: this.props.ease
      })
    }
  }

  render() {
    return <div ref={el => (this.el = el)}>{this.props.children}</div>
  }
}

export default Flipper
