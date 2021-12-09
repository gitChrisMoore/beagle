import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';

import { SubscriptionsAdapter } from '../../providers/SubscriptionsAdapter';

export function SaleNotificationButton(data) {
    const navigate = useNavigate()
    const {CreateSubscription} = SubscriptionsAdapter()

    async function handleSubmit(e) {
        e.preventDefault()

        let requestPaylod = {
            "id": data.data.id,
            "user_id": data.data.user_id,
        }

        let res = await CreateSubscription(requestPaylod)

        if(res.inserted_at) {
            // console.log(res)
            navigate('/sale', {
                state: res
            })
        } else {
            console.log("SaleNotificationButton - handleSubmit - Error ")
        }
    }

  return (
    <div>
        <Button
            onClick={handleSubmit}
            autoFocus
            fullWidth
            variant="contained"
            >
            Notify Customer
        </Button>
    </div>
  );
}