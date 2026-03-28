import { media } from '../../data/homePageData.js'

function TestimonialVideoSection() {
  return (
    <section
      className="video-testimonial"
      style={{ backgroundImage: `url(${media.videoHero})` }}
    >
      <div className="video-overlay" />
      <div className="container video-grid">
        <button className="video-play" type="button" aria-label="Play video">
          Play
        </button>

        <article className="testimonial-card">
          <h3>Satisfied Customers</h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy text
            ever since the 1500s.
          </p>
          <strong>Brooklyn Simmons</strong>
          <div className="testimonial-nav">
            <button type="button">Prev.</button>
            <button type="button">Next</button>
          </div>
        </article>
      </div>
    </section>
  )
}

export default TestimonialVideoSection
