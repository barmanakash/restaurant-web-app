import React, { useState } from 'react';
import dishes from './data';
import Plate from './Plate';
import './App.css';

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [tab, setTab] = useState('overview');
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [votes, setVotes] = useState({}); // { [dishId]: 'up' | 'down' }
  const [playing, setPlaying] = useState(false);

  const dish = dishes[activeIndex];
  const vote = votes[dish.id];
  const likeCount = dish.likes + (vote === 'up' ? 1 : 0);

  const goTo = (index) => {
    const next = (index + dishes.length) % dishes.length;
    setActiveIndex(next);
    setPlaying(false);
  };

  const handleVote = (type) => {
    setVotes((prev) => ({
      ...prev,
      [dish.id]: prev[dish.id] === type ? undefined : type,
    }));
  };

  return (
    <div className="page">
      <div className="scene">
        <div className="scene__fridge" aria-hidden="true" />
        <div className="scene__blob" aria-hidden="true" style={{ background: dish.accent }} />
        <div className="scene__lamp" aria-hidden="true">
          <span className="scene__lamp-cord" />
          <span className="scene__lamp-shade" />
        </div>

        <div className="scene__inner">
        <header className="topbar">
          <button className="icon-btn" aria-label="Go back">
            <ArrowLeftIcon />
          </button>

          <div className="topbar__right">
            <div className={`search ${searchOpen ? 'search--open' : ''}`}>
              {searchOpen && (
                <input
                  autoFocus
                  className="search__input"
                  placeholder="Search a dish…"
                  onBlur={() => setSearchOpen(false)}
                />
              )}
              <button
                className="icon-btn"
                aria-label="Search"
                onClick={() => setSearchOpen((v) => !v)}
              >
                <SearchIcon />
              </button>
            </div>
            <button
              className="icon-btn"
              aria-label="Open menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <MenuIcon />
            </button>
          </div>

          {menuOpen && (
            <nav className="dropdown">
              {['Home', 'Menu', 'Chefs', 'Reservations', 'Contact'].map((item) => (
                <a key={item} href="#!" className="dropdown__item">
                  {item}
                </a>
              ))}
            </nav>
          )}
        </header>

        <div className="raildots" aria-hidden="true">
          {dishes.map((d, i) => (
            <span
              key={d.id}
              className={i === activeIndex ? 'raildots__dot raildots__dot--active' : 'raildots__dot'}
            />
          ))}
        </div>

        <main className="hero">
          <div className="hero__plate">
            <Plate dish={dish} />
          </div>

          <div className="hero__info">
            <p className="hero__rank">{dish.rank}</p>
            <h1 className="hero__title">
              <span className="hero__title-light">{dish.titleLight}</span>
              <span className="hero__title-bold">{dish.titleBold}</span>
            </h1>
            <div className="hero__actions">
              <button className="link-btn" onClick={() => setPlaying((v) => !v)}>
                <PlayIcon spinning={playing} />
                {playing ? 'Playing…' : 'Play video'}
              </button>
              <button className="link-btn">
                <PlateIcon />
                Order food
              </button>
            </div>
          </div>

          <aside className="card">
            <div className="card__tabs">
              <button
                className={tab === 'overview' ? 'card__tab card__tab--active' : 'card__tab'}
                onClick={() => setTab('overview')}
              >
                Overview
              </button>
              <button
                className={tab === 'ingredients' ? 'card__tab card__tab--active' : 'card__tab'}
                onClick={() => setTab('ingredients')}
              >
                Ingredients
              </button>
            </div>

            {tab === 'overview' ? (
              <>
                <div className="card__rating" style={{ background: dish.accent }}>
                  <span className="card__rating-num">{dish.rating}</span>
                  <StarIcon />
                </div>
                <h2 className="card__chef">{dish.chef}</h2>
                <p className="card__place">{dish.place}</p>
                <p className="card__quote">{dish.quote}</p>
                <div className="card__votes">
                  <button
                    className={vote === 'up' ? 'vote-btn vote-btn--active' : 'vote-btn'}
                    onClick={() => handleVote('up')}
                    aria-label="Like"
                  >
                    <ThumbUpIcon />
                  </button>
                  <button
                    className={vote === 'down' ? 'vote-btn vote-btn--active' : 'vote-btn'}
                    onClick={() => handleVote('down')}
                    aria-label="Dislike"
                  >
                    <ThumbDownIcon />
                  </button>
                  <span className="card__likes">{likeCount} likes</span>
                </div>
              </>
            ) : (
              <ul className="card__ingredients">
                {dish.ingredients.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}

            <span className="card__plant" aria-hidden="true">
              <PlantIcon />
            </span>
          </aside>
        </main>

        <button className="expand-btn" aria-label="Expand">
          <ExpandIcon />
        </button>

        <footer className="carousel">
          <button className="carousel__arrow" onClick={() => goTo(activeIndex - 1)} aria-label="Previous dish">
            <ChevronIcon direction="left" />
          </button>

          <ul className="carousel__list">
            {dishes.map((d, i) => (
              <li key={d.id}>
                <button
                  className={i === activeIndex ? 'thumb thumb--active' : 'thumb'}
                  onClick={() => goTo(i)}
                >
                  <span className="thumb__circle">
                    <Plate dish={d} />
                  </span>
                  <span className="thumb__label">{d.thumbLabel}</span>
                </button>
              </li>
            ))}
          </ul>

          <button className="carousel__arrow" onClick={() => goTo(activeIndex + 1)} aria-label="Next dish">
            <ChevronIcon direction="right" />
          </button>
        </footer>
        </div>
      </div>
    </div>
  );
}

/* ---------- inline icons (no external assets) ---------- */

function ArrowLeftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function PlayIcon({ spinning }) {
  return (
    <svg className={spinning ? 'spin' : ''} width="14" height="14" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10 8L16 12L10 16V8Z" fill="currentColor" />
    </svg>
  );
}

function PlateIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L14.6 8.6L21.8 9.2L16.3 13.9L18 21L12 17.3L6 21L7.7 13.9L2.2 9.2L9.4 8.6L12 2Z" />
    </svg>
  );
}

function ThumbUpIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M7 10V21H4V10H7ZM7 10L11 3C12.1046 3 13 3.89543 13 5V9H18.5C19.6 9 20.4 10.03 20.14 11.1L18.64 17.6C18.39 18.65 17.45 19.4 16.37 19.4H10C8.34 19.4 7 18.06 7 16.4V10Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ThumbDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M17 14V3H20V14H17ZM17 14L13 21C11.9 21 11 20.1 11 19V15H5.5C4.4 15 3.6 13.97 3.86 12.9L5.36 6.4C5.61 5.35 6.55 4.6 7.63 4.6H14C15.66 4.6 17 5.94 17 7.6V14Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronIcon({ direction }) {
  const rotate = direction === 'left' ? 'rotate(180deg)' : 'none';
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ transform: rotate }}>
      <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M9 3H3V9M15 3H21V9M9 21H3V15M15 21H21V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlantIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <rect x="8" y="16" width="8" height="6" rx="1" fill="#e8e3d8" stroke="#c9c2b2" />
      <path d="M12 16C12 12 8 11 8 7C11 7 12 11 12 13C12 11 13 7 16 7C16 11 12 12 12 16Z" fill="#7a9b5e" />
    </svg>
  );
}

export default App;
