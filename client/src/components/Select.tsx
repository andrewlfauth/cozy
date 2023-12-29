function Select(props: { name: string; id: string; children: any }) {
  const { name, id, children, ...rest } = props

  return (
    <select
      name={name}
      id={id}
      class="bg-transparent font-medium border-2 rounded ml-2"
      {...rest}
    >
      {children}
    </select>
  )
}

export default Select
