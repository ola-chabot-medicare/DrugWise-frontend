import SectionHeading from '../shared/SectionHeading.jsx'
import { blogCards, media } from '../../data/homePageData.js'

function BlogSection() {
  return (
    <section className="blog-section container">
      <SectionHeading eyebrow="Blog" title="Our Latest News" />

      <article className="featured-post">
        <img src={media.blogFeatured} alt="Hair treatment article" />
        <div>
          <h3>Ways to Prolong the Vibrancy of Your Hair Color</h3>
          <p>
            Discover practical daily care tips that keep your color rich,
            luminous, and healthy between salon visits.
          </p>
          <a href="#">Read More</a>
        </div>
      </article>

      <div className="blog-grid">
        {blogCards.map(([image, title]) => (
          <article key={title}>
            <img src={image} alt={title} />
            <h4>{title}</h4>
          </article>
        ))}
      </div>
    </section>
  )
}

export default BlogSection
