export default function UserCard({ user, index = 0 }) {
  const initials = user.name
    .split(' ')
    .map(chunk => chunk[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <article className="card" style={{ animationDelay: `${index * 70}ms` }}>
      <div className="card-header">
        <div className="avatar" aria-hidden="true">{initials}</div>
        <div>
          <h2 className="card-name">{user.name}</h2>
          <p className="card-username">@{user.username}</p>
        </div>
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
          <span className="card-row-label">Location</span>
          <span>{user.address.city}</span>
        </p>
        <p className="card-row">
          <span className="card-row-label">Website</span>
          <a href={`https://${user.website}`} target="_blank" rel="noreferrer" className="card-link">
            {user.website}
          </a>
        </p>
      </div>

      <span className="company-tag">{user.company.name}</span>
    </article>
  );
}