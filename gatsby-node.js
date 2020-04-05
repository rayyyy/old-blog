/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === 'MarkdownRemark') {
    const relativeFilePath = createFilePath({
      node,
      getNode,
      basePath: 'src/pages/blog',
    })

    createNodeField({
      node,
      name: 'path',
      value: `/blog${relativeFilePath}`,
    })
  }
}

const path = require(`path`)

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve(`src/templates/blog/blog.js`)

  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___updated_date] }
        limit: 1000
      ) {
        edges {
          node {
            fields {
              path
            }
            frontmatter {
              tags
            }
          }
        }
      }
    }
  `)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // 記事作成
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.path,
      component: blogPostTemplate,
      context: {},
    })
  })

  // タグ一覧ページ
  const tags = result.data.allMarkdownRemark.edges.reduce((tags, edge) => {
    const edgeTags = edge.node.frontmatter.tags
    return edgeTags ? tags.concat(edgeTags) : tags
  }, []).filter((x, i, self) => self.indexOf(x) === i)
  const tagTemplate = path.resolve(`src/templates/tags/tags.js`)
  tags.forEach(tag => {
    createPage({
      path: `/tags/${tag}`,
      component: tagTemplate,
      context: {
        tag,
      },
    })
  })
}
