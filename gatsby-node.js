exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      products: allStrapiProduct {
        edges {
          node {
            name
            strapi_id
            category {
              name
            }
          }
        }
      }
      categories: allStrapiCategory {
        edges {
          node {
            strapi_id
            name
            description
          }
        }
      }
    }
  `)

  if (result.errors) {
    throw result.errors
  }

  const products = result.data.products.edges
  const categories = result.data.categories.edges

  products.forEach(product => {
    createPage({
      path: `/${product.node.category.name.toLowerCase()}/${
        product.node.name.split(" ")[0]
      }`,
      component: require.resolve("./src/templates/ProductDetail.jsx"),
      context: {
        name: product.node.name,
        id: product.node.strapi_id,
        category: product.node.category.name,
      },
    })
  })

  categories.forEach(category => {
    createPage({
      path: `/${category.node.name.toLowerCase()}`,
      component: require.resolve("./src/templates/ProductList.jsx"),
      context: {
        name: category.node.name,
        description: category.node.description,
        id: category.node.strapi_id,
      },
    })
  })
}
