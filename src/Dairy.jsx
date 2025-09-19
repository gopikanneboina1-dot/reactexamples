import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from './store';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import './Dairy.css'; // Updated CSS with drinks-* classes

function Dairy() {
  const drinkItems = useSelector(state => state.products.drinks);
  const dispatch = useDispatch();

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate indexes
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = drinkItems.slice(indexOfFirstItem, indexOfLastItem);

  // Total pages
  const totalPages = Math.ceil(drinkItems.length / itemsPerPage);

  return (
    <div className="page-container">
      <ToastContainer position="top-right" autoClose={2000} />

      <h1 className="drinks-title">🥛 Dairy</h1>

      <div className="drinks-container">
        {currentItems.map(item => (
          <div key={item.id} className="drinks-card">
            {item.image && <img src={item.image} alt={item.name} />}
            <div className="drinks-info">
              <strong className="drinks-name">{item.name}</strong>
              <p className="drinks-price">₹{item.price}</p>
             
              <button
                className="add-btn"
                onClick={() => {
                  dispatch(addToCart(item));
                  toast.success(`${item.name} added to cart!`);
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          className="page-btn"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => prev - 1)}
        >
          ◀ Prev
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`page-btn ${currentPage === index + 1 ? "active" : ""}`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className="page-btn"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => prev + 1)}
        >
          Next ▶
        </button>
      </div>
    </div>
  );
}

export default Dairy;
