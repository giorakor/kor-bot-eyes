const px = val => `${val}px`;

const createEyeStyle = pos => `
  left: ${px(pos.x)};
  top: ${px(pos.y)};
`;

const createPupilStyle = (pos, squint, elevation, randomMove={ x: 0, y: 0 }) => `
  left: ${px(pos.x + randomMove.x + squint)};
  top: ${px(pos.y + randomMove.y - elevation)};
`

const createControlsText = (cAX, cAY, cBX, cBY) =>
  `C ${cAX} ${cAY} , ${cBX} ${cBY}`

const createLIdSvgTransform = (isRight, eyeWidth) =>
  isRight ? `scale(-1, 1) translate(${-eyeWidth}, 0)` : "";

const createLidSvg = (startingX, startingY, controls, eyeWidth, eyeHeight, transform) => `
  <svg style="z-index: 100;" class="spline absolute blur" width=${eyeWidth} height=${eyeHeight}>
    <path
      d="
        M ${startingX} ${0}
        H ${eyeWidth}
        V ${startingY}
        ${createControlsText(
          eyeWidth*controls[0], eyeHeight*controls[1],
          eyeWidth*controls[2], eyeHeight*controls[3]
        )}
        , ${eyeWidth*controls[8]} ${eyeHeight*controls[9]}
        H ${-eyeWidth}"
      transform="${transform}"
      stroke="black"
      fill="black"
    />
    <path
      d="
        M ${startingX} ${eyeHeight}
        H ${eyeWidth}
        V ${startingY}
        ${createControlsText(
          eyeWidth*controls[4], eyeHeight*controls[5],
          eyeWidth*controls[6], eyeHeight*controls[7]
        )}
        , ${eyeWidth*controls[10]} ${eyeHeight*controls[11]}
        H ${-eyeWidth}"
      transform="${transform}"
    />
  </svg>
`

const createPupilHtml = (pos, squint, elevation, pupilWidth, pupilHeight, pupilImg, randomMove) => {
  const style = createPupilStyle(pos, squint, elevation, randomMove);

  const innerStyle = `
    width: ${- pupilWidth / 2};
    height: ${- pupilHeight / 2};
  `;

  return (`
    <div class="pupil" style="${style}">
      <img
        class="absolute"
        style="${innerStyle}"
        src=${pupilImg}
        width=${pupilWidth}
        height=${pupilHeight}
      />
    </div>
  `);
}
