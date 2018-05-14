import React, { Component } from "react"
import ReactDOM from "react-dom"
import { easing } from "popmotion"
import AnimatedNavbar from "./components/AnimatedNavbar"
import DevControls from "./components/DevControls"
import styled from "styled-components"
import "./index.css"

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  > div:first-of-type {
    flex: 1 0 auto;
  }
`

class App extends Component {
  state = { duration: 300, ease: "easeOut" }

  onChange = data => {
    this.setState(data)
  }

  render() {
    return (
      <AppContainer>
                <AnimatedNavbar
          tweenConfig={{ ease: easing[this.state.ease], duration: this.state.duration }}
        />
        <DevControls
          duration={this.state.duration}
          onChange={this.onChange}
          ease={this.state.ease}
        />
      </AppContainer>
    )
  }
}

ReactDOM.render(<App />, document.querySelector("#root"))
