import React from "react"
import { storiesOf } from "@storybook/react"

import GranularFLIP from "./GranularFLIP"
import SingleFLIP from "./SingleFLIP"

import "../index.css"
import "./styles.css"

const stories = storiesOf("FLIP examples", module)

stories
  .add("Single FLIP", () => <SingleFLIP />)
  .add("Granular FLIP", () => <GranularFLIP />)
