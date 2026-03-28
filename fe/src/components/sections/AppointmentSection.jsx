import Button from '../shared/Button.jsx'
import SectionHeading from '../shared/SectionHeading.jsx'

function AppointmentSection() {
  return (
    <section className="appointment-section container">
      <div className="appointment-form-wrap">
        <SectionHeading
          eyebrow="Make Appointment"
          title="Book your wellness ritual today"
          centered={false}
        />

        <form className="appointment-form">
          <input type="text" placeholder="Your Name*" />
          <input type="email" placeholder="Email address*" />
          <input type="date" />
          <select defaultValue="">
            <option value="" disabled>
              Choose Barber Services
            </option>
            <option>Skin Glow Treatment</option>
            <option>Hair Styling</option>
            <option>Body Massage</option>
          </select>
          <textarea placeholder="Your message" rows={4} />
          <Button full type="submit">Book Appointment</Button>
        </form>
      </div>

      <aside className="appointment-callout">
        <h3>Phone Appointment</h3>
        <p>Need help choosing your treatment? Call us directly.</p>
        <a href="tel:+001234567890">00 12345 67890</a>
      </aside>
    </section>
  )
}

export default AppointmentSection
