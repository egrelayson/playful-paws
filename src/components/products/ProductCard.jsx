import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
// Import custom `useCart` hook from '../../context/CartContext'
import { useCart } from '../../context/CartContext';

function ProductCard({ product }) {
  // 1. EXTRACT CART ACTIONS FROM CONTEXT
  // Destructure `addToCart` from `useCart()`
  const { addToCart } = useCart();

  // 2. DESTRUCTURE PRODUCT PROPS
  // Extract properties like id, name, price, category, petType, imageUrl, and stock from `product`
  const  { name, price, category, petType, imageUrl, stock } = product;

  return (
    <Card className="h-100 shadow-sm border-0 position-relative">
      
      {/* Category / Pet Type Badge */}
      <Badge 
        bg="secondary" 
        className="position-absolute top-0 start-0 m-2 px-2 py-1"
      >
        {/* Display petType or category */}
        { petType } - { category }
      </Badge>

      {/* Product Image */}
      <Card.Img
        variant="top"
        src={imageUrl}
        alt={name}
        style={{ height: '200px', objectFit: 'cover' }}
      />

      {/* Card Body */}
      <Card.Body className="d-flex flex-column">
        
        {/* Title */}
        <Card.Title className="fs-6 text-truncate mb-1">
          {/* Display name */}
          { name }
        </Card.Title>

        {/* Price & Stock Display */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="fw-bold text-primary fs-5">
            {/* Format price: `$${price.toFixed(2)}` */}
            ${price.toFixed(2)}
          </span>
          
          {/* Stock Indicator */}
          {/* Render a subtle text indicator if stock is low or in stock */}
          {/* e.g., <small className="text-muted">In Stock</small> */}
          { (stock > 10) ?
            <small className="text-muted">In Stock</small>
            : (stock == 0) ?
            <small className="text-muted">Out of stock</small>
            :
            <small className="text-muted">Stock is running out!</small>
          }
        </div>

        {/* Action Button */}
        <div className="mt-auto">
          <Button 
            variant="primary" 
            className="w-100 fw-semibold"
            disabled={stock===0}
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </Button>
        </div>

      </Card.Body>
    </Card>
  );
}

export default ProductCard;