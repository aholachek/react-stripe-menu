import React, { Component } from "react"
import ReactDOM from "react-dom"
import { easing } from "popmotion"
import AnimatedNavbar from "./AnimatedNavbar"
import DemoControls from "./DemoControls"
import styled from "styled-components"
import "./index.css"

const AppContainer = styled.div`
  background: linear-gradient(150deg,#53f 15%,#05d5ff);
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  > div:first-of-type {
    flex: 1 0 auto;
  }
`

class App extends Component {
  state = { duration: 250, ease: "easeOut" }

  onChange = data => {
    this.setState(data)
  }

  componentDidMount() {
    const hasDurationQuery = /duration=\d+/.test(window.location.search)
    if (hasDurationQuery) {
      this.setState({
        duration: parseInt(window.location.search.match(/duration=(\d+)/)[1], 10)
      })
    }
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
