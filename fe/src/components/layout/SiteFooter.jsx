import { media } from '../../data/homePageData.js'

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div>
          <a href="#" className="brand footer-brand" aria-label="Cleena home">
            <img src={media.logoIcon} alt="Cleena icon" className="brand-icon" />
            <img src={media.logoText} alt="Cleena" className="brand-text" />
          </a>
          <p>
            Bringing calm, confidence, and beauty through personalized spa
            rituals.
          </p>
        </div>

        <div className="footer-newsletter">
          <h3>Subscribe our newsletter</h3>
          <form>
            <input type="email" placeholder="Email address" />
            <button type="submit">Subscribe now</button>
          </form>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>2024 Cleena. All rights reserved.</p>
        <div className="footer-links">
          <a href="#">Terms</a>
          <a href="#">Policy</a>
          <a href="#">Contact</a>
          <a href="#">Fb.</a>
          <a href="#">In.</a>
          <a href="#">Tw.</a>
          <a href="#">Be.</a>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
