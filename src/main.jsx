import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
const root = document.getElementById('root')
// Old links like /#/meet-ai now live at /meet-ai
if (location.hash.startsWith('#/')) location.replace(location.hash.slice(1))
else if (root.hasChildNodes()) hydrateRoot(root, <App />)
else createRoot(root).render(<App />)
