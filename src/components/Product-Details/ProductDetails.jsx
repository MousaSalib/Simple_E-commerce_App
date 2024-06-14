import React from 'react'
import { Button, Card, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addToCart } from '../../redux/slices/cart-slice';

export default function ProductDetails() {
  const { productId } = useParams();
  const product = useSelector(state => state.products.products.find(p => p.id === parseInt(productId)));
  const dispatch = useDispatch();

  if(!product) {
    return <div>Loading...</div>
  }

  return (
    <Container className='py-5 mb-3'>
    <Row className='py-5 d-flex justify-content-center'>
      <Card style={{ width: '30rem' }}>
        <Card.Img variant="top" src={product.image} />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>
            {product.description}
          </Card.Text>
          <div className="d-flex justify-content-between">
            <Card.Text>
              {product.category} 
            </Card.Text>
            <Card.Text>
              {product.price} $
            </Card.Text>
          </div>
          <Button variant="success" onClick={() => dispatch(addToCart(product))}>Add To Cart</Button>
        </Card.Body>
      </Card>
      </Row>
    </Container>
  )
}
