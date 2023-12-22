function CopySnip({ text }: { text: string }) {
  return (
    <div class="rounded-md bg-zinc-700 px-4 py-2 gap-4 w-fit">
      <p class="font-mono">{text}</p>
    </div>
  )
}

export default CopySnip
