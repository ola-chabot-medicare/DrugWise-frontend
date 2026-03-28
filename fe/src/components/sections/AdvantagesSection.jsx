import Button from '../shared/Button.jsx'
import SectionHeading from '../shared/SectionHeading.jsx'
import { media } from '../../data/homePageData.js'

function AdvantagesSection() {
  return (
    <section className="advantages-section container">
      <div className="advantages-media">
        <img src={media.advantage} alt="Spa therapy products" />
        <button className="play-badge" aria-label="Play spa video" type="button">
          <span>Play</span>
        </button>
      </div>

      <div>
        <SectionHeading
          eyebrow="Advantages of Spa Therapy"
          title="All-Natural, Purely Organic Products Guaranteed!"
          centered={false}
        />
        <p className="advantages-copy">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy.
        </p>
        <ul className="benefit-list">
          <li>Enhanced Well-Being</li>
          <li>Boosts Skin Glow</li>
          <li>Enhances Sleep Quality</li>
        </ul>
        <Button>Book Treatment</Button>
      </div>
    </section>
  )
}

export default AdvantagesSection
