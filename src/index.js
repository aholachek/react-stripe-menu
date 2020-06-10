import React, { Component } from "react"
import ReactDOM from "react-dom"
import AnimatedNavbar from "./AnimatedNavbar"
import DemoControls from "./DemoControls"
import styled from "styled-components"
import "./index.css"
import "normalize.css";

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
  state = { duration: 300 }

  onChange = data => {
    this.setState(data)
  }

  render() {
    return (
      <AppContainer>
        <AnimatedNavbar duration={this.state.duration} />
        <DemoControls
          duration={this.state.duration}
          onChange={this.onChange}
        />
      </AppContainer>
    )
  }
}

ReactDOM.render(<App />, document.querySelector("#root"))
