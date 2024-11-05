export default function Logo(props: { className: string; appearance: 'light' | 'dark' }) {

  const color = props.appearance === 'light' ? '#000' : '#fff';

  // SVG generated using google-font-to-svg-path: https://danmarshall.github.io/google-font-to-svg-path/
  return (
    <svg
      width="283.692"
      height="69.435"
      viewBox="0 0 283.692 69.435"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}>
      <g id="svgGroup" stroke-linecap="round" fill-rule="evenodd" font-size="9pt" stroke="#000" stroke-width="0"
        fill={ color }
      >
        <path
          d="M 71.338 69.434 L 71.338 0.001 L 80.762 0.001 L 103.174 27.393 L 125.586 0.001 L 135.01 0.001 L 135.01
          69.434 L 124.707 69.434 L 124.707 17.53 L 107.471 38.428 L 98.926 38.428 L 81.641 17.53 L 81.641 69.434 L
          71.338 69.434 Z M 148.682 69.434 L 148.682 0.001 L 158.105 0.001 L 180.518 27.393 L 202.93 0.001 L 212.354
          0.001 L 212.354 69.434 L 202.051 69.434 L 202.051 17.53 L 184.814 38.428 L 176.27 38.428 L 158.984 17.53
          L 158.984 69.434 L 148.682 69.434 Z M 0 69.434 L 24.854 0.001 L 37.695 0.001 L 62.549 69.434 L 51.563 69.434
          L 43.994 48.536 L 24.609 48.536 L 28.32 38.282 L 40.283 38.282 L 31.299 13.477 L 10.986 69.434 L 0 69.434 Z M
          226.025 49.903 L 226.025 19.532 A 17.967 17.967 0 0 1 228.833 9.693 Q 231.641 5.274 236.328 2.637 A 20.727
          20.727 0 0 1 246.195 0.007 A 24.45 24.45 0 0 1 246.729 0.001 L 262.988 0.001 A 21.389 21.389 0 0 1 271.149
          1.546 A 20.476 20.476 0 0 1 273.413 2.637 A 20.549 20.549 0 0 1 280.908 9.693 A 18.084 18.084 0 0 1 283.691
          19.532 L 283.691 49.903 A 18.121 18.121 0 0 1 280.908 59.718 Q 278.125 64.161 273.413 66.798 A 20.905 20.905
          0 0 1 263.344 69.432 A 24.556 24.556 0 0 1 262.988 69.434 L 246.729 69.434 A 21.403 21.403 0 0 1 239.046
          68.072 A 20.207 20.207 0 0 1 236.328 66.798 A 20.735 20.735 0 0 1 228.833 59.718 A 18.004 18.004 0 0 1
          226.025 49.903 Z M 236.328 19.483 L 236.328 49.952 A 8.316 8.316 0 0 0 238.988 56.106 A 11.271 11.271 0 0 0
          239.38 56.47 Q 242.432 59.18 246.729 59.18 L 262.988 59.18 A 11.556 11.556 0 0 0 267.004 58.503 A 10.356
          10.356 0 0 0 270.361 56.47 A 9.446 9.446 0 0 0 272.427 53.895 A 8.229 8.229 0 0 0 273.389 49.952 L 273.389
          19.483 A 8.353 8.353 0 0 0 270.728 13.308 A 11.24 11.24 0 0 0 270.361 12.965 Q 267.334 10.255 262.988 10.255
          L 246.729 10.255 A 11.324 11.324 0 0 0 242.458 11.042 A 10.554 10.554 0 0 0 239.38 12.965 A 9.485 9.485 0 0 0
          237.321 15.496 A 8.172 8.172 0 0 0 236.328 19.483 Z"
          vector-effect="non-scaling-stroke"/>
      </g>
    </svg>
  );
}