
import React from 'react'
import {render as rtlRender, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
// import Fetch from '../fetch'
import {DevLogin} from "./DevLogin"
// import {useAuth} from "../../contexts/Auth"

import { AuthProvider } from "../../contexts/Auth";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


// const AllTheProviders = ({ children }) => {
//   return (
//     <Router>
//       {/* <AuthProvider initialState={authState}> */}
//       <AuthProvider>
//         {children}
//       </AuthProvider>
//     </Router>
//   );
// };

// const customRender = (ui, options, initialState) => {
//   render(
//     ui,
//     {
//       wrapper: props => (
//         // <AllTheProviders {...props} initialState={initialState} />
//         <AllTheProviders {...props} />
//       ),
//       ...options,
//     },
//   );
// };


function render(ui) {
    return rtlRender(ui, {
      wrapper: ({ children }) => {
        return (
          <Router>
            <AuthProvider>
              {/* <Provider3>{children}</Provider3> */}
              {children}
            </AuthProvider>
          </Router>
        )
      },
    })
  }
  

test('loads and displays greeting', async () => {
    // const {user} = useAuth()

    const { debug, getByTestId, getByText } = render(
      <DevLogin />
    );

    const loginButton = getByText("Sign In")
    
    loginButton.click()
    
    // await waitFor(() => screen.getByText('2011e0bc-3021-42fa-8895-d767499ba244'))
    
    await waitFor(() => screen.getByText(/2011e0bc/i))
    
    // debug()

  })