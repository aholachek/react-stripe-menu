import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import Icon from "./Icon"
import DropdownSection from "./DropdownSection"
import { Heading, HeadingLink } from "./Heading"

const ProductsDropdownEl = styled.div`
  width: 500px;
`

const Logo = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  margin-right: 1rem;
  border-radius: 100%;
  opacity: 0.6;
  background-color: ${({ color }) => `var(--${color})`};
`

const SubProductsList = styled.ul`
  li {
    display: flex;
    margin-bottom: 1rem;
  }
  h3 {
    margin-right: 1rem;
    width: 3.2rem;
    display: block;
  }
  a {
    color: var(--dark-grey);
  }
`

const ProductsSection = styled.ul`
  li {
    display: flex;
  }
`

const WorksWithStripe = styled.div`
 border-top: 2px solid var(--white);
  display:flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.8rem;
  padding-top: 1.8rem;
}
h3 {
  margin-bottom: 0;
}
`

const ProductsDropdown = () => {
  return (
    <ProductsDropdownEl>
      <DropdownSection>
          <ProductsSection>
            <li>
              <div>
                <Logo color="blue" />
              </div>
              <div>
                <Heading color="blue">Payments</Heading>
                <p>A complete payments platform engineered for growth</p>
              </div>
            </li>
            <li>
              <div>
                <Logo color="green" />
              </div>
              <div>
                <Heading color="green">Billing</Heading>
                <p>Build and scale your recurring business model</p>
              </div>
            </li>
            <li>
              <div>
                <Logo color="teal" />
              </div>
              <div>
                <Heading color="teal">Connect</Heading>
                <p style={{ marginBottom: 0 }}>Everything platforms need to get sellers paid</p>
              </div>
            </li>
          </ProductsSection>
      </DropdownSection>
      <DropdownSection>
        <SubProductsList>
          <li>
            <Heading noMarginBottom>Sigma</Heading>
            <div>Your business data at your fingertips.</div>
          </li>
          <li>
            <Heading noMarginBottom>Atlas</Heading>
            <div>The best way to start an internet business.</div>
          </li>
          <li>
            <Heading noMarginBottom>Radar</Heading>
            <div>Fight fraud with machine learning.</div>
          </li>
        </SubProductsList>
        <WorksWithStripe>
          <Heading noMarginBottom>
            <a href="#">
              <Icon /> Works with Stripe
            </a>
          </Heading>
        </WorksWithStripe>
      </DropdownSection>
    </ProductsDropdownEl>
  )
}

export default ProductsDropdown
