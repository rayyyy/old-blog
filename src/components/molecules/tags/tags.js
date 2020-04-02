import React from "react"
import "./tags.sass"
import Tag from "../../atoms/tag/tag"

const Tags = ({ tags }) => tags.map((tag, index) => <Tag key={index} name={tag} className="tag" /> )

export default Tags