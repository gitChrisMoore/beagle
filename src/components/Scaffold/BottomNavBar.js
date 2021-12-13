import { useState } from 'react';
import { Link,
        useLocation } from 'react-router-dom'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PersonIcon from '@mui/icons-material/Person';

import { Paper } from '@mui/material';

export function BottomNavBar() {
  const [value, setValue] = useState(0);
  const location = useLocation();

  if(location.pathname === '/login') {
    return <> </>
  } else if (location.pathname === '/signup') {
    return <> </>
  };

  return (
    <>
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={5}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Sales" to="/sale"  component={Link} icon={<PointOfSaleIcon />} />
        <BottomNavigationAction label="Orders" to="/orders"  component={Link} icon={<ReceiptIcon />} />
        <BottomNavigationAction label="Profile" to="/profile"  component={Link} icon={<PersonIcon />} />
      </BottomNavigation>
    </Paper>
    </>
  );
}
