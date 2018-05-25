import React from "react"
import { storiesOf } from "@storybook/react"
import styled from "styled-components"

import BasicFLIP from "./BasicFLIP"
import InvertedChildFLIP from "./InvertedChildFLIP"
import ComponentFLIP from "./ComponentFLIP"
import TransformOriginCenterFLIP from "./TransformOriginCenterFLIP"

import "../src/index.css"
import "./styles.css"

const Description = styled.div`
  color: #2b323c;
  background-color: rgba(255, 255, 255, 0.9);
  padding: var(--spacer);
  margin-bottom: 0;
  line-height: 1.6;
  margin-top: 1rem;
  margin-left: 1rem;
  max-width: 90%;

  h1 {
    font-size: 1.1rem;
    margin-top: 0;
    margin-bottom: 0;
  }
  p {
    margin-bottom: 0;
  }
  p:last-of-type {
    margin-bottom: 0;
  }

  code {
    color: var(--dark-blue);
    font-weight: bold;
  }
`

storiesOf("FLIP examples", module)
  .add("Basic FLIP", () => (
    <div>
      <Description>
        <h1>Bad:</h1>
        <p>
          This version applies the transform to the whole container element,
          which warps the children.
        </p>
      </Description>
      <BasicFLIP />
    </div>
  ))
  .add("Inverted Child FLIP", () => (
    <div>
      <Description>
        <h1>Better:</h1>{" "}
        <p>
          This version applies an inverse transform on the inner container to
          neutralize the container transform on the entire element.
        </p>
        <p>
          The caret at the top is still slightly warped since it is
          unnecessarily being scaled with the rest of the outer dropdown
          component.
        </p>
      </Description>
      <InvertedChildFLIP />
    </div>
  ))
  .add("Component FLIP", () => (
    <div>
      <Description>
        <h1>Best:</h1>
        <p>
          This version applies only the necessary scale and translate transforms
          to each component, resulting in a smooth animation.
        </p>
      </Description>
      <ComponentFLIP />
    </div>
  ))

storiesOf("transform-origin example", module).add("default", () => (
  <div>
    <Description>
      <h1>
        Default: <code>transform-origin: center center;</code>
      </h1>
      <p>
        If we don't explicitly apply a <code>transform-origin: 0 0;</code> (the same as
        &nbsp;<code>transform-origin: top left;</code>) to the transforming elements,
        the transforms will originate from the center of each element. You can
        see what that looks like in the below example.
      </p>
    </Description>
    <TransformOriginCenterFLIP />
  </div>
))
