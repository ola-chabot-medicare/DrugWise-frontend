import Button from '../shared/Button.jsx'
import SectionHeading from '../shared/SectionHeading.jsx'
import { media } from '../../data/homePageData.js'

function AboutSection() {
  return (
    <section className="about-section container">
      <SectionHeading
        eyebrow="About Us"
        title="Your Destination for Relaxation and Rejuvenation."
      />

      <p className="about-copy">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry&apos;s standard dummy text
        ever since the 1500s.
      </p>

      <div className="about-collage">
        <img src={media.about1} alt="Spa detail" />
        <img src={media.about2} alt="Spa treatment" />
        <img src={media.about3} alt="Beauty routine" />
        <img src={media.about4} alt="Relaxing treatment" />
        <img src={media.about5} alt="Spa accessory" />
      </div>

      <div className="about-meta">
        <p>Skilled and Certified Professionals</p>
        <p>More Than 20 Operators</p>
        <p>Certified FDA-Approved Materials</p>
      </div>

      <div className="about-actions">
        <Button>More About Us</Button>
        <Button variant="outline">Make A Call</Button>
      </div>
    </section>
  )
}

export default AboutSection
