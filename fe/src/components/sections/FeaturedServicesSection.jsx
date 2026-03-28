import Button from '../shared/Button.jsx'
import SectionHeading from '../shared/SectionHeading.jsx'
import { featuredServices } from '../../data/homePageData.js'

function FeaturedServicesSection() {
  return (
    <section className="featured-services container">
      <SectionHeading eyebrow="Featured Services" title="Wellness & Beauty Hub" />

      <div className="service-card-grid">
        {featuredServices.map((service) => (
          <article className="service-card" key={service.id}>
            <p className="service-id">{service.id}</p>
            <h3>{service.title}</h3>
            <p>{service.text}</p>
            <a href="#">Explore Now</a>
          </article>
        ))}
      </div>

      <div className="section-center-button">
        <Button>More Services</Button>
      </div>
    </section>
  )
}

export default FeaturedServicesSection
