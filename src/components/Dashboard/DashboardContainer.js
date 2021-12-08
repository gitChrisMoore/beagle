import * as React from 'react';

import { TxEventHandler } from '../TxProcessor/TxEventHandler';
import { PendingApproval } from './Transactions/PendingApproval';


export function DashboardContainer() {

    return (
    <>
        dashboard
        < PendingApproval />
        <TxEventHandler />
    
    </>
    )
}