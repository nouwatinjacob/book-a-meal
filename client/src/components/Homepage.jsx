import React from 'react';
import { Link } from 'react-router-dom';
/**
 * Homepage class declaration
 *
 * @class Homepage
 *
 * @extends {React.Component}
 */
class HomePage extends React.Component {
  /**
   * Renders Homepage component
   *
   * @return {XML} JSX
   */
  render() {
    return (
      <div className='container'>

      <div className='hero'>
        <div className='leading'>
            <div className='wrapper'>
              <h2 className='leading-text'>
                Book A Meal is an online store for<br/>
                ordering your favourite meals
              </h2>
              <button className='button warning' id='visit'>
                <Link to='/menus'>Browse Menu</Link>
              </button>
            </div>
        </div>
      </div>

      <div className='wrapper'>
        <h3 className='text-center'>How Book-A-Meal<br/> Order works</h3>
        <div className='row'>
          <div className='c-medium-4' id='pd-0'>
            <div className='box'>
              <img
                className='article-img'
                src='http://res.cloudinary.com/sansaristic/image/upload/v1533140471/BookMeal/Default%20images/Meal-menu.png'
                alt='Menu Meals'
                style={{ width: '100%' }}
              />
              <div className='box-body'>
                <p className='text'>
                  Browse menus and <strong>your order</strong>
                  in seconds without any delay
                </p>
              </div>
            </div>
          </div>
          <div className='c-medium-4' id='pd-0'>
            <div className="box">
              <img
                className='article-img'
                src='http://res.cloudinary.com/sansaristic/image/upload/v1533140467/BookMeal/Default%20images/fast-delivery.png'
                alt='Fast Delivery'
                style={{ width: '100%' }}
              />
              <div className='box-body'>
                <p className='text'>
                  <strong>Explore restaurants </strong>
                  that deliver to your doorstep
                </p>
              </div>
            </div>
          </div>
          <div className='c-medium-4' id='pd-0'>
            <div className='box'>
              <img
                src='http://res.cloudinary.com/sansaristic/image/upload/v1533140467/BookMeal/Default%20images/24-hrs.png'
                alt='Real Time'
                style={{ width: '100%' }} />
              <div className='box-body'>
                <p className='text'>
                  Follow the status of your order with
                  <strong>real-time alerts</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    );
  }
}

export default HomePage;
