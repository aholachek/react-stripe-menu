import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const DropdownSectionEl = styled.div`
  padding: var(--spacer);
  position: relative;
`
const DropdownSection = ({ children }) => {
  return <DropdownSectionEl data-dropdown-section>{children}</DropdownSectionEl>
}

export default DropdownSection
