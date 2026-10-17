
function WriterCard({ creator }) {
  return (
    <article className="creator-card">
      <div className={`creator-avatar ${creator.color}`} aria-hidden="true">
        {creator.initials}
      </div>
      <div>
        <p className="creator-role">{creator.role}</p>
        <h3>{creator.name}</h3>
        <p className="creator-bio">{creator.bio}</p>
      </div>
    </article>
  )
}

export default WriterCard
