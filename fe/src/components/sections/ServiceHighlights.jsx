import { quickServices } from '../../data/homePageData.js'

function ServiceHighlights() {
  return (
    <section className="quick-services container" aria-label="Quick services">
      {quickServices.map((item, index) => (
        <article className="quick-service" key={item.title}>
          <img src={item.icon} alt="" aria-hidden="true" />
          <div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
          {index < quickServices.length - 1 ? (
            <span className="quick-divider" aria-hidden="true" />
          ) : null}
        </article>
      ))}
    </section>
  )
}

export default ServiceHighlights
