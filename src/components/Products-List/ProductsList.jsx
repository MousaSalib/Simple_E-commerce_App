import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Card, Button, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, sortProductsByPrice } from '../../redux/slices/products-slice.js';
import { addToCart } from '../../redux/slices/cart-slice';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import './Products-List.css';

const truncateTitle = (title, wordLimit) => {
  const words = title.split(' ');
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + "...";
  }
  return title;
};

export default function ProductsList() {
  const dispatch = useDispatch();
  const { products, selectedCategory } = useSelector(state => state.products);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchProducts()).then(() => setLoading(false));
  }, [dispatch]);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSortByPrice = (direction) => {
    dispatch(sortProductsByPrice({ direction }));
  };

  return (
    <div>
      <Header onSearch={setSearchTerm} />
      <Container className='py-5 mb-3'>
        <Button className="mt-5" onClick={() => handleSortByPrice('asc')}>
          Sort by Price (Low to High)
        </Button>
        <Button className="mt-5 ms-3" onClick={() => handleSortByPrice('desc')}>
          Sort by Price (High to Low)
        </Button>
        {loading ? (
          <div className="spinner-container d-flex justify-content-center align-items-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Row className='py-2 mb-5'>
            {filteredProducts.map((product) => (
              <Col xs={12} sm={6} md={4} lg={3} className='mb-4' key={product.id}>
                <Card style={{ width: '100%', height: "100%" }}>
                  <Link to={`/product/${product.id}`} className='nav-link'>
                    <Card.Img variant="top" src={product.image} style={{ height: "300px" }} />
                  </Link>
                  <Card.Body>
                    <Card.Title>{truncateTitle(product.title, 3)}</Card.Title>
                    <Card.Text>
                      {product.price} $
                    </Card.Text>
                    <Button variant="success" onClick={() => dispatch(addToCart(product))}>Add To Cart</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
}
