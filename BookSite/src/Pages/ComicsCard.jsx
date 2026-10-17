function ComicsCard({ comic }) {
  return (
    <article className="comic-card">
      <div className={`comic-cover cover-${comic.color}`} aria-hidden="true">
        <span className="cover-year">{comic.year}</span>
        <strong>{comic.mark}</strong>
        <span className="cover-bottom">COMIC COLLECTION</span>
      </div>
      <div className="comic-card-content">
        <div className="comic-card-meta">
          <span>{comic.year}</span>
          <span>{comic.issues}</span>
        </div>
        <h3>{comic.title}</h3>
        <p className="comic-creator">by {comic.creator}</p>
        <p className="comic-description">{comic.description}</p>
        <ul className="genre-list" aria-label={`${comic.title} genres`}>
          {comic.genres.map((genre) => (
            <li key={genre}>{genre}</li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export default ComicsCard