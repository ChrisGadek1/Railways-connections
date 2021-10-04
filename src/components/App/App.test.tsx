import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders main App component', () => {
  const { getByTestId } = render(<App />);
  expect(getByTestId('app')).toBeInTheDocument();
});
