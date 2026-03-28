import { counters } from '../../data/homePageData.js'

function StatsSection() {
  return (
    <section className="stats-section">
      <div className="container stats-grid">
        {counters.map(([number, label]) => (
          <article key={number}>
            <h3>{number}</h3>
            <p>{label}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default StatsSection
