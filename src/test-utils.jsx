import React from 'react'
import {render} from '@testing-library/react'
// import {ThemeProvider} from 'my-ui-lib'
// import {TranslationProvider} from 'my-i18n-lib'
// import defaultStrings from 'i18n/en-x-default'
import { AuthProvider } from './contexts/Auth'


const AllTheProviders = ({children}) => {
  return (
        <AuthProvider>
            {children}
        </AuthProvider>
  )
}

const customRender = (ui, options) =>
  render(ui, {wrapper: AllTheProviders, ...options})

// re-export everything
export * from '@testing-library/react'

// override render method
export {customRender as render}




// const AllTheProviders = ({children}) => {
//     return (
//       <ThemeProvider theme="light">
//           <TranslationProvider messages={defaultStrings}>
//               {/* <AuthProvider> */}
//                   {children}
//               {/* <AuthProvider> */}
//         </TranslationProvider>
//       </ThemeProvider>
//     )
//   }
  