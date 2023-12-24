interface Props {
  eventTitle: string
  eventCount: number
  href?: string
}

function EventCard({ eventTitle, eventCount, href }: Props) {
  return href ? (
    <a href={href} class="flex border-2 rounded-md group hover:border-pink-500">
      <p class="text-lg px-6 py-3 group-hover:text-pink-500 font-mono">
        {eventTitle}
      </p>
      <div class="w-16 bg-gray-300 border-2 text-zinc-900 flex items-center justify-center text-3xl font-medium group-hover:bg-pink-500 group-hover:border-pink-500">
        {eventCount}
      </div>
    </a>
  ) : (
    <div class="flex border-2 rounded-md">
      <p class="text-lg px-6 py-4">{eventTitle}</p>
      <div class="w-16 bg-gray-300 border-2 text-zinc-900 flex items-center justify-center text-3xl font-medium">
        {eventCount}
      </div>
    </div>
  )
}

export default EventCard
