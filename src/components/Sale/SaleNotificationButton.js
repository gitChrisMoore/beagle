import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';

import { Subscriptions } from '../../providers/Subscriptions';

export function SaleNotificationButton(data) {
    const navigate = useNavigate()
    const {CreateSubscription} = Subscriptions()

    async function handleSubmit(e) {
        e.preventDefault()

        let jsonObject = {
            action: "TRANSACTION",
            detail: {
                "id": data.data.id,
                "user_id": data.data.user_id,
            }
        }
        let requestPaylod = {
            user_id: data.data.user_id,
            payload: JSON.stringify(jsonObject)
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