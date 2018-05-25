import React, { Component } from "react"
import PropTypes from "prop-types"
import Navbar from "./Navbar"
import NavbarItem from "./Navbar/NavbarItem"
import Flipper from "./Flipper"
import DropdownContainer from "./DropdownContainer"
import CompanyDropdown from "./DropdownContents/CompanyDropdown"
import DevelopersDropdown from "./DropdownContents/DevelopersDropdown"
import ProductsDropdown from "./DropdownContents/ProductsDropdown"

const navbarConfig = [
  { title: "Products", dropdown: ProductsDropdown },
  { title: "Developers", dropdown: DevelopersDropdown },
  { title: "Company", dropdown: CompanyDropdown }
]

export default class AnimatedNavbar extends Component {
  static propTypes = {
    tweenConfig: PropTypes.shape({
      duration: PropTypes.number,
      easing: PropTypes.func
    })
  }

  state = {
    activeIndices: []
  }

  resetDropdownState = () => {
    this.setState({
      activeIndices: [],
      animatingOut: false
    })
    delete this.animatingOutTimeout
  }

  onMouseEnter = i => {
    if (this.animatingOutTimeout) {
      clearTimeout(this.animatingOutTimeout)
      this.resetDropdownState()
    }
    this.setState(prevState => ({
      activeIndices: prevState.activeIndices.concat(i),
      animatingOut: false
    }))
  }

  onMouseLeave = () => {
    this.setState({
      animatingOut: true
    })
    this.animatingOutTimeout = setTimeout(
      this.resetDropdownState,
      this.props.tweenConfig.duration
    )
  }

  render() {
    const { tweenConfig } = this.props

    let CurrentDropdown
    let PrevDropdown
    let direction

    const currentIndex = this.state.activeIndices[
      this.state.activeIndices.length - 1
    ]
    const prevIndex =
      this.state.activeIndices.length > 1 &&
      this.state.activeIndices[this.state.activeIndices.length - 2]

    if (typeof currentIndex === "number")
      CurrentDropdown = navbarConfig[currentIndex].dropdown
    if (typeof prevIndex === "number") {
      PrevDropdown = navbarConfig[prevIndex].dropdown
      direction = currentIndex > prevIndex ? "right" : "left"
    }

    return (
      <Flipper flipKey={currentIndex} {...tweenConfig}>
        <Navbar onMouseLeave={this.onMouseLeave}>
          {navbarConfig.map((n, index) => {
            return (
              <NavbarItem
                title={n.title}
                index={index}
                onMouseEnter={this.onMouseEnter}
              >
                {currentIndex === index && (
                  <DropdownContainer
                    direction={direction}
                    animatingOut={this.state.animatingOut}
                    tweenConfig={this.props.tweenConfig}
                  >
                    <CurrentDropdown />
                    {PrevDropdown && <PrevDropdown />}
                  </DropdownContainer>
                )}
              </NavbarItem>
            )
          })}
        </Navbar>
      </Flipper>
    )
  }
}
