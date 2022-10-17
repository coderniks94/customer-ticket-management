// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import CustomerHomePage from './pages/CustomerHomePage';
import SupportHomePage from './pages/SupportHomePage';
import HomePage from './pages/HomePage';
import LogoutPage from './pages/LogoutPage';
import PrivateRoute from './components/PrivateRoute';
import AuthContextProvider from './contexts/AuthContextProvider';
import Navbar from './components/Navbar';
import CreateTicketPage from './pages/CreateTicketPage';
import SignupPage from './pages/SignupPage';
import MyTicketsPage from './pages/MyTicketsPage';
import CustomerTicketsPage from './pages/CustomerTicketsPage';
import TicketDetailsPage from './pages/TicketDetailsPage';
import ProfilePage from './pages/ProfilePage';

function App() {
    return (
        // <div className="App">
        //   <header className="App-header">
        //     <img src={logo} className="App-logo" alt="logo" />
        //     <p>
        //       Edit <code>src/App.js</code> and save to reload.
        //     </p>
        //     <a
        //       className="App-link"
        //       href="https://reactjs.org"
        //       target="_blank"
        //       rel="noopener noreferrer"
        //     >
        //       Learn React
        //     </a>
        //   </header>
        // </div>
        <>
            <BrowserRouter>
                <AuthContextProvider>
                    <Navbar />
                    <main className='container' style={{marginTop: "5rem"}}>
                        <Routes>
                            <Route element={<PrivateRoute />}>
                                <Route path="/" element={<HomePage />}></Route>
                                <Route path={"/profile"} element={<ProfilePage />}></Route>
                                <Route path={"/customer-home"} element={<CustomerHomePage />}></Route>
                                <Route path={"/support-home"} element={<SupportHomePage />}></Route>
                                <Route path={"/create-ticket"} element={<CreateTicketPage />}></Route>
                                <Route path={"/create-ticket"} element={<CreateTicketPage />}></Route>
                                <Route path={"/my-tickets"} element={<MyTicketsPage />}></Route>
                                <Route path={"/customer-tickets"} element={<CustomerTicketsPage />}></Route>
                                <Route path={"/ticket-details/:ticketId"} element={<TicketDetailsPage />}></Route>
                                <Route path={"/logout"} element={<LogoutPage />}></Route>
                            </Route>

                            <Route path={"/login"} element={<LoginPage />}></Route>
                            <Route path={"/signup"} element={<SignupPage />}></Route>
                        </Routes>
                    </main>
                </AuthContextProvider>
            </BrowserRouter>
        </>
    );
}

export default App;
