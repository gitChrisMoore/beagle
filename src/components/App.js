import { BrowserRouter as Router, Route, Routes } from "react-router-dom";



import { TopAppBar } from "./Scaffold/TopAppBar"
import { BottomNavBar } from "./Scaffold/BottomNavBar"

import { DevLogin } from "./User/DevLogin"

import { ProfileContainer } from "./Profile/ProfileContainer"
import { OrdersPage } from "./Orders/OrdersPage"
import { SaleContainer } from "./Sale/SaleContainer"
import { NewSale } from "./Sale/NewSale";
import { SaleDetail } from "./Sale/SaleDetail";
import { AuthProvider } from "../contexts/Auth"
import { RemoteEventProvider } from "../contexts/RemoteEventProvider"
import { QRScanner } from "./Sale/QRScanner";
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
                      <Route path='/orders' element={<OrdersPage/>} />
                      <Route path='/newsale' element={<NewSale/>} />
                      <Route path='/qrscanner' element={<QRScanner/>} />
                      <Route path='/saledetail' element={<SaleDetail/>} />
                      <Route path='/profile' element={<ProfileContainer/>} />
                      
                  </Route>
                  
                  {/* Public Routes */}
                  <Route path='*' element={<SaleContainer/>} />
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