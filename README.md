# User Directory

A responsive React app for browsing and searching team members from a user directory dataset.

## Features

- Fast name-based search
- Company filter chips
- Sorting by name, company, and city
- Animated, mobile-friendly card layout

## Tech Stack

- React (Create React App)
- Plain CSS (custom design system and animations)
- JSONPlaceholder users API for demo data

## Getting Started

```bash
npm install
npm start
```

Open http://localhost:3000 to view it in the browser.

## Scripts

```bash
npm start      # run development server
npm test       # run tests
npm run build  # create production build
```

## Project Structure

- `src/App.js` - main page logic (fetching, search, filter, sorting)
- `src/UserCard.js` - reusable user profile card
- `src/styles.css` - app styling, layout, and animations

## Notes

- Data is loaded from `https://jsonplaceholder.typicode.com/users`.
- This project is intended as a frontend internship submission/demo.
