import { useState } from 'react'
import styled from 'styled-components'
import CartAmountToggle from './CartAmountToggle'
import LoginPopup from './LoginPopup'
import { Button } from '../styles/Button'
import { useCart } from '../context/cartContext'
import { FaCheck } from 'react-icons/fa'
import { NavLink, useNavigate } from 'react-router-dom'


function AddToCart({ product }) {
  const { id, colors = [], stock = 0 } = product
  const { addToCart } = useCart()
  const [primaryColor, setPrimaryColor] = useState(0)
  const [amount, setAmount] = useState(1)
  const [isLoginPopupVisible, setIsLoginPopupVisible] = useState(false)
  const navigate = useNavigate()

  const isAuthenticated = () => {
    // Check if the user is logged in by checking the presence of a token
    return !!localStorage.getItem('authToken')
  }

  function increaseAmount() {
    if (amount < stock) setAmount((prev) => prev + 1)
  }

  function decreaseAmount() {
    if (amount > 1) setAmount((prev) => prev - 1)
  }

  const handleAddToCart = () => {
    if (isAuthenticated()) {
      // If logged in, add to cart and navigate to the cart page
      const selectedColor = colors[primaryColor] || 'default-color'
      addToCart(id, selectedColor, amount, product)
      navigate('/cart')
    } else {
      // If not logged in, show login popup
      setIsLoginPopupVisible(true)
    }
  }

  const handleLoginSuccess = () => {
    setIsLoginPopupVisible(false)
    handleAddToCart() // Retry adding to the cart after login
  }

  return (
    <Wrapper>
      <div>
        <p>
          Color:{' '}
          {colors.map((color, i) => (
            <button
              key={i}
              style={{ backgroundColor: color }}
              className={primaryColor === i ? 'btn-style active' : 'btn-style'}
              onClick={() => setPrimaryColor(i)}
            >
              {primaryColor === i && <FaCheck className="icon" />}
            </button>
          ))}
        </p>
        <CartAmountToggle
          increaseAmount={increaseAmount}
          decreaseAmount={decreaseAmount}
          amount={amount}
        />
        <Button onClick={handleAddToCart}>Add to Cart</Button>

        {isLoginPopupVisible && (
          <LoginPopup onClose={() => setIsLoginPopupVisible(false)} onSuccess={handleLoginSuccess} />
        )}
      </div>
    </Wrapper>
  )
}



const Wrapper = styled.section`
  .colors p {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .btn-style {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  .active {
    opacity: 1;
  }

  .icon {
    font-size: 1rem;
    color: #fff;
  }

  /* we can use it as a global one too  */
  .amount-toggle {
    margin-top: 3rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 1.4rem;

    button {
      border: none;
      background-color: #fff;
      cursor: pointer;
    }

    .amount-style {
      font-size: 2.4rem;
      color: ${({ theme }) => theme.colors.btn};
    }
  }
`

export default AddToCart
