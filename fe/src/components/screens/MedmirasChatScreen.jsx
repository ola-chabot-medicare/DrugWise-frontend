import '../../styles/medmiras-chat.css'

const assets = {
  brand: 'https://www.figma.com/api/mcp/asset/7405d467-4756-4422-af57-9ec0112e3f24',
  profile: 'https://www.figma.com/api/mcp/asset/8e0ec660-c0ad-489a-8556-6516e3debf54',
  deco: 'https://www.figma.com/api/mcp/asset/55555b0d-f89f-449e-af50-5f3fcdb1e02a',
  iconMenu: 'https://www.figma.com/api/mcp/asset/b7ab161e-10d8-4007-adeb-612e8579ac42',
  iconMore: 'https://www.figma.com/api/mcp/asset/8af72d80-f512-41c9-a4ef-a47261dda0c1',
  iconMoreCard: 'https://www.figma.com/api/mcp/asset/b79376b2-3cfb-4418-b2d5-91781269f556',
  iconEdit: 'https://www.figma.com/api/mcp/asset/39707210-e092-42a6-a56a-0b196c2848f5',
  iconGender: 'https://www.figma.com/api/mcp/asset/e008f42b-3335-438b-bca8-7fd0ff35a7ce',
  iconRole: 'https://www.figma.com/api/mcp/asset/f21f39f3-7a06-4e60-adb2-df16fd7240c7',
  iconCall: 'https://www.figma.com/api/mcp/asset/8513ed9a-47ab-46cb-a197-f1f1783d555f',
  iconMail: 'https://www.figma.com/api/mcp/asset/053333b0-e65a-42c5-8c36-a65501cfbf86',
  iconAge: 'https://www.figma.com/api/mcp/asset/5e3ae623-e9d2-4f95-9f25-94ce82a1b932',
  iconLocation: 'https://www.figma.com/api/mcp/asset/fcabc3ca-3ecc-42eb-9e0a-a96049563f85',
  iconSearch: 'https://www.figma.com/api/mcp/asset/1e19bc0a-3baa-46f0-bc45-6ce7b70cef19',
  iconAdd: 'https://www.figma.com/api/mcp/asset/5fa24885-6c67-4ee3-846a-b2607124bdc4',
  iconAttach: 'https://www.figma.com/api/mcp/asset/454acc00-4f71-453c-9665-0e6f71f7a336',
  iconImage: 'https://www.figma.com/api/mcp/asset/572f3794-410e-4a7a-99d7-bfad608e161e',
  iconMic: 'https://www.figma.com/api/mcp/asset/180bf4bf-b93f-4741-9f43-e7d21e8d226f',
  iconSend: 'https://www.figma.com/api/mcp/asset/006c7c96-1584-43fd-a064-624498f10d4a',
}

const suggestions = [
  'What can I ask you to do?',
  'Which one of my projects is performing the best?',
  'What projects should I be concerned about right now?',
]

const recentItems = [
  'What can I ask you to do?',
  'What projects should I be concerned about right now?',
  'Which one of my projects is performing the best?',
  'What projects should I be concerned about right now?',
  'What can I ask you to do?',
  'What projects should I be concerned about right now?',
  'Which one of my projects is performing the best?',
]

const dailyReminders = [
  "It's time for your Amlodipine 5mg dose. (7:00 AM).",
  "It's time for your Amlodipine 5mg dose. (7:00 AM).",
  "It's time for your Amlodipine 5mg dose. (7:00 AM).",
  "It's time for your Amlodipine 5mg dose. (7:00 AM).",
]

const drugReminders = [
  {
    tone: 'good',
    text: "It's time for your Amlodipine 5mg dose. (7:00 AM).",
  },
  {
    tone: 'warn',
    text: 'Your Glucophage supply will run out on October 5, 2025. Please schedule a refill or appointment soon.',
  },
  {
    tone: 'alert',
    text: 'Moderate interaction found between Glucophage and Ibuprofen. Proceed with caution and consult your doctor about close monitoring.',
  },
]

function InfoRow({ icon, text, bold }) {
  return (
    <div className="profile-row">
      <img src={icon} alt="" aria-hidden="true" />
      <span className={bold ? 'is-bold' : ''}>{text}</span>
    </div>
  )
}

