export const getColorIndex = (product, variant, color) =>
  product.node.variants.indexOf(
    product.node.variants.filter(
      item =>
        item.color === color &&
        item.style === variant.style &&
        item.size === variant.size
    )[0]
  )

export const getStockIndex = (stock, variantId) =>
  stock?.findIndex(item => parseInt(item.id) === variantId)
