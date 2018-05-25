import { Children, cloneElement } from "react"
import PropTypes from "prop-types"

const propTypes = {
  children: PropTypes.node.isRequired,
  flipId: PropTypes.string.isRequired,
  inverseFlipId: PropTypes.string,
  translateX: PropTypes.bool,
  translateY: PropTypes.bool,
  scaleX: PropTypes.bool,
  scaleY: PropTypes.bool
}

function Flipped({ children, flipId, ...rest }) {
  const child = Children.only(children)
  // turn props into DOM data attributes
  const props = Object.entries(rest)
    .map(r => [
      r[0]
        .replace("translate", "data-translate-")
        .replace("scale", "data-scale-")
        .replace("inverseFlipId", "data-inverse-flip-id")
        .toLowerCase(),
      r[1]
    ])
    .reduce((acc, curr) => ({ ...acc, [curr[0]]: curr[1] }), {})

  if (flipId) props["data-flip"] = flipId
  return cloneElement(child, props)
}

Flipped.propTypes = propTypes

export default Flipped
