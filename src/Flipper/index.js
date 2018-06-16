import React, { Component } from "react"
import PropTypes from "prop-types"
// import from /dist as a temporary workaround for https://github.com/davidkpiano/flipping/issues/9
import Flipping from "flipping/dist/flipping"
import { animateMove } from "./flipHelpers"
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

  componentDidMount() {
    this.flipping = new Flipping({
      parent: this.el,
      onFlip: this.onFlip
    })
  }

  onFlip = flippedElements => {
    animateMove({
      flippedElements,
      duration: this.props.duration,
      ease: this.props.ease
    })
  }

  getSnapshotBeforeUpdate(prevProps) {
    if (prevProps.flipKey !== this.props.flipKey) this.flipping.read()
    return null
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.flipKey !== undefined &&
      this.props.flipKey !== undefined &&
      this.props.flipKey !== prevProps.flipKey
    ) {
      this.flipping.flip()
    }
  }

  render() {
    return <div ref={el => (this.el = el)}>{this.props.children}</div>
  }
}

export default Flipper
