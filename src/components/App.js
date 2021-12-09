import { BrowserRouter as Router, Route, Routes } from "react-router-dom";



import { TopAppBar } from "./Scaffold/TopAppBar"
import { BottomNavBar } from "./Scaffold/BottomNavBar"

import { DevLogin } from "./User/DevLogin"

import { ProfileContainer } from "./Profile/ProfileContainer"
import { SaleContainer } from "./Sale/SaleContainer"
import { NewSale } from "./Sale/NewSale";
import { SaleDetail } from "./Sale/SaleDetail";
import { AuthProvider } from "../contexts/Auth"
import { RemoteEventProvider } from "../contexts/RemoteEventProvider"

import { PrivateRoute } from "./Routes/PrivateRoute"

function App() {

  return (
    <div className="App">
      <Router>
          <AuthProvider>
            <RemoteEventProvider>
                
                <TopAppBar />
                
                <Routes>
                  
                  {/* Private Routes */}
                  <Route path='/' element={<PrivateRoute/>}>
                      <Route path='/sale' element={<SaleContainer/>} />
                      <Route path='/newsale' element={<NewSale/>} />
                      <Route path='/saledetail' element={<SaleDetail/>} />
                      <Route path='/profile' element={<ProfileContainer/>} />
                      <Route path='*' element={<SaleContainer/>} />
                  </Route>
                  
                  {/* Public Routes */}
                  <Route path='/devlogin' element={<DevLogin/>} />
                  
                </Routes>

                <BottomNavBar />
                
            </RemoteEventProvider>
          </AuthProvider>
      </Router>
    </div>
  );
}

export default App;