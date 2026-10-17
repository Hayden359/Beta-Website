import { useMemo, useState } from 'react'
import './App.css'
import NavBar from './Components/NavBar'
import ComicChat from './Components/OllamaChat'
import About from './Pages/About'
import ComicsCard from './Pages/ComicsCard'
import Home from './Pages/Home'
import WriterCard from './Pages/WriterCard'
import { comics, creators } from './data/comics'

function App() {
  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState('All genres')

  const genres = useMemo(
    () => ['All genres', ...new Set(comics.flatMap((comic) => comic.genres))],
    [],
  )

  const visibleComics = comics.filter((comic) => {
    const query = search.trim().toLowerCase()
    const matchesSearch =
      !query ||
      [comic.title, comic.creator, comic.description, ...comic.genres]
        .join(' ')
        .toLowerCase()
        .includes(query)
    const matchesGenre = genre === 'All genres' || comic.genres.includes(genre)

    return matchesSearch && matchesGenre
  })

  return (
    <>
      <NavBar />
      <main>
        <Home />

        <section className="catalog-section section-wrap" id="comics">
          <div className="section-heading">
            <div>
              <p className="eyebrow">THE COLLECTION</p>
              <h2>Find cool comics</h2>
              <p className="section-intro">
              </p>
            </div>
            <span className="collection-count">
              {visibleComics.length} {visibleComics.length === 1 ? 'story' : 'stories'}
            </span>
          </div>

          <div className="catalog-controls">
            <label className="search-field">
              <span className="sr-only">Search comics, creators, or genres</span>
              <span aria-hidden="true">⌕</span>
              <input
                type="search"
                placeholder="Search comics, creators, genres..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>
            <label className="genre-field">
              <span className="sr-only">Filter by genre</span>
              <select value={genre} onChange={(event) => setGenre(event.target.value)}>
                {genres.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
          </div>

          {visibleComics.length > 0 ? (
            <div className="comic-grid">
              {visibleComics.map((comic) => (
                <ComicsCard comic={comic} key={comic.id} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span aria-hidden="true">✦</span>
              <h3>No comics found</h3>
              <p>Try another title, creator, or genre.</p>
              <button
                className="text-button"
                onClick={() => {
                  setSearch('')
                  setGenre('All genres')
                }}
                type="button"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        <section className="creator-section" id="creators">
          <div className="section-wrap">
            <div className="section-heading">
              <div>
                <p className="eyebrow">THE WRITERS OF THE STORIES</p>
                <h2>Meet the Writers</h2>
                <p className="section-intro">
                  Discover the writers and artists.
                </p>
              </div>
            </div>
            <div className="creator-grid">
              {creators.map((creator) => (
                <WriterCard creator={creator} key={creator.name} />
              ))}
            </div>
          </div>
        </section>

        <About />
      </main>
      <footer className="site-footer">
        <a className="footer-brand" href="#home">COMICFELLOWS<span>✳</span></a>
        <p>I hope you enjoy the comics! :D</p>
        <a href="#home">Back to top</a>
      </footer>
      <ComicChat comics={comics} />
    </>
  )
}

export default App
