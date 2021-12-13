// import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import QrReader from 'react-qr-reader'

import { UsersAdapter } from '../../providers/UsersAdapter';

export function QRScanner() {
    // const [scanResult, setScanResult] = useState();
    const navigate = useNavigate()
    const {getUserByID} = UsersAdapter();
    
    async function handleScan(data) {
        if(data) {
            const res = await getUserByID(data)
            // console.log('res', res)
            navigate('/newsale', {
                state: res
            })
        }
    }
    function handleError(err) {
        if(err) console.log(err);
    };


  return (
        <>
        <div>
            <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: '100%' }}
            />
            {/* <p>{scanResult}</p> */}
        </div>
        </>
  );
};