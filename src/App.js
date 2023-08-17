import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './Components/Header/Header';
import Main from './Components/Main/Main';
import Footer from './Components/Footer/Footer';
import Cheap from "./Components/Main/Cheap/Cheap";
import Expensive from "./Components/Main/Expensive/Expensive";
import Menu from "./Components/Main/Menu/Menu";
import Order from './Components/Main/Order/Order'
import './App.css'

function App() {
    return (
        <div className='app-container'>
            <aside>
                <Header />
                <Routes>
                    <Route path="/react-shop" element={<Main />} />
                    <Route path="/react-shop/cheap" element={<Cheap/>} />
                    <Route path="/react-shop/expensive" element={<Expensive/>}/>
                    <Route path="/react-shop/menu" element={<Menu/>}/>
                    <Route path="/react-shop/order" element={<Order/>}/>
                </Routes>
            </aside>
            <Footer />
        </div>
    );
}

export default App;
