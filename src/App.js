import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import ProductsList from './components/Products-List/ProductsList';
import ProductDetails from './components/Product-Details/ProductDetails';
import Cart from './components/Cart/Cart';
import Footer from './components/Footer/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <ToastContainer position='top-center' />
      <Header />
      <Routes>
        <Route path='/' element={<ProductsList />}/>
        <Route path='/product/:productId' element={<ProductDetails />}/>
        <Route path='/products-cart' element={<Cart />}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
