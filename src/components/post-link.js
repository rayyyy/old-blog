import React from "react"
import { Link } from "gatsby"

const PostLink = ({ post }) => (
  <div>
    <Link to={post.fields.path}>
      {post.frontmatter.title} ({post.frontmatter.updated_date}) {post.excerpt}
    </Link>
  </div>
)

export default PostLink