import React, { Component } from "react"
import { tween, styler } from "popmotion"
import styled from 'styled-components'
import Navbar from "../Navbar"
import DropdownContainer from "../DropdownContainer"
import CompanyDropdown from "../DropdownContents/CompanyDropdown"
import DevelopersDropdown from "../DropdownContents/DevelopersDropdown"
import ProductsDropdown from "../DropdownContents/ProductsDropdown"

const dropdowns = [ProductsDropdown, DevelopersDropdown, CompanyDropdown]
const navbarItems = ["Products", "Developers", "Company"]

const Container = styled.div`
  background: linear-gradient(15deg, var(--dark-blue), var(--gradient-right));
`

export default class AnimatedNavbar extends Component {
  state = { hovered: null }

  onMouseEnter = (i, dropdownRef) => {
    this.setState({
      hovered: {
        index: i,
        dropdownRef,
        direction: this.state.hovered && (this.state.hovered.index < i ? "right" : "left")
      }
    })
  }

  onMouseLeave = event => {
    // // we're still inside the navbar, so ignore this event
    // if (this.el.contains(event.nativeEvent.toElement)) return
    // // we re-triggered this event while the dropdown was already leaving
    // if (!this.state.hovered || this.state.animatingDropdownOut) return
    // setTimeout(() => {
    //   this.setState({
    //     animatingDropdownOut: true
    //   })
    //   setTimeout(() => {
    //     this.setState({
    //       animatingDropdownOut: false,
    //       hovered: null
    //     })
    //   }, this.props.tweenConfig.duration)
    // }, 20)
  }

  render() {
    const { tweenConfig } = this.props
    const CurrentDropdown = this.state.hovered && dropdowns[this.state.hovered.index]
    return (
      <Container innerRef={el => (this.el = el)} onMouseLeave={this.onMouseLeave}>
        <Navbar items={navbarItems} onMouseEnter={this.onMouseEnter} />
        {(this.state.hovered || this.state.animatingDropdownOut) && (
          <DropdownContainer
            direction={this.state.hovered.direction}
            hostNode={this.state.hovered.dropdownRef}
            animatingOut={this.state.animatingDropdownOut}
            tweenConfig={tweenConfig}
          >
            <CurrentDropdown />
          </DropdownContainer>
        )}
      </Container>
    )
  }
}
