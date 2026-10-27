import { renderToString } from 'react-dom/server'
import App from './App.jsx'
export { ROUTES, SITE, headHtml } from './seo.js'
export const render = (url) => renderToString(<App url={url} />)
