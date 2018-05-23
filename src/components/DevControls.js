import React, { Component } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const Form = styled.form`
  padding: 2.5rem 0;
  background-color: var(--white);

  > div {
    max-width: 900px;
    margin: auto;
    display: flex;
  }

  fieldset {
    border: 0;
    padding: 1rem 0 1rem 0;
    margin-right: 3rem;
  }

  legend {
    font-weight: bold;
    display: inline-block;
  }
  input {
    margin-right: 0.5rem;
  }
  label + label input {
    margin-left: 1.5rem;
  }
`

class DevControls extends Component {
  static propTypes = {
    duration: PropTypes.number,
    ease: PropTypes.string
  }

  render() {
    const { duration, ease } = this.props
    return (
      <Form
        innerRef={el => (this.el = el)}
        onChange={() => {
          this.props.onChange({
            duration: parseInt(this.el.querySelector('input[name="duration"]:checked').value, 10),
            ease: this.el.querySelector('input[name="ease"]:checked').value
          })
        }}
      >
        <div>
          <fieldset key="duration">
            <legend>Duration:</legend>
            {[250, 500, 1800].map(d => {
              return (
                <label key={d}>
                  <input type="radio" name="duration" value={d} checked={duration === d} />
                  {d}&nbsp;ms
                </label>
              )
            })}
          </fieldset>
          <fieldset key="easing">
            <legend>Easing:</legend>
            {["linear", "easeInOut", "backOut"].map(e => {
              return (
                <label key={e}>
                  <input type="radio" name="ease" value={e} checked={ease === e} />
                  {e}
                </label>
              )
            })}
          </fieldset>
        </div>
      </Form>
    )
  }
}

export default DevControls
