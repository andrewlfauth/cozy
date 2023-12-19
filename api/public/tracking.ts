const currentScript = document.currentScript

if (currentScript && currentScript.hasAttribute('data-domain')) {
  const trackingDomain = currentScript.getAttribute('data-domain')

  window.addEventListener('DOMContentLoaded', (e) => {
    const url = window.location.href

    fetch('http://localhost:8000/cozy-api/page-views', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pageUrl: url,
        trackingDomain,
      }),
    })
  })
} else {
  console.error('Missing data-domain attribute in the script tag.')
}
