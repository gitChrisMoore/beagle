// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
// __tests__/fetch.test.js
import React from 'react'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
// import Fetch from '../fetch'
import App from "./App"



describe('Beagle App', () => {
  it('verify validation works', () => {

  })
})

test('loads and displays greeting', async () => {
  const {debug } = render(
    <App />
  );
  // debug();

})
