import React, { Component } from "react"
import styled from "styled-components"
import Flipper from "../components/Flipper"
import Flipped from "../components/Flipper/Flipped"
import NavbarItem from "../components/Navbar/NavbarItem"
import ProductsDropdown from "../components/DropdownContents/ProductsDropdown"
import DevelopersDropdown from "../components/DropdownContents/DevelopersDropdown"
import {
  Caret,
  DropdownBackground
} from "../components/DropdownContainer/Components"

const Navbar = styled.ul`
  display: flex;
  justify-content: space-between;
  list-style-type: none;
`

class TransformOriginCenterFLIP extends Component {
  state = { toggled: false }

  render() {
    const dropdownContents = this.state.toggled ? (
      <ProductsDropdown />
    ) : (
      <DevelopersDropdown />
    )
    const dropdown = (
      <div>
        <Flipped flipId="dropdown-caret" translateX>
          <Caret />
        </Flipped>
        <Flipped flipId="dropdown" translateX scaleX scaleY>
          <DropdownBackground>
            <Flipped inverseFlipId="dropdown" scaleX scaleY>
              <div>{dropdownContents}</div>
            </Flipped>
          </DropdownBackground>
        </Flipped>
      </div>
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

export default TransformOriginCenterFLIP
