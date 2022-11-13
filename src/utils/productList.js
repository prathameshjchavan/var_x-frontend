export const getColorIndex = (product, variant, color) => {
  return product.node.variants.indexOf(
    product.node.variants.filter(
      item => item.color === color && item.style === variant.style
    )[0]
  )
}
