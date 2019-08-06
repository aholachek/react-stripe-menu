import { css } from "styled-components"

// if applied to a persistent component, make sure to remove when animation is not imminent
// to prevent taking up too many browser resources with `will-change`
export const promoteLayer = css`
  will-change: transform;
`
