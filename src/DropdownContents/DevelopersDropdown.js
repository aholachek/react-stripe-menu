import React from "react"
import styled from "styled-components"
import {
  Icon,
  DropdownSection,
  Heading,
  HeadingLink,
  LinkList
} from "./Components"

const DevelopersDropdownEl = styled.div`
  width: 25rem;
`

const Flex = styled.div`
  display: flex;
  > div:first-of-type {
    margin-right: 48px;
  }
`

const DevelopersDropdown = () => {
  return (
    <DevelopersDropdownEl>
      <DropdownSection data-first-dropdown-section>
        <div>
          <Heading>Documentation</Heading>
          <p>Start integrating Stripe&rsquo;s products and tools</p>
          <Flex>
            <div>
              <h4>Get Started</h4>
              <LinkList>
                <li>
                  <a href="/">Elements</a>
                </li>
                <li>
                  <a href="/">Checkout</a>
                </li>
                <li>
                  <a href="/">Mobile apps</a>
                </li>
              </LinkList>
            </div>
            <div>
              <h4>Popular Topics</h4>
              <LinkList>
                <li>
                  <a href="/">Apple Pay</a>
                </li>
                <li>
                  <a href="/">Testing</a>
                </li>
                <li>
                  <a href="/">Launch Checklist</a>
                </li>
              </LinkList>
            </div>
          </Flex>
        </div>
      </DropdownSection>
      <DropdownSection>
        <ul>
          <HeadingLink>
            <a href="/">
              <Icon /> Full API Reference
            </a>
          </HeadingLink>
          <HeadingLink>
            <a href="/">
              <Icon /> API Status
            </a>
          </HeadingLink>
          <HeadingLink noMarginBottom>
            <a href="/">
              <Icon /> Open Source
            </a>
          </HeadingLink>
        </ul>
      </DropdownSection>
    </DevelopersDropdownEl>
  )
}

export default DevelopersDropdown
