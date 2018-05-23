import styled, { keyframes } from "styled-components"

export const TransformOriginTopLeft = styled.div`
  transform-origin: 0 0;
`

const getDropdownRootKeyFrame = ({ animatingOut, direction }) => {
  if (direction && !animatingOut) return null
  return keyframes`
  from {
    transform: ${animatingOut ? "rotateX(0)" : "rotateX(-15deg)"};
    opacity: ${animatingOut ? 1 : 0};
  }
  to {
    transform: ${animatingOut ? "rotateX(-15deg)" : "rotateX(0)"};
    opacity: ${animatingOut ? 0 : 1};
  }
`
}

export const DropdownRoot = TransformOriginTopLeft.extend`
  animation-name: ${getDropdownRootKeyFrame};
  animation-duration: ${props => props.duration || 250}ms;
`

export const Caret = styled.div`
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  border-width: 10px;
  border-style: solid;
  border-color: transparent transparent var(--white);
  top: -20px;
  left: calc(50% - 10px);
  z-index: 1;
`

export const DropdownBackground = styled.div`
  transform-origin: 0 0;
  background-color: var(--white);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 50px 100px rgba(50, 50, 93, 0.1),
    0 15px 35px rgba(50, 50, 93, 0.15), 0 5px 15px rgba(0, 0, 0, 0.1);
`

export const AltBackground = styled.div`
  background-color: var(--grey);
  width: 200%;
  height: 100%;
  position: absolute;
  top: 0;
  left: -50%;
  transform-origin: 0 0;
  z-index: 0;
`

export const ContentsContainer = styled.div`
  position: relative;
`

const getContentsInKeyframe = ({ direction }) => {
  if (!direction) return null
  return keyframes`
 from {
   opacity: 0;
   transform: translateX(${direction === "left" ? "-80px" : "80px"});
 }
 to {
   opacity: 1;
   transform: translateX(0px);
 }
`
}

export const FadeInContents = styled.div`
  animation-name: ${getContentsInKeyframe};
  animation-duration: ${props => props.duration || 250}ms;
`

const getContentsOutKeyframe = ({ direction }) => {
  if (!direction) return null
  return keyframes`
 from {
   opacity: 1;
   transform: translateX(0px);
 }
 to {
   opacity: 0;
   transform: translateX(${direction === "left" ? "140px" : "-140px"});
 }
`
}

export const FadeOutContents = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  animation-name: ${getContentsOutKeyframe};
  animation-duration: ${props => props.duration || 250}ms;
  animation-fill-mode: forwards;
`
