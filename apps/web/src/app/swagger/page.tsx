'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    SwaggerUIBundle?: any
  }
}

export default function SwaggerPage() {
  useEffect(() => {
    const cssUrl = 'https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.11.0/swagger-ui.css'
    const scriptUrl = 'https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.11.0/swagger-ui-bundle.js'

    const cssLink = document.createElement('link')
    cssLink.rel = 'stylesheet'
    cssLink.href = cssUrl
    document.head.appendChild(cssLink)

    const script = document.createElement('script')
    script.src = scriptUrl
    script.async = true
    script.onload = () => {
      if (window.SwaggerUIBundle) {
        window.SwaggerUIBundle({
          url: '/erp_system/swagger/openapi.json',
          dom_id: '#swagger-ui',
          deepLinking: true,
          presets: [window.SwaggerUIBundle.presets.apis, window.SwaggerUIBundle.presets.standalone],
          layout: 'BaseLayout'
        })
      }
    }
    document.body.appendChild(script)

    return () => {
      document.head.querySelector(`link[href="${cssUrl}"]`)?.remove()
      document.body.querySelector(`script[src="${scriptUrl}"]`)?.remove()
    }
  }, [])

  return (
    <main style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 20px 64px' }}>
      <div style={{ marginBottom: 18 }}>
        <h1 style={{ margin: 0, fontSize: 32 }}>ERP API Swagger</h1>
      </div>
      <div id="swagger-ui" style={{ minHeight: 720 }} />
    </main>
  )
}
