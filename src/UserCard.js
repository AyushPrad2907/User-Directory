export default function UserCard({ user, index = 0 }) {
  const initials = user.name
    .split(' ')
    .map(chunk => chunk[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const fullAddress = `${user.address.street}, ${user.address.suite}, ${user.address.city} ${user.address.zipcode}`;
  const mapUrl = `https://www.google.com/maps?q=${user.address.geo.lat},${user.address.geo.lng}`;

  return (
    <article className="card" style={{ animationDelay: `${index * 70}ms` }}>
      <div className="card-header">
        <div className="avatar" aria-hidden="true">{initials}</div>
        <div className="card-title-wrap">
          <h2 className="card-name">{user.name}</h2>
          <p className="card-username">@{user.username}</p>
        </div>
        <span className="user-id-pill">#{user.id}</span>
      </div>

      <hr className="divider" />

      <div className="card-row-group">
        <p className="card-row">
          <span className="card-row-label">Email</span>
          <a href={`mailto:${user.email}`} className="card-link">{user.email}</a>
        </p>
        <p className="card-row">
          <span className="card-row-label">Phone</span>
          <span>{user.phone}</span>
        </p>
        <p className="card-row">
          <span className="card-row-label">Address</span>
          <span>{fullAddress}</span>
        </p>
        <p className="card-row">
          <span className="card-row-label">Website</span>
          <a href={`https://${user.website}`} target="_blank" rel="noreferrer" className="card-link">
            {user.website}
          </a>
        </p>
      </div>

      <div className="card-actions">
        <a href={mapUrl} target="_blank" rel="noreferrer" className="map-link">View on map</a>
      </div>

      <details className="company-insight">
        <summary>Company insight</summary>
        <p className="insight-quote">{user.company.catchPhrase}</p>
        <p className="insight-bs">{user.company.bs}</p>
      </details>

      <span className="company-tag">{user.company.name}</span>
    </article>
  );
}