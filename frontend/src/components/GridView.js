import React from 'react'
import styled from 'styled-components'
import Product from '../pages/Product'

function GridView({ items }) {
  return (
    <Wrapper className="section">
      <div className="container grid grid-three-column">
        {items.map((product) => (
          <Product key={product.id} {...product} />
        ))}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  padding: 9rem 0;

  .container {
    max-width: 120rem;
  }

  .grid {
    gap: 3.2rem;
  }

  figure {
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    transition: all 0.5s linear;
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 0%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      transition: all 0.2s linear;
      cursor: pointer;
    }
    &:hover::after {
      width: 100%;
    }
    &:hover img {
      transform: scale(1.2);
    }
    img {
      max-width: 90%;
      margin-top: 1.5rem;
      height: 20rem;
      transition: all 0.2s linear;
      object-fit: cover;
    }
  }

  .card {
    background-color: ${({ theme }) => theme.colors.bg};
    border-radius: 1rem;

    .card-data {
      padding: 0 1rem;
    }

    .card-data-flex {
      margin: 2rem 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .card-data--price {
      color: ${({ theme }) => theme.colors.helper};
      font-weight: 600;
    }

    h3 {
      color: ${({ theme }) => theme.colors.text};
      text-transform: capitalize;
    }

    .btn {
      margin: 2rem auto;
      background-color: rgb(0 0 0 / 0%);
      border: 0.1rem solid rgb(12 47 74);
      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
        background-color: rgb(12 47 74);
      }

      &:hover a {
        color: #fff;
      }
      a {
        color: rgb(12 47 74);
        font-size: 1.4rem;
      }
    }
  }
`

export default GridView
