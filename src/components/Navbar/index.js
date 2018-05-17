import React, { Component } from "react"
import styled from "styled-components"

import NavbarItem from "./NavbarItem"

const NavbarEl = styled.ul`
  display: flex;
  list-style: none;
  max-width: 35rem;
  margin: auto;
`

class Navbar extends Component {
  render() {
    const { items, onMouseEnter, onMouseLeave } = this.props
    return (
      <nav onMouseLeave={onMouseLeave}>
        <NavbarEl>
          {items.map((item, i) => (
            <NavbarItem key={item.id} onMouseEnter={dropdownRef => onMouseEnter(i, dropdownRef)}>
              {item}
            </NavbarItem>
          ))}
        </NavbarEl>
      </nav>
    )
  }
}

export default Navbar
