import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const Caret = styled.div`
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  border-width: 10px;
  border-style: solid;
  border-color: transparent transparent white;
  top: -20px;
  left: calc(50% - 10px);
  z-index: 1;
`
const DropdownCaret = props => {
  return <Caret data-flip="dropdown-caret" data-translate-x />
}

export default DropdownCaret
