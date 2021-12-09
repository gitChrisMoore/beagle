import { useAuth } from '../../contexts/Auth'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

export function TopAppBar() {
  const { user } = useAuth()


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>

          <Typography variant="subtitle2" component="div" sx={{ flexGrow: 1 }}>
            {user?.email}
          </Typography>
          
          <Button color="inherit">
            <AddIcon />
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}