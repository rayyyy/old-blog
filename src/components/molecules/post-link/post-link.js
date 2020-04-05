import React from 'react'
import { Link } from 'gatsby'
import styles from './post-link.module.sass'
import Tags from '../tags/tags'

const PostLink = ({ post }) => (
  <div className={styles.card}>
    <Link to={post.fields.path}>
      <div className={styles.header}>
        <div className={styles.title}>
          {post.frontmatter.title}
        </div>
        <div className={styles.date}>
          {post.frontmatter.updated_date}
        </div>
      </div>
      <div className={styles.main}>
        {post.excerpt}
      </div>
    </Link>
    <div className={styles.footer}>
      <div className={styles.title}>
        タグ
        </div>
      <div>
        <Tags tags={post.frontmatter.tags} />
      </div>
    </div>
  </div>
)

export default PostLink