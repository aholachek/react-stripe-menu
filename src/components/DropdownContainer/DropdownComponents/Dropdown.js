import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const DropdownEl = styled.div`
  transform-origin: 0 0;
`

const DropdownInnerEl = styled.div`
  transform-origin: 0 0;
  border-radius: 4px;
  background-color: white;
  overflow: hidden;
  position: relative;
  box-shadow: 0 50px 100px rgba(50, 50, 93, 0.1), 0 15px 35px rgba(50, 50, 93, 0.15),
    0 5px 15px rgba(0, 0, 0, 0.1);
`

const DropdownContentWrapper = styled.div`
  transform-origin: 0 0;
  position: relative;
  z-index: 1;
`
const Dropdown = ({ children }) => {
  return (
    <DropdownEl data-flip="dropdown" data-translate-x>
      <DropdownInnerEl data-flip="dropdown-inner" data-scale-y data-scale-x>
        <DropdownContentWrapper>{children}</DropdownContentWrapper>
      </DropdownInnerEl>
    </DropdownEl>
  )
}

export default Dropdown
