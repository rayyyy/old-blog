import React from "react"
import "./post-date.sass"

const PostDate = ({ published_date, updated_date }) => (
  <div className="post-date">
    投稿日: {published_date} 
    {published_date !== updated_date && <span> 更新日: {updated_date}</span>}
  </div>
)

export default PostDate