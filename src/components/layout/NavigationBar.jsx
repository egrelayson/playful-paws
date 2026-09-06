import React, { useContext } from 'react';
import { 
  Navbar, 
  Container, 
  Form, 
  FormControl, 
  Button, 
  Badge 
} from 'react-bootstrap';
// Import custom `useCart` hook from '../../context/CartContext'
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';

function ThemedButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline-light"
      className="btn btn-outline-secondary btn-sm"
      onClick={toggleTheme}
    >
      <span>{theme === 'dark' ? '☀️' : '🌙'}</span>{' '}
      <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
    </Button>
  );
}

function NavigationBar({ searchQuery, onSearchChange, onOpenCart }) {
  // 1. EXTRACT CART DATA FROM CONTEXT
  // Destructure `totalItemsCount` from `useCart()`
  const { totalItemsCount } = useCart();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="shadow-sm">
      <Container>
        
        {/* Brand Logo / Name */}
        <Navbar.Brand href="#home" className="fw-bold fs-4 text-primary">
          🐾 Playful Paws
        </Navbar.Brand>

        {/* Responsive Toggle Button */}
        <Navbar.Toggle aria-controls="navbar-nav" />

        {/* Collapsible Content */}
        <Navbar.Collapse id="navbar-nav" className="justify-content-between my-2 my-lg-0">
          
          {/* Centered Search Bar */}
          <Form 
            className="d-flex mx-auto my-2 my-lg-0 w-100" 
            style={{ maxWidth: '400px' }}
            onSubmit={(e) => e.preventDefault()} // Prevents page reload on submission
          >
            <FormControl
              type="search"
              placeholder="Search toys, treats, accessories..."
              className="me-2"
              aria-label="Search"
              value={searchQuery}
              onChange={onSearchChange}
              /* Bind value={searchQuery} and onChange={onSearchChange} */
            />
          </Form>

          {/* Cart Button with Reactive Badge */}
          <Button 
            variant="outline-light" 
            className="position-relative d-flex align-items-center gap-2 mx-2"
            onClick={onOpenCart}
            /* Bind onClick={onOpenCart} */
          >
            <span>🛒 Cart</span>
            
            {/* Dynamic Badge */}
            {/* Render Badge with `totalItemsCount` */}
            <Badge bg="primary" pill>
              {totalItemsCount}
            </Badge>
          </Button>
          {/* <ThemedButton /> */}

        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}

export default NavigationBar;
