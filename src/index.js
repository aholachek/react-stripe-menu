import React, { Component } from "react"
import ReactDOM from "react-dom"
import anime from "animejs"
import navbarConfig from "./navbarConfig"
import Navbar from "./components/Navbar"
import Dropdown from "./components/Dropdown"
import "normalize.css"
import "./index.css"

const animDuration = 300

class AnimatedNavbar extends Component {
  state = { hovered: null }

  onMouseEnter = (i, dropdownRef) => {
    this.setState({
      hovered: {
        index: i,
        dropdownRef,
        direction: this.state.hovered ? (this.state.hovered.index < i ? "right" : "left") : null
      }
    })
  }

  onMouseLeave = event => {
    debugger
    // we're still inside the navbar, so ignore this event
    if (this.el.contains(event.nativeEvent.path.toElement)) return
    // we re-triggered this event while the dropdown was already
    if (!this.state.hovered || this.state.animatingDropdownOut) return
    setTimeout(() => {
      this.setState({
        animatingDropdownOut: true
      })
      setTimeout(() => {
        this.setState({
          animatingDropdownOut: false,
          hovered: null
        })
      }, animDuration)
    }, 20)
  }

  render() {
    const { config } = this.props
    return (
      <div ref={el => (this.el = el)}>
        <Navbar items={config} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} />
        {(this.state.hovered || this.state.animatingDropdownOut) && (
          <Dropdown
            links={config[this.state.hovered.index].links}
            direction={this.state.hovered.direction}
            dropdownRef={this.state.hovered.dropdownRef}
            animatingOut={this.state.animatingDropdownOut}
            onMouseLeave={this.onMouseLeave}
          />
        )}
      </div>
    )
  }
}

ReactDOM.render(<AnimatedNavbar config={navbarConfig} />, document.querySelector("#root"))
