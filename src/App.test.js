import { render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([]),
    })
  );
});

afterEach(() => {
  jest.resetAllMocks();
});

test('renders directory heading and search input', async () => {
  render(<App />);

  expect(await screen.findByRole('heading', { name: /user directory/i })).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/search by name/i)).toBeInTheDocument();
});