function ProfileCard() {
  return (
    <article className="profile-card">
      <div className="profile-image-wrap">
        <img className="profile-image" src={assets.profile} alt="Sophie Bennett" />
        <button type="button" className="icon-btn icon-more-card" aria-label="More profile actions">
          <img src={assets.iconMoreCard} alt="" aria-hidden="true" />
        </button>
      </div>
      <div className="profile-meta">
        <h2>Sophie Bennett</h2>
        <div className="profile-grid two-col">
          <InfoRow icon={assets.iconGender} text="Male" />
          <InfoRow icon={assets.iconRole} text="Patient" />
        </div>
        <InfoRow icon={assets.iconCall} text="0969317576" />
        <InfoRow icon={assets.iconMail} text="quanvm@solashi.com" />
        <div className="profile-grid two-col">
          <div className="profile-row">
            <img src={assets.iconAge} alt="" aria-hidden="true" />
            <span>Age:</span>
            <span className="is-bold">22</span>
          </div>
          <InfoRow icon={assets.iconLocation} text="New York" bold />
        </div>
      </div>
    </article>
  )
}

function LeftColumn() {
  return (
    <aside className="left-col">
      <ProfileCard />
      <section className="card reminder-card">
        <h3>Drug management</h3>
        <ul>
          {drugReminders.map((item) => (
            <li key={item.text} className={`tone-${item.tone}`}>
              <span className="status-dot" aria-hidden="true" />
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
        <button type="button" className="add-reminder">
          <img src={assets.iconAdd} alt="" aria-hidden="true" />
          Add reminder
        </button>
      </section>
    </aside>
  )
}

function CenterColumn() {
  return (
    <section className="center-col">
      <label className="search-row" htmlFor="chat-search">
        <input id="chat-search" type="search" placeholder="Search" />
        <img src={assets.iconSearch} alt="" aria-hidden="true" />
      </label>

      <article className="chat-stage">
        <img className="chat-deco" src={assets.deco} alt="" aria-hidden="true" />
        <div className="logo-lockup">
          <img src={assets.brand} alt="Medmiras" />
          <p>Ask our AI anything....</p>
        </div>

        <div className="prompt-area">
          <p>Suggestions on what to ask Our AI</p>
          <div className="suggestion-grid">
            {suggestions.map((item) => (
              <button type="button" key={item} className="suggestion-chip">
                {item}
              </button>
            ))}
          </div>

          <div className="chat-input-shell" role="group" aria-label="Ask Medmiras AI">
            <button type="button" className="icon-btn" aria-label="Attach file">
              <img src={assets.iconAttach} alt="" aria-hidden="true" />
            </button>
            <button type="button" className="icon-btn" aria-label="Insert image">
              <img src={assets.iconImage} alt="" aria-hidden="true" />
            </button>
            <input type="text" placeholder="Ask me anything....." />
            <button type="button" className="icon-btn" aria-label="Voice input">
              <img src={assets.iconMic} alt="" aria-hidden="true" />
            </button>
            <button type="button" className="icon-btn" aria-label="Send message">
              <img src={assets.iconSend} alt="" aria-hidden="true" />
            </button>
          </div>
        </div>
      </article>
    </section>
  )
}

function RightColumn() {
  return (
    <aside className="card right-col">
      <div className="sidebar-head">
        <button type="button" className="new-chat-btn">
          <img src={assets.iconEdit} alt="" aria-hidden="true" />
          New chat
        </button>
        <button type="button" className="icon-btn" aria-label="Open menu">
          <img src={assets.iconMenu} alt="" aria-hidden="true" />
        </button>
      </div>

      <div className="history-block">
        <p className="label">Recently</p>
        <ul>
          {recentItems.map((item, index) => (
            <li key={`${item}-${index}`} className={index === 0 ? 'is-selected' : ''}>
              <span>{item}</span>
              {index === 0 ? <img src={assets.iconMore} alt="" aria-hidden="true" /> : null}
            </li>
          ))}
        </ul>
      </div>

      <div className="history-block">
        <p className="label">Daily Reminder</p>
        <ul className="daily-list">
          {dailyReminders.map((item, index) => (
            <li key={`${item}-${index}`}>
              <span className="status-dot" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

function MedmirasChatScreen() {
  return (
    <main className="medmiras-screen" data-node-id="34:239">
      <div className="chat-shell">
        <LeftColumn />
        <CenterColumn />
        <RightColumn />
      </div>
    </main>
  )
}

export default MedmirasChatScreen
