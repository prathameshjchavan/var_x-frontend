export const getColorIndex = (product, variant, color) =>
  product.node.variants.indexOf(
    product.node.variants.filter(
      ({ color, style, size }) =>
        color === color && style === variant.style && size === variant.size
    )[0]
  )

export const getStockIndex = (stock, variantId) =>
  stock?.findIndex(item => parseInt(item.id) === variantId)
