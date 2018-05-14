import styled from "styled-components"

const LinkList = styled.ul`
  li {
    margin-bottom: 1rem;
  }

  li:last-of-type {
    margin-bottom: 0;
  }

  margin-left: ${props => (props.marginLeft ? props.marginLeft : 0)}
`

export default LinkList
