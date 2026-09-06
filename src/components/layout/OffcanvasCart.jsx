import React from 'react';
import { 
  Offcanvas, 
  ListGroup, 
  Button, 
  Image, 
  Row, 
  Col, 
  Badge 
} from 'react-bootstrap';
// Import custom `useCart` hook from '../context/CartContext'
import { useCart } from '../../context/CartContext';

function OffcanvasCart({ show, handleClose }) {
  // 1. EXTRACT CART STATE & ACTIONS FROM CONTEXT
  // Destructure `cartItems`, `cartSubtotal`, `updateQuantity`, `removeFromCart`, and `clearCart` from `useCart()`
  const { cartItems, cartSubtotal, updateQuantity, removeFromCart, clearCart } = useCart();

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      
      {/* Drawer Header */}
      <Offcanvas.Header closeButton>
        <Offcanvas.Title className="fw-bold">
          Your Shopping Cart
        </Offcanvas.Title>
      </Offcanvas.Header>

      {/* Drawer Body */}
      <Offcanvas.Body className="d-flex flex-column">
        
        {/* CONDITIONAL RENDER: Empty Cart vs Cart Items */}
        {/* Check if cartItems.length === 0 */}
        {/* - IF EMPTY: Render a centered message (e.g., "Your cart is empty") with a button to continue shopping */}
        {/* - IF NOT EMPTY: Render list of cart items */}

        { cartItems.length === 0 ? 
          (<div>Your cart is empty</div>)
            :
          (<ListGroup variant="flush" className="flex-grow-1 overflow-auto">
            {/* Map over `cartItems` and render a ListGroup.Item for each item */}
            { cartItems.map((item) => (
            <ListGroup.Item key={item.id} className="py-3">
              <Row className="align-items-center">
                
                <Col xs={3}>
                  <Image src={item.imageUrl} alt={item.name} fluid rounded />
                </Col>

                <Col xs={6}>
                  <h6 className="mb-1 text-truncate">{item.name}</h6>
                  <div className="text-muted small">${item.price.toFixed(2)}</div>
                  
                  <div className="d-flex align-items-center mt-2">
                    <Button 
                      variant="outline-secondary" 
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </Button>
                    <span className="mx-2 fw-bold">{item.quantity}</span>
                    <Button 
                      variant="outline-secondary" 
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                </Col>

                <Col xs={3} className="text-end">
                  <div className="fw-bold mb-2">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <Button 
                    variant="link" 
                    className="text-danger p-0 border-0 small text-decoration-none"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </Button>
                </Col>

              </Row>
            </ListGroup.Item>
          ))}
          </ListGroup>)}

        {/* Drawer Footer / Checkout Summary */}
        {/* Render only if cart has items */}
        { cartItems.length > 0 &&
          <div className="border-top pt-3 mt-auto">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="fw-bold fs-5">Subtotal:</span>
              {/* Display dynamic `cartSubtotal.toFixed(2)` */}
              <span className="fw-bold fs-5 text-primary">${cartSubtotal.toFixed(2)}</span>
            </div>

            <div className="d-grid gap-2">
              <Button variant="success" size="lg">
                Proceed to Checkout
              </Button>
              <Button 
                variant="outline-danger" 
                size="sm"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
            </div>
          </div>
        }

      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default OffcanvasCart;
