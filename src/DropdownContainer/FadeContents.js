import React, { Component } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { tween, styler } from "popmotion"

const FadeContainer = styled.div`
 /* make sure the "animatingOut" dropdown doesn't affect layout by giving it position: absolute */
  position: ${props => (props.animatingOut ? "absolute" : "relative")};
  opacity: ${props => (props.direction && !props.animatingOut ? 0 : 1)};
  top: 0;
  left: 0;
`

class FadeContents extends Component {
  static propTypes = {
    duration: PropTypes.number,
    direction: PropTypes.oneOf(["right", "left"]),
    animatingOut: PropTypes.bool,
    children: PropTypes.node,
    innerRef: PropTypes.func
  }

  componentDidMount() {
    const { direction, animatingOut, duration } = this.props;
    if (!direction) return;
    const from = {
      opacity: animatingOut ? 1 : 0,
      translateX: animatingOut ? 0 : direction === "left" ? 25 : -25
    };
    const to = {
      opacity: animatingOut ? 0 : 1,
      translateX: !animatingOut ? 0 : direction === "left" ? -25 : 25
    };
    tween({
      from,
      to,
      duration : duration * 1.75
    }).start(transforms => {
      this.el && styler(this.el).set(transforms);
    });
  }

  render() {
    const { children, animatingOut, innerRef, direction } = this.props
    return (
      <FadeContainer
       // prevent screen readers from reading out hidden content
        aria-hidden={animatingOut}
        animatingOut={animatingOut}
        direction={direction}
        innerRef={el => {
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
