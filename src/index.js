import React, { Component } from "react"
import ReactDOM from "react-dom"
import { easing } from "popmotion"
import AnimatedNavbar from "./AnimatedNavbar"
import DemoControls from "./DemoControls"
import styled from "styled-components"
import "./index.css"

const AppContainer = styled.div`
  background: linear-gradient(15deg, var(--dark-blue), var(--gradient-right));
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  > div:first-of-type {
    flex: 1 0 auto;
  }
`

class App extends Component {
  state = { duration: 250, ease: "easeInOut" }

  onChange = data => {
    this.setState(data)
  }

  render() {
    return (
      <AppContainer>
        <AnimatedNavbar
          tweenConfig={{
            ease: easing[this.state.ease],
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
