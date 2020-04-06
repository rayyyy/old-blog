import PropTypes from "prop-types"
import React from "react"
import styles from "./posts.module.sass"
import PostLink from "../post-link/post-link"

const Posts = ({ posts }) => {
  const Posts = posts.map(post => (
    <div className={styles.post}>
      <PostLink key={post.node.id} post={post.node} />
    </div>
  ))

  return (
    <div>
      {Posts}
    </div>
  )
}

Posts.propTypes = {
  posts: PropTypes.any,
}

Posts.defaultProps = {
  posts: [],
}

export default Posts
