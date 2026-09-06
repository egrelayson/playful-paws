import React, { useState, useEffect } from 'react';
import { Container, Spinner, Alert } from 'react-bootstrap';

// Context
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';

// API Service
import { getProducts } from './services/api';

// Components
import NavigationBar from './components/layout/NavigationBar';
import OffcanvasCart from './components/layout/OffcanvasCart';
import ProductGrid from './components/products/ProductGrid';
import Footer from './components/layout/Footer';

function App() {
  // 1. STATE MANAGEMENT
  // Define state for the list of products
  const [products, setProducts] = useState([]);
  // Define state for the search query term
  const [searchQuery, setSearchQuery] = useState("");
  // Define state for loading status (boolean)
  const [isLoading, setIsLoading] = useState(true);
  // Define state for error handling (string or null)
  const [error, setError] = useState("");
  // Define state to control OffcanvasCart visibility (boolean)
  const [isCartVisible, setIsCartVisible] = useState(false);

  // 2. DATA FETCHING (EFFECT)
  useEffect(() => {
    // Write an async function or promise chain to fetch products using `getProducts(searchQuery)`
    // - Set loading state to true before call
    // - On success: update products state, clear errors
    // - On failure: set error message
    // - Finally: set loading state to false
    const fetchProductsData = async (searchQuery) => {
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await getProducts(searchQuery);
        setProducts(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch products');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductsData(searchQuery);
    
    // Consider adding a debouncing mechanism or handling dependency updates for `searchQuery`
  }, [searchQuery]);

  // 3. HANDLERS
  // Create a handler function for search input changes from NavigationBar
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    console.log(value, searchQuery);
  };

  // Create handlers to open and close the OffcanvasCart drawer
  const openCart = () => {
    setIsCartVisible(true);
  };

  const closeCart = () => {
    setIsCartVisible(false);
  };

  return (
    <CartProvider>
      <ThemeProvider>
        <div className="d-flex flex-column min-vh-100">
          
          {/* Navigation Bar */}
          {/* Pass search query state, search handler, and cart drawer toggle handler */}
          <NavigationBar searchQuery={searchQuery} onSearchChange={handleSearchChange} onOpenCart={openCart} />

          {/* Main Content Area */}
          <Container className="my-4 flex-grow-1">
            {/* Render conditional UI based on state: */}
            {/* - If loading: Show React-Bootstrap <Spinner /> */}
            {/* - If error: Show React-Bootstrap <Alert variant="danger" /> */}
            {/* - Otherwise: Render <ProductGrid products={products} /> */}
            { isLoading ? (
                <Spinner />
              ) : error ? (
                <Alert variant="danger">{error}</Alert>
              ) : (
                <ProductGrid products={products} />
              )
            }
          </Container>

          {/* Offcanvas Shopping Cart Drawer */}
          {/* Pass visibility state and close handler */}
          <OffcanvasCart show={isCartVisible} handleClose={closeCart} />

          {/* Footer */}
          <Footer />
          
        </div>
      </ThemeProvider>
    </CartProvider>
  );
}

export default App;