import React, { Component } from "react"
import styled from "styled-components"

const NavbarItemButton = styled.div`
  font-weight: bold;
  font-size: 18px;
  padding: 2rem;
  color: white;
  display: flex;
  justify-content: center;
  cursor: pointer;
`

const NavbarItemEl = styled.li`
  flex: 1;
  position: relative;
  margin-left: 0.5rem;
  &::first-of-type {
    margin-left: 0;
  }
`

const DropdownSlot = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  perspective: 1000px;
`

export default class NavbarItem extends Component {
  onMouseEnter = () => {
    this.props.onMouseEnter(this.props.index)
  }

  render() {
    const { title, children } = this.props
    return (
      <NavbarItemEl onMouseEnter={this.onMouseEnter}>
        <NavbarItemButton>{title}</NavbarItemButton>
        <DropdownSlot>{children}</DropdownSlot>
      </NavbarItemEl>
    )
  }
}
