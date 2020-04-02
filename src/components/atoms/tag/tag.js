import React from "react"
import "./tag.sass"

const Tag = ({ text }) => (
  <a className="tag">
    {text}
  </a>
)

export default Tag