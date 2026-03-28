function Button({ children, variant = 'filled', full = false, type = 'button' }) {
  return (
    <button
      type={type}
      className={`button button-${variant} ${full ? 'is-full' : ''}`.trim()}
    >
      {children}
    </button>
  )
}

export default Button
