import { useState, useEffect, useRef } from 'react';
import UserCard from './UserCard';
import './styles.css';

export default function App() {
  const [users, setUsers]     = useState([]);
  const [search, setSearch]   = useState('');
  const [sortBy, setSortBy]   = useState('name');
  const [company, setCompany] = useState('All Companies');
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => { setUsers(data); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, []);

  useEffect(() => {
    const onKeyDown = event => {
      const isTypingInInput = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName);

      if (event.key === '/' && !isTypingInInput) {
        event.preventDefault();
        searchInputRef.current?.focus();
      }

      if (event.key === 'Escape' && document.activeElement === searchInputRef.current) {
        setSearch('');
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const normalizedSearch = search.trim().toLowerCase();
  const companies = ['All Companies', ...new Set(users.map(u => u.company.name))];

  const filtered = users
    .filter(u => {
      const matchesName = u.name.toLowerCase().includes(normalizedSearch);
      const matchesCompany = company === 'All Companies' || u.company.name === company;
      return matchesName && matchesCompany;
    })
    .sort((a, b) => {
      if (sortBy === 'company') {
        return a.company.name.localeCompare(b.company.name);
      }
      if (sortBy === 'city') {
        return a.address.city.localeCompare(b.address.city);
      }
      return a.name.localeCompare(b.name);
    });

  const hasSearch = normalizedSearch.length > 0;
  const hasCompanyFilter = company !== 'All Companies';

  const resetAll = () => {
    setSearch('');
    setSortBy('name');
    setCompany('All Companies');
  };

  return (
    <div className="app-shell">
      <div className="bg-orb orb-one" />
      <div className="bg-orb orb-two" />
      <div className="bg-orb orb-three" />

      <main className="app">
        <section className="hero">
          <div className="hero-topline">
            <p className="eyebrow">Team Navigator</p>
            <span className="live-badge">Live Directory</span>
          </div>
          <h1>User Directory</h1>
          <p className="subtitle">
            Find teammates by name, company, and location through an interface designed for daily use.
          </p>

          <div className="meta-strip">
            <div className="meta-pill">
              <span className="meta-label">Total Users</span>
              <strong>{users.length}</strong>
            </div>
            <div className="meta-pill">
              <span className="meta-label">Results</span>
              <strong>{loading ? '...' : filtered.length}</strong>
            </div>
            <div className="meta-pill">
              <span className="meta-label">Companies</span>
              <strong>{new Set(users.map(u => u.company.name)).size}</strong>
            </div>
          </div>
        </section>

        <section className="control-panel">
          <div className="search-wrap">
            <span className="search-icon" aria-hidden="true">SEARCH</span>
            <input
              ref={searchInputRef}
              className="search"
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <p className="search-hint">Press / to focus search and Esc to clear</p>
          </div>

          <div className="toolbar">
            <label className="sort-field">
              <span>Sort by</span>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                <option value="name">Name</option>
                <option value="company">Company</option>
                <option value="city">City</option>
              </select>
            </label>

            <button
              type="button"
              className="reset-btn"
              onClick={resetAll}
              disabled={!hasSearch && !hasCompanyFilter && sortBy === 'name'}
            >
              Reset
            </button>
          </div>

          <div className="company-filters" role="group" aria-label="Filter by company">
            {companies.map(companyName => (
              <button
                key={companyName}
                type="button"
                className={`filter-chip ${company === companyName ? 'active' : ''}`}
                onClick={() => setCompany(companyName)}
              >
                {companyName}
              </button>
            ))}
          </div>
        </section>

        {loading && <p className="status">Loading users...</p>}
        {error && <p className="status error">Error: {error}</p>}
        {!loading && !error && filtered.length === 0 && (
          <p className="status">No users found for the current filters.</p>
        )}

        {!loading && !error && filtered.length > 0 && (
          <p className="result-count">
            Showing {filtered.length} {filtered.length === 1 ? 'profile' : 'profiles'}
            {hasSearch ? ` for "${search.trim()}"` : ''}
            {hasCompanyFilter ? ` in ${company}` : ''}
          </p>
        )}

        <div className="grid">
          {filtered.map((user, index) => (
            <UserCard key={user.id} user={user} index={index} />
          ))}
        </div>
      </main>
      <footer className="footer-note">Built for speed, clarity, and better team discovery.</footer>
    </div>
  );
}