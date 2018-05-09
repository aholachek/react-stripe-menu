import React, { Component } from "react"
import ReactDOM from "react-dom"
import { tween, styler, easing } from "popmotion"
import "./styles.css"

const baseTweenData = {
  ease: easing.easeOut,
  duration: 250,
}

const translateDistance = 200

class DropdownList extends Component {
  componentDidMount() {
    if (this.props.animatingOut) {
      this.animateListOut(this.props.direction)
    } else if (this.props.direction) {
      this.animateListIn(this.props.direction)
    }
  }

  animateListIn(direction) {
    tween({
      from: {
        translateX: direction === "left" ? translateDistance : -translateDistance,
        opacity: 0
      },
      to: { translateX: 0, opacity: 1 },
      ...baseTweenData
    }).start(styler(this.el).set)
  }

  animateListOut(direction) {
    const setListStyles = styler(this.el).set
    setListStyles({ position: "absolute", top: 0 })
    tween({
      from: { translateX: 0, opacity: 1 },
      to: { translateX: direction === "left" ? -translateDistance : translateDistance, opacity: 0 },
      ...baseTweenData
    }).start(setListStyles)
  }

  render() {
    return (
      <ul className="dropdown__list" ref={el => (this.el = el)}>
        {this.props.links.map(l => <li key={l.title}>{l.title}</li>)}
      </ul>
    )
  }
}

export default DropdownList
