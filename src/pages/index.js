import React from "react"
import PostLink from "../components/molecules/post-link/post-link"
import Layout from "../templates/layout/layout"

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const Posts = edges
    .filter(edge => !!edge.node.frontmatter.updated_date) // You can filter your posts based on some criteria
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />)
  return (
    <Layout>
      <h1>記事一覧</h1>
      <div>{Posts}</div>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___updated_date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
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