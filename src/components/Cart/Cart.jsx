import React from 'react';
import { Button, Container, Image, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addToCart, clear, deleteFromCart } from '../../redux/slices/cart-slice';


export default function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const totalPrice = cart.reduce((acc, product) => {
    acc += product.price * product.quantity;
    return acc;
  }, 0);

  const handleClearCart = () => {
    if (cart.length === 0) {
      toast.error("The cart is already empty");
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, clear it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(clear());
        Swal.fire('Cleared!', 'Your cart has been cleared.', 'success');
      }
    });
  };

  const handleDeleteFromCart = (product) => {
    if (product.quantity <= 1) {
      Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to remove this item?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteFromCart(product));
          Swal.fire('Deleted!', 'The item has been removed from your cart.', 'success');
        }
      });
    } else {
      dispatch(deleteFromCart(product));
      toast.success("The item quantity has been reduced by one");
    }
  };

  return (
    <Container className='py-5 mb-5'>
      <h1 className='py-5'>Welcome to the Cart</h1>
      <div className="d-flex justify-content-between mb-1">
        <h3>Total Price: {totalPrice.toFixed(2)} $</h3>
        <Button variant='danger' onClick={handleClearCart}>CLEAR CART</Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Image</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td><Image src={product.image} alt={product.title} style={{ width: "100px", height: "100px"}}/></td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>
                <Button variant='success' onClick={() => dispatch(addToCart(product))}>ADD</Button>
              </td>
              <td>
                <Button variant='danger' onClick={() => handleDeleteFromCart(product)}>DELETE</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

