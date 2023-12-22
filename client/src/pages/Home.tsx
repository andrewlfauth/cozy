import CopySnip from '../components/CopySnip'
import Layout from '../components/Layout'

function Home() {
  return (
    <Layout title="Home page">
      <form>
        <label htmlFor="trackingDomain">Register a site</label>
        <div class="flex h-fit mt-2">
          <input
            type="text"
            name="trackingDomain"
            class="border border-zinc-700 rounded-l-md bg-zinc-800 block py-0.5 px-2"
          />
          <button
            hx-post="/register"
            hx-target="#response-msg"
            class="bg-pink-500 rounded-r-md border-y border-r border-pink-500 px-4 h-full py-0.5"
          >
            Go
          </button>
        </div>
      </form>
      <div id="response-msg" class="text-sm mt-2"></div>
    </Layout>
  )
}

export default Home
