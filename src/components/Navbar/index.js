import React, { Component } from "react"

class NavbarItem extends Component {
  onMouseEnter = () => {
    this.props.onMouseEnter(this.dropdownRef)
  }
  render() {
    const { id, children } = this.props
    return (
      <li onMouseEnter={this.onMouseEnter}>
        <div className="navbarItem">{children}</div>
        <div ref={el => (this.dropdownRef = el)} className="dropdown-container" />
      </li>
    )
  }
}

class Navbar extends Component {
  render() {
    const { items, onMouseEnter, onMouseLeave } = this.props
    return (
      <ul className="navbar" onMouseLeave={onMouseLeave}>
        {items.map((item, i) => (
          <NavbarItem key={item.id} onMouseEnter={dropdownRef => onMouseEnter(i, dropdownRef)}>
            {item.title}
          </NavbarItem>
        ))}
      </ul>
    )
  }
}

export default Navbar
