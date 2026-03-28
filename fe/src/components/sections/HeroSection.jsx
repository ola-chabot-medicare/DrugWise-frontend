import Button from '../shared/Button.jsx'
import { media } from '../../data/homePageData.js'

function HeroSection({ children }) {
  return (
    <section
      className="hero-section"
      style={{ backgroundImage: `url(${media.hero})` }}
    >
      <div className="hero-overlay" />
      <div className="container hero-inner">
        {children}
        <div className="hero-content">
          <p className="hero-eyebrow">Chao mung den voi Cleena</p>
          <h1>
            <span>Support for</span> a Calm and Relaxed Mind
          </h1>
          <Button>Get An Appointment</Button>
        </div>

        <div className="hero-arrows" aria-hidden="true">
          <img src={media.leftArrow} alt="" />
          <img src={media.rightArrow} alt="" />
        </div>
      </div>
    </section>
  )
}

export default HeroSection
