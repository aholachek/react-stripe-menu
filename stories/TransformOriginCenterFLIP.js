import React, { Component } from "react"
import styled from "styled-components"
import Flipper from "../src/Flipper"
import NavbarItem from "../src/Navbar/NavbarItem"
import ProductsDropdown from "../src/DropdownContents/ProductsDropdown"
import DevelopersDropdown from "../src/DropdownContents/DevelopersDropdown"
import { Caret } from "../src/DropdownContainer/Components"

const Navbar = styled.ul`
  display: flex;
  justify-content: space-between;
  list-style-type: none;
`
const FakeDropdownBackground = styled.div`
  background-color: #fff;
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
        <Caret data-flip-key="dropdown-caret" />
        <FakeDropdownBackground data-flip-key="dropdown">
          <div data-inverse-flip-key="dropdown">{dropdownContents}</div>
        </FakeDropdownBackground>
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
