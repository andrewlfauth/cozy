import EventCard from '../components/EventCard'
import Layout from '../components/Layout'
import Select from '../components/Select'

interface Props {
  domainName: string
  websiteId: number
  daysBack: number
  totalPageViewsOverDaysBack: number
  urlPageViewsMap: Map<string, number>
}

function DomainPage({
  domainName,
  websiteId,
  daysBack,
  totalPageViewsOverDaysBack,
  urlPageViewsMap,
}: Props) {
  const daysBackOptions = [30, 60, 90, 180]

  return (
    <Layout title={`${domainName} Tracking Data`}>
      <h1 class="font-semibold text-3xl text-white border-b border-zinc-800 pb-7">
        {domainName}
      </h1>
      <h2 class="text-xl font-medium mt-12">
        Page Views |{' '}
        <span class="text-pink-500">{totalPageViewsOverDaysBack}</span> over
        last
        <Select
          id="days"
          name="days"
          hx-get={`/domains/${domainName}`}
          hx-trigger="change"
          hx-target="body"
        >
          {daysBackOptions.map((n) => (
            <option
              selected={daysBack == n}
              class="font-medium text-zinc-900"
              value={n}
            >
              {n} days
            </option>
          ))}
        </Select>
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
