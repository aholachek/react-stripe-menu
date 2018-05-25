import React, { Component } from "react"
import styled from "styled-components"
import Flipper from "../src/Flipper"
import Flipped from "../src/Flipper/Flipped"
import NavbarItem from "../src/Navbar/NavbarItem"
import ProductsDropdown from "../src/DropdownContents/ProductsDropdown"
import DevelopersDropdown from "../src/DropdownContents/DevelopersDropdown"
import { Caret, DropdownBackground } from "../src/DropdownContainer/Components"

const Navbar = styled.ul`
  display: flex;
  justify-content: space-between;
  list-style-type: none;
`
const FakeDropdownBackground = styled.div`
  background-color: var(--white);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 50px 100px rgba(50, 50, 93, 0.1),
    0 15px 35px rgba(50, 50, 93, 0.15), 0 5px 15px rgba(0, 0, 0, 0.1);
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
          <FakeDropdownBackground>
            <Flipped inverseFlipId="dropdown" scaleX scaleY>
              <div>{dropdownContents}</div>
            </Flipped>
          </FakeDropdownBackground>
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
