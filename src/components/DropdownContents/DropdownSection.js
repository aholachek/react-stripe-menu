import React from "react"
import styled from "styled-components"

const DropdownSectionEl = styled.div`
  padding: var(--spacer);
  position: relative;
  z-index:1;
`
// the data-* attribute helps select this element later to measure the height
const DropdownSection = ({ children }) => {
  return <DropdownSectionEl data-dropdown-section>{children}</DropdownSectionEl>
}

export default DropdownSection
