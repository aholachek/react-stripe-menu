import React, { Component } from "react"
import styled from 'styled-components'
import Flipper from "../components/Flipper"
import Flipped from "../components/Flipper/Flipped"
import CompanyDropdown from "../components/DropdownContents/CompanyDropdown"
import DevelopersDropdown from "../components/DropdownContents/DevelopersDropdown"
import {
  DropdownRoot,
  TransformOriginTopLeft,
  Caret,
  DropdownBackground
} from "../components/DropdownContainer/Components"

import '../index.css'

class SingleFLIP extends Component {
  state = { company: true }
  render() {
    const dropdownContents = this.state.company ? (
      <CompanyDropdown />
    ) : (
      <DevelopersDropdown />
    )
    const dropdown = (
      <Flipped flipId="dropdown" translateX translateY scaleX scaleY>
        <DropdownRoot>
          <Caret />
          <DropdownBackground>{dropdownContents}</DropdownBackground>
        </DropdownRoot>
      </Flipped>
    )
    debugger
    return (
      <div>
        <div>
          <button
            onClick={() => {
              this.setState({ company: !this.state.company })
            }}
          >
            animate
          </button>
        </div>
        <div>
          <Flipper flipKey={this.state.company}>
            <div>
              <div>{this.state.company && dropdown}</div>
              <div>{!this.state.company && dropdown}</div>
            </div>
          </Flipper>
        </div>
      </div>
    )
  }
}

export default SingleFLIP
