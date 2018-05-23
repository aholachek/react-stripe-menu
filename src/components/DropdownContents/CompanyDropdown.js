import React from "react"
import styled from "styled-components"
import Icon from "./Icon"
import DropdownSection from "./DropdownSection"
import { Heading, HeadingLink } from "./Heading"
import LinkList from "./LinkList"

const CompanyDropdownEl = styled.div`
  width: 25rem;
`

const CompanyDropdown = () => {
  return (
    <CompanyDropdownEl>
      <DropdownSection>
        <ul>
          <HeadingLink>
            <a href="/">
              <Icon /> About Stripe
            </a>
          </HeadingLink>
          <HeadingLink>
            <a href="/">
              <Icon />Customers
            </a>
          </HeadingLink>
          <HeadingLink>
            <a href="/">
              <Icon />Jobs
            </a>
          </HeadingLink>
          <HeadingLink noMarginBottom>
            <a href="/">
              <Icon />Environment
            </a>
          </HeadingLink>
        </ul>
      </DropdownSection>
      <DropdownSection>
        <div>
          <Heading>
            <Icon />From the Blog
          </Heading>
          <LinkList marginLeft="25px">
            <li>
              <a href="/">Stripe Atlas &rsaquo;</a>
            </li>
            <li>
              <a href="/">Stripe Home &rsaquo;</a>
            </li>
            <li>
              <a href="/">Improved Fraud Detection &rsaquo;</a>
            </li>
          </LinkList>
        </div>
      </DropdownSection>
    </CompanyDropdownEl>
  )
}

export default CompanyDropdown
