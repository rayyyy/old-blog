import React from 'react'
import { Link } from 'gatsby'
import './post-link.sass'
import Tags from '../tags/tags'

const PostLink = ({ post }) => (
  <div className="card">
    <Link to={post.fields.path}>
      <div className="header">
        <div className="title">
          {post.frontmatter.title}
        </div>
        <div className="date">
          {post.frontmatter.updated_date}
        </div>
      </div>
      <div className="main">
        {post.excerpt}
      </div>
    </Link>
    <div className="footer">
      <div className="title">
        タグ
        </div>
      <div className="tags">
        <Tags tags={post.frontmatter.tags} />
      </div>
    </div>
  </div>
)

export default PostLink