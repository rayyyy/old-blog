import React from "react"
import styles from "./tags.module.sass"
import Tag from "../../atoms/tag/tag"

const Tags = ({ tags }) => tags.map((tag, index) => {
  return (
    <span key={index} className={styles.tag}>
      <Tag name={tag} />
    </span>
  )
})

export default Tags