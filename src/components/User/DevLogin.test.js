
import React from 'react'
import { render, debug, fireEvent, waitFor, screen } from '../../test-utils';
import {DevLogin} from "./DevLogin"

describe('DevLogin', function() {
    it('logs in as the dev user', async () => {

        const { getByText } = render(
          <DevLogin />
        );
    
        // const loginButton = getByText("Sign In")
        // loginButton.click()
        // click(getByText("Sign In"))
    
        fireEvent.click(getByText("Sign In"))
        
        await waitFor(() => screen.getByText(/2011e0bc/i))
    
    })
});

