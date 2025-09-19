import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from './Store';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import './NonVeg.css'; // Import CSS file
function NonVeg() {
  const nonVegItems = useSelector(state => state.products.nonVeg);
  const dispatch = useDispatch();

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 

  // Calculate indexes
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = nonVegItems.slice(indexOfFirstItem, indexOfLastItem);

  // Total pages
  const totalPages = Math.ceil(nonVegItems.length / itemsPerPage);

  return (
    <>
      <div className="page-container">
        <ToastContainer position="top-right" autoClose={2000} />

        <h1 className="nonveg-title">🍗 Non-Veg Items</h1>

        <div className="nonveg-container">
          {currentItems.map(item => (
            <div key={item.id} className="nonveg-card">
              <img src={item.image} alt={item.name} />
              <div className="nonveg-info">
                <strong className="nonveg-name">{item.name}</strong>
                <p className="nonveg-price">₹{item.price}</p>
                
                <button
                  className="add-btn"
                  onClick={() => {
                    dispatch(addToCart(item));
                    toast.success(`Item ${item.name} added to cart!`);
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
    </>
  );
}

export default NonVeg;
