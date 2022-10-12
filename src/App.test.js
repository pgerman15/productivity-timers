import { render, screen } from '@testing-library/react';
import App from './App';

test('renders stand up timer', () => {
  render(<App />);
  const standupTimer = screen.getByText(/Stand up timer/i);
  expect(standupTimer).toBeInTheDocument();
});
test('renders pomodoro timer', () => {
  render(<App />);
  const pomodoroTimer = screen.getByText(/Pomodoro timer/i)
  expect(pomodoroTimer).toBeInTheDocument();
});
