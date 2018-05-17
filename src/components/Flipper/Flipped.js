import React from "react"

export default function Flipped({ children, flipId, ...rest }) {
  const child = React.Children.only(children)
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
  return React.cloneElement(child, props)
}
