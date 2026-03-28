import { media } from '../../data/homePageData.js'

function BrandLogosSection() {
  return (
    <section className="brand-strip">
      <div className="container">
        <img src={media.brandLogos} alt="Partner brand logos" />
      </div>
    </section>
  )
}

export default BrandLogosSection
