import Layout from '../components/Layout'

function ErrorPage({ errorMsg }: { errorMsg: string }) {
  return (
    <Layout title="Bummer">
      <p class="text-red-500 mb-10">{errorMsg}</p>
      <a href="/" hx-boost="true" class="text-lg font-medium">
        Back to Home
      </a>
    </Layout>
  )
}

export default ErrorPage
