import React, { Component } from "react"
import Flipper from "../components/Flipper"
import Flipped from "../components/Flipper/Flipped"
import Navbar from "../components/Navbar"
import NavbarItem from "../components/Navbar/NavbarItem"
import ProductsDropdown from "../components/DropdownContents/ProductsDropdown"
import DevelopersDropdown from "../components/DropdownContents/DevelopersDropdown"
import {
  TransformOriginTopLeft,
  Caret,
  DropdownBackground
} from "../components/DropdownContainer/Components"

class SingleFLIP extends Component {
  state = { toggled: false }
  render() {
    const dropdownContents = this.state.toggled ? (
      <ProductsDropdown />
    ) : (
      <DevelopersDropdown />
    )
    const dropdown = (
      <Flipped flipId="dropdown" translateX translateY scaleX scaleY>
        <TransformOriginTopLeft>
          <Caret />
          <DropdownBackground>{dropdownContents}</DropdownBackground>
        </TransformOriginTopLeft>
      </Flipped>
    )
    return (
      <div>
        <Flipper flipKey={this.state.toggled} duration={2500}>
          <Navbar>
            <NavbarItem
              title="Initial position"
              onMouseEnter={() => {
                this.setState({ toggled: false })
              }}
            >
              {!this.state.toggled && dropdown}
            </NavbarItem>
            <NavbarItem
              title="Toggled position"
              onMouseEnter={() => {
                this.setState({ toggled: true })
              }}
            >
              {this.state.toggled && dropdown}
            </NavbarItem>
          </Navbar>
        </Flipper>
      </div>
    )
  }
}

export default SingleFLIP
