import React from "react";
const Next = (props) => {
  let elem;
  if (props.type === "prev") {
    elem = (
      <g>
        <g>
          <polygon style={{ "fill": "#181818" }} points="22,29 44,44 44,29.273 44,14 	" />
          <path style={{ "fill": "#181818" }} d="M44,45c-0.197,0-0.394-0.059-0.563-0.174l-22-15C21.164,29.64,21,29.331,21,29
           s0.164-0.64,0.437-0.826l22-15c0.308-0.208,0.705-0.231,1.031-0.058C44.795,13.289,45,13.629,45,14v30
           c0,0.371-0.205,0.711-0.533,0.884C44.321,44.962,44.16,45,44,45z M23.775,29L43,42.107V15.893L23.775,29z"/>
        </g>
        <g>
          <rect x="13" y="14" style={{ "fill": "#181818" }} width="5" height="30" />
          <path style={{ "fill": "#181818" }} d="M19,45h-7V13h7V45z M14,43h3V15h-3V43z" />
        </g>
      </g>
    )
  }
  if (props.type === "next") {
    elem = (
      <g>
        <g>
          <polygon style={{ "fill": "#181818" }} points="36,29 14,44 14,29.273 14,14" />
          <path style={{ "fill": "#181818" }} d="M14,45c-0.16,0-0.321-0.038-0.467-0.116C13.205,44.711,13,44.371,13,44V14
       c0-0.371,0.205-0.711,0.533-0.884c0.327-0.174,0.724-0.15,1.031,0.058l22,15C36.836,28.36,37,28.669,37,29s-0.164,0.64-0.437,0.826
       l-22,15C14.394,44.941,14.197,45,14,45z M15,15.893v26.215L34.225,29L15,15.893z"/>
        </g>
        <g>
          <rect x="40" y="14" style={{ "fill": "#181818" }} width="5" height="30" />
          <path style={{ "fill": "#181818" }} d="M46,45h-7V13h7V45z M41,43h3V15h-3V43z" />
        </g>
      </g>
    )
  }
  return (
    <svg x="0px" y="0px" onClick={e => props.click(props.val)}
      viewBox="0 0 58 58" style={{ "enableBackground": "new 0 0 58 58" }} width="28" height="28">
      <circle style={{ "fill": "#1db954" }} cx="29" cy="29" r="29" />
      {elem}
    </svg>
  )
}
export default Next;