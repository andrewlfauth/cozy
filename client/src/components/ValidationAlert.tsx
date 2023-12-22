interface Props {
  children?: Node
  text: string
  variant: 'success' | 'danger'
}

function ValidationAlert({ children, text, variant }: Props) {
  return (
    <div>
      <p class={`${variant == 'success' ? 'text-green-500' : 'text-red-500'}`}>
        {text}
      </p>
      {children && children}
    </div>
  )
}

export default ValidationAlert
