import React from "react"
import { graphql } from 'gatsby'
import Posts from "../components/molecules/posts/posts"
import Layout from "../templates/layout/layout"
import SEO from "../components/organisms/seo"

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => (
    <Layout>
      <SEO title="Life Hack Engineer" />
      <h1>記事一覧</h1>
      <Posts posts={edges} />
    </Layout>
)

export default IndexPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___updated_date] }) {
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