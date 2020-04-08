import React from "react"
import Posts from "../../components/molecules/posts/posts"
import Layout from "../../templates/layout/layout"
import { graphql } from 'gatsby'

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
  pageContext: {tag}
}) => (
  <Layout>
    <h1>{tag}タグの記事一覧</h1>
    <Posts posts={edges} />
  </Layout>
)

export default IndexPage

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___updated_date] },
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 115, truncate: true)
          frontmatter {
            updated_date(formatString: "YYYY-MM-DD")
            title
            tags
          }
          fields {
            path
          }
        }
      }
    }
  }
`
