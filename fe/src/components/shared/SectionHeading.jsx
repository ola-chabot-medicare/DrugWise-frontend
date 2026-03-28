function SectionHeading({ eyebrow, title, centered = true }) {
  return (
    <header className={`section-heading ${centered ? 'is-centered' : ''}`}>
      <p className="section-eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <span className="section-rule" aria-hidden="true" />
    </header>
  )
}

export default SectionHeading
