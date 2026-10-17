function NavBar() {
  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="COMICFELLOWS home">
        COMICFELLOWS<span aria-hidden="true">✳</span>
      </a>
      <nav className="navbar" aria-label="Main navigation">
        <a href="#home">Home</a>
        <a href="#comics">Comics</a>
        <a href="#creators">Creators</a>
        <a href="#about">About</a>
      </nav>
      <a className="nav-cta" href="#comics">
        Explore stories <span aria-hidden="true">↗</span>
      </a>
    </header>
  )
}

export default NavBar;
