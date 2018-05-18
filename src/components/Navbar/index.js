import React, { Component } from "react"
import styled from "styled-components"
import NavbarItem from "./NavbarItem"

const NavbarList = styled.ul`
  display: flex;
  list-style: none;
  max-width: 35rem;
  margin: auto;
  padding: 1rem;
`

class Navbar extends Component {
  render() {
    const { children, onMouseLeave } = this.props
    return (
      <nav onMouseLeave={onMouseLeave}>
        <NavbarList>{children}</NavbarList>
      </nav>
    )
  }
}

export default Navbar
