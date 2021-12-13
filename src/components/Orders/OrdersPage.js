import { Box } from "@mui/material";

import { PageHeading } from "../Common/PageHeading";

export function OrdersPage() {
    return (
        <>
            <Box 
                sx={{ maxWidth: 'md' }}
                margin='auto'
            >
                <PageHeading title='Orders' />

            </Box>
    </>
    )
}