import React from "react"
import "./tag.sass"

const Tag = ({ name }) => (
  <a href="/" className="tag">
    {name}
  </a>
)

export default Tag