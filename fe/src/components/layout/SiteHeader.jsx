import { media, navLinks } from '../../data/homePageData.js'

function SiteHeader() {
  return (
    <header className="site-header">
      <a href="#" className="brand" aria-label="Cleena home">
        <img src={media.logoIcon} alt="Cleena icon" className="brand-icon" />
        <img src={media.logoText} alt="Cleena" className="brand-text" />
      </a>

      <nav aria-label="Main navigation" className="site-nav">
        {navLinks.map((item, index) => (
          <a key={item} href="#" className={index === 0 ? 'active' : ''}>
            {item}
          </a>
        ))}
      </nav>
    </header>
  )
}

export default SiteHeader
