import Button from '../shared/Button.jsx'
import SectionHeading from '../shared/SectionHeading.jsx'
import { media, team } from '../../data/homePageData.js'

function ExpertTeamSection() {
  return (
    <section className="team-section container">
      <SectionHeading eyebrow="Expert Team" title="Expertise You Can Trust" />

      <div className="team-grid">
        {team.map(([name, role]) => (
          <article key={name} className="team-card">
            <img src={media.teamMember} alt={name} />
            <h3>{name}</h3>
            <p>{role}</p>
          </article>
        ))}
      </div>

      <div className="section-center-button">
        <Button>All Team Member</Button>
      </div>
    </section>
  )
}

export default ExpertTeamSection
