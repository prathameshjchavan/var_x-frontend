/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

import RootWrapper from "./src/components/ui/root-wrapper"

const onRenderBody = ({ setHtmlAttributes }) => {
  setHtmlAttributes({ lang: `en` })
}
const wrapRootElement = RootWrapper

export { onRenderBody, wrapRootElement }
