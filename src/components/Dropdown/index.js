import React, { Component } from "react"
import ReactDOM from "react-dom"
import { tween, styler, easing } from "popmotion"
import DropdownList from "../DropdownList"
import "./styles.css"

const baseTweenData = {
  duration: 5000,
  ease: easing.easeOut
}

export default class Dropdown extends Component {
  state = { cachedLinks: null }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevProps.dropdownRef !== this.props.dropdownRef) {
      return {
        prevRect: this.el.getBoundingClientRect(),
        prevInnerRect: this.innerEl.getBoundingClientRect(),
        links: prevProps.links
      }
    }
    return null
  }

  componentDidMount() {
    this.animateDropdownEnter()
    this.componentIsMounted = true
  }

  componentWillUnmount() {
    this.componentIsMounted = false
  }

  componentDidUpdate(prevProps, prevState, cachedData) {
    if (cachedData) {
      this.animateDropdownMove(cachedData)
      this.setState({ cachedLinks: cachedData.links })
    } else if (this.props.animatingOut && !prevProps.animatingOut) {
      this.animateDropdownLeave()
    }
  }

  animateDropdownEnter() {
    tween({
      from: { rotateX: 50, opacity: 0 },
      to: { rotateX: 0, opacity: 1 },
      ...baseTweenData
    }).start(styler(this.el).set)
  }

  animateDropdownMove(cachedData) {
    debugger
    const translateX = cachedData.prevRect.x - this.el.getBoundingClientRect().x
    const scaleY = cachedData.prevInnerRect.height / this.innerEl.getBoundingClientRect().height

    const { stop } = tween({
      from: {
        translateX,
        scaleY
      },
      to: { translateX: 0, scaleY: 1 },
      ...baseTweenData
    }).start(({ translateX, scaleY }) => {
      if (!this.componentIsMounted) {
        stop()
        return
      }
      styler(this.el).set({ translateX })
      styler(this.innerEl).set({ scaleY })
      styler(this.contentEl).set({ scaleY: 1 / scaleY })
    })
  }

  animateDropdownLeave() {
    tween({
      from: { rotateX: 0, opacity: 1 },
      to: { rotateX: 50, opacity: 0 },
      ...baseTweenData
    }).start(styler(this.el).set)
  }

  render() {
    const { links, dropdownRef, direction, animatingOut } = this.props
    if (!dropdownRef) return null

    const dropdown = (
      <div className="dropdown" ref={el => (this.el = el)}>
        <div className="dropdown__inner" ref={el => (this.innerEl = el)}>
          <div className="dropdown__content" ref={el => (this.contentEl = el)}>
            <DropdownList links={links} direction={direction} key="new-list" />
            {this.state.cachedLinks && (
              <DropdownList
                links={this.state.cachedLinks}
                animatingOut
                direction={direction}
                key="old-list"
              />
            )}
          </div>
        </div>
      </div>
    )
    return ReactDOM.createPortal(dropdown, dropdownRef)
  }
}
