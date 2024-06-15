import React, { useState } from 'react';
import { Container, Form, Nav, Navbar } from 'react-bootstrap';
import { setCategory } from '../../redux/slices/products-slice.js';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import { useDispatch, useSelector } from 'react-redux';

export default function Header({ onSearch }) {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const { categories, selectedCategory } = useSelector(state => state.products);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();

  const handleCategoryChange = (event) => {
    dispatch(setCategory(event.target.value));
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const isProductsList = location.pathname === '/';

  return (
    <Navbar expand="lg" className="bg-body-tertiary" fixed='top'>
      <Container>
        <Link to={'/'} className='navbar-brand'>MOMENTUM SOLUTIONS</Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Link to={'/'} className='nav-link'>Products List</Link>
            {isProductsList && (
              <Nav.Item>
                <Form.Select value={selectedCategory} onChange={handleCategoryChange} aria-label="Category Select" className="mx-2">
                  <option value="all">All Categories</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </Form.Select>
              </Nav.Item>
            )}
          </Nav>
          <Nav className="d-flex align-items-center">
            <Link to="/products-cart" className="nav-link nav-icon">
              <i className="fas fa-shopping-cart fa-2x"></i>
              <span className="cart-count">{cart.length}</span>
            </Link>
            {isProductsList && (
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </Form>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

