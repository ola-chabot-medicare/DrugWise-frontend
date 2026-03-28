import SectionHeading from '../shared/SectionHeading.jsx'
import { pricingRows } from '../../data/homePageData.js'

function PricingSection() {
  return (
    <section className="pricing-section container">
      <SectionHeading eyebrow="Affordable Prices" title="Our Pricing Plan" />

      <div className="pricing-tabs" role="tablist" aria-label="Pricing filters">
        <button type="button" className="is-active">Hair</button>
        <button type="button">Makeup</button>
        <button type="button">Manicure</button>
        <button type="button">Pedicure</button>
        <button type="button">Waxing</button>
      </div>

      <div className="pricing-table">
        {pricingRows.map(([leftName, leftPrice, rightName, rightPrice]) => (
          <div key={leftName} className="pricing-row">
            <div>
              <span>{leftName}</span>
              <strong>{leftPrice}</strong>
            </div>
            <div>
              <span>{rightName}</span>
              <strong>{rightPrice}</strong>
            </div>
          </div>
        ))}
      </div>

      <p className="pricing-note">Opening Hours: 8 AM - 10 PM, every day</p>
    </section>
  )
}

export default PricingSection
