// polyfill es6/es7 methods
import "core-js/fn/object/entries"
import "core-js/fn/array/from"
// ponyfill CSS vars
import cssVars from "css-vars-ponyfill"

import React, { Component } from "react"
import ReactDOM from "react-dom"
import AnimatedNavbar from "./AnimatedNavbar"
import DemoControls from "./DemoControls"
import styled from "styled-components"
import "./index.css"

cssVars()

const AppContainer = styled.div`
  background: linear-gradient(150deg, #53f 15%, #05d5ff);
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  > div:first-of-type {
    flex: 1 0 70vh;
  }
`

class App extends Component {
  state = { duration: 250, ease: "easeOutSine" }

  onChange = data => {
    this.setState(data)
  }

  render() {
    return (
      <AppContainer>
        <AnimatedNavbar
          tweenConfig={{
            ease: this.state.ease,
            duration: this.state.duration
          }}
        />
        <DemoControls
          duration={this.state.duration}
          onChange={this.onChange}
          ease={this.state.ease}
        />
      </AppContainer>
    )
  }
}

ReactDOM.render(<App />, document.querySelector("#root"))
