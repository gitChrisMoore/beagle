
import React from 'react'
import { render, debug, fireEvent, waitFor, screen } from '../../../test-utils';
import {PendingApproval} from "./PendingApproval"
import {DevLogin} from "../../User/DevLogin"




describe('PendingApproval', function() {
    
    it('logs in as a admin', async () => {
        const { getByText } = render(
            <DevLogin />
        );
        fireEvent.click(getByText("Sign In"));
        await (waitFor(() => screen.getByText(/2011e0bc/i)))
    });

    it('submits transaction, pending approval', async () => {
        
        const { debug, getByText, getByTestId } = render(
          <PendingApproval />
        );
        
        const _user_idRef = 'deb53b04-b341-4fbf-aceb-6d02aea320d9'
        const _amountRef = 5.00
        const _typeRef = "INVOICE"
        const _statusRef = "PENDING_APPROVAL"

        const user_idRef = getByTestId('user_idRef').querySelector('input');
        const amountRef = getByTestId('amountRef').querySelector('input');
        const typeRef = getByTestId('typeRef').querySelector('input');
        const statusRef = getByTestId('statusRef').querySelector('input');
        const submitButton = getByTestId("submitButton");

        fireEvent.change(user_idRef, { target: { value: _user_idRef}});
        fireEvent.change(amountRef, { target: { value: _amountRef }});
        fireEvent.change(typeRef, { target: { value: _typeRef }});
        fireEvent.change(statusRef, { target: { value: _statusRef }});

        
        fireEvent.click(submitButton);
        
        await waitFor(() => screen.getByText(/deb53b04/i))
    })
});