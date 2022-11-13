export const getColorIndex = (product, color) => {
  return product.node.variants.indexOf(
    product.node.variants.filter(variant => variant.color === color)[0]
  )
}
