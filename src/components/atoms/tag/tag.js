import React from "react"
import styles from "./tag.module.sass"

const Tag = ({ name }) => (
  <a href={`/tags/${name}`} className={styles.tag}>
    {name}
  </a>
)

export default Tag