# User Directory App

React task submission for building a User Directory with API integration, live search, and proper loading/error handling.

## Live Demo

- Vercel URL: https://user-directory-henna.vercel.app/

## Objective

Build a React app that:

- Fetches users from a public API
- Supports live search by name
- Handles loading and error states clearly

## Tech Stack

- React (Hooks: useState, useEffect)
- JSONPlaceholder API: https://jsonplaceholder.typicode.com/users
- Plain CSS (no UI frameworks)
- Vercel (deployment)

## Implemented Requirements

### 1. Basic UI Design

- Header title: User Directory
- Search input with placeholder: Search by name...
- User list rendered as responsive cards
- Loading state shown while fetching
- Error message shown on failed request

### 2. User Card Fields

Each card includes:

- Name (user.name)
- Username (@user.username)
- Email (user.email)
- City (user.address.city)
- Company (user.company.name)

### 3. API Integration

- Endpoint used: GET https://jsonplaceholder.typicode.com/users
- Data is fetched on component mount with useEffect
- loading is set during request lifecycle
- error is shown if the request fails

### 4. State Management

State variables:

- users
- search
- loading
- error

Derived data:

- filteredUsers (derived from users + search, not stored as separate state)

State flow:

Component mount -> API request -> loading true ->
success: setUsers(data), loading false ->
failure: setError(message), loading false ->
on input: setSearch(value) -> filtered list re-renders

## Optional Enhancements Added

- Company filter chips
- Sorting by name/company/city
- Keyboard shortcuts (/ to focus search, Esc to clear)
- Accessibility improvements (focus-visible styles, live status updates)
- Custom UI animation and visual polish

## Project Structure

- src/App.js: main app logic (fetch, search, filters, sorting, states)
- src/UserCard.js: reusable card component for each user
- src/styles.css: layout, styling, responsive design, animations
- src/App.test.js: basic app-level rendering test

## Setup Instructions

```bash
npm install
npm start
```

Open http://localhost:3000 in your browser.

## Scripts

```bash
npm start
npm test
npm run build
```

## Deployment (Vercel)

1. Push code to GitHub.
2. Go to https://vercel.com.
3. Import the repository.
4. Deploy.
5. Copy the live URL and paste it in the Live Demo section above.

## Tech Choices

- React hooks were used for simple and clear local state management.
- Plain CSS was used to satisfy the assignment constraint and keep the stack beginner-friendly.
- JSONPlaceholder is used as a stable mock API for user data.

## Notes

- This submission prioritizes core functionality and code clarity first, then UI enhancements.
