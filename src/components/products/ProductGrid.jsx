import React from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import ProductCard from './ProductCard';

function ProductGrid({ products }) {
  // 1. CONDITIONAL RENDER: Empty State Check
  // Check if `products` array is empty or undefined
  // - IF EMPTY: Render a React-Bootstrap <Alert variant="info"> message 
  //   informing the user that no pet products were found matching their query.

  if (!products || products.length === 0) {
    return <Alert variant="info">There are no pet products that match your query.</Alert>;
  }

  return (
    <Row xs={1} sm={2} md={3} lg={4} className="g-4">
      {/* 2. MAP OVER PRODUCTS */}
      {/* Map through the `products` array */}
      {/* For each product, return a responsive <Col> wrapping a <ProductCard /> */}
      
      {/* Example mapping structure: */}
      { products.map((product) => (
        <Col key={product.id}>
          <ProductCard product={product} />
        </Col>
      )) }
    </Row>
  );
}

export default ProductGrid;