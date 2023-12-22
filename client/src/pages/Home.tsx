import Layout from '../components/Layout'

interface Props {
  trackedDomains?: string[]
  errorMessage?: string
}

function Home({ trackedDomains }: Props) {
  return (
    <Layout title="Home page">
      <form class="h-[240px]">
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
        <div id="response-msg" class="text-sm mt-2"></div>
      </form>

      <h1 class="text-3xl font-semibold mb-10">Currently tracking</h1>
      {trackedDomains ? (
        <div class="flex flex-wrap gap-8">
          {trackedDomains.map((domain) => (
            <a
              href={`/domains?name=${domain}`}
              hx-boost="true"
              class="text-xl font-semibold rounded-md border-2 border-zinc-500 py-6 px-10 w-fit cursor-pointer hover:border-pink-500"
            >
              {domain}
            </a>
          ))}
        </div>
      ) : (
        <p class="text-red-500">Could not load tracking data...</p>
      )}
    </Layout>
  )
}

export default Home
