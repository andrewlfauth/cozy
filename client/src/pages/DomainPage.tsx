import EventCard from '../components/EventCard'
import Layout from '../components/Layout'

interface Props {
  domainName: string
  websiteId: number
  totalPageViewsOverLast30Days: number
  urlPageViewsMap: Map<string, number>
}

function DomainPage({
  domainName,
  websiteId,
  totalPageViewsOverLast30Days,
  urlPageViewsMap,
}: Props) {
  return (
    <Layout title={`${domainName} Tracking Data`}>
      <h1 class="font-semibold text-3xl text-white border-b border-zinc-800 pb-7">
        {domainName}
      </h1>
      <h2 class="text-xl font-medium mt-12">
        Page Views |{' '}
        <span class="text-pink-500">{totalPageViewsOverLast30Days}</span> over
        last 30 days
      </h2>
      <div class="flex flex-wrap gap-10 mt-4 pt-2">
        {Array.from(urlPageViewsMap.keys()).map((url) => (
          <EventCard
            eventTitle={url.split(domainName)[1]}
            eventCount={urlPageViewsMap.get(url) || 0}
            href={`/page-views/${
              websiteId + '/' + url.split(domainName + '/')[1]
            }`}
          />
        ))}
      </div>
    </Layout>
  )
}

export default DomainPage
