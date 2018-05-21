import React from 'react';
import logo from '../assets/img/bookameal-logo.png';
import meals from '../assets/img/Meal-menu.png';
import delivery from '../assets/img/fast-delivery.png';
import realTime from '../assets/img/24-hrs.png';
import Header from './partials/Header.jsx';

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
      <Header/>

      <div className='container'>
        <div className='leading'>
            <div className='wrapper'>
              <h2 className='leading-text'>
                Book A Meal is an online store for<br/> ordering your favourite meals
              </h2>
              <button className='button warning' id='visit'>
                <a href='user-menus.html'>Visit Store</a>
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
                src={ meals }
                alt='Menu Meals'
                style={{ width: '100%' }}
              />
              <div className='box-body'>
                <p className='text'>
                  Browse menus and <strong>your order</strong> in seconds without any delay
                </p>
              </div>
            </div>
          </div>
          <div className='c-medium-4' id='pd-0'>
            <div className="box">
              <img
                className='article-img'
                src={ delivery}
                alt='Fast Delivery'
                style={{ width: '100%' }}
              />
              <div className='box-body'>
                <p className='text'>
                  <strong>Explore restaurants </strong> that deliver to your doorstep
                </p>
              </div>
            </div>
          </div>
          <div className='c-medium-4' id='pd-0'>
            <div className='box'>
              <img src={ realTime } alt='Real Time' style={{ width: '100%' }} />
              <div className='box-body'>
                <p className='text'>
                  Follow the status of your order with <strong>real-time alerts</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
        <hr className='horizon'/>
      </div>

    </div>
    );
  }
}

export default HomePage;
