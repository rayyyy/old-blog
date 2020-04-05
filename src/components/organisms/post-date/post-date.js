import React from "react"
import styles from "./post-date.module.sass"

const PostDate = ({ published_date, updated_date }) => (
  <div className={styles.date}>
    投稿日: {published_date} 
    {published_date !== updated_date && <span> 更新日: {updated_date}</span>}
  </div>
)

export default PostDate