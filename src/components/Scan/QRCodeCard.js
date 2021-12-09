import QRCode from "qrcode.react"
import { useAuth } from '../../contexts/Auth'

import {Box} from "@mui/material/";

export function QRCodeCard() {
    const { user } = useAuth()

    return (
        <Box  display= 'flex' p={1} sx={{ maxWidth: 'md' }} margin='auto' justifyContent='center'>
                <QRCode 
                    value={user?.id}
                    size={300}
                    >
                </QRCode>
        </Box>
    )
}