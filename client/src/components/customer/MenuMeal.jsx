import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../partials/Header.jsx';
import CustomerHeader from '../partials/CustomerHeader.jsx';
import Search from '../partials/Search.jsx';
import image from '../../assets/img/spagheti.jpg';
import Pagination from '../partials/Pagination.jsx';

class MenuMeal extends React.Component {
  render() {
    return (
      <div>
          <div className='container'>

            <Header/>
            <CustomerHeader/>

          <div className='wrapper'>
            <Search/>
            <div className='row'>
              <div className='c-medium-3 c-xsmall-12 c-3' id='pd-0'>
              <div className='box'>
                <img src={ image } alt='Avatar' style={{ width: '100%' }} />
                <div className='box-body'>
                  <div className='row'>
                    <div className='c-medium-12 c-xsmall-12' id='pd-0'><p><b>Spaghetti</b></p></div>
                  </div><hr/>
                  <div className='row'>
                    <div className='c-medium-6 c-xsmall-6' id='pd-0'><p><b>&#8358;1000</b></p></div>
                    <div className='c-medium-6 c-xsmall-6' id='pd-0'>
                      <button className='button warning'>
                        <Link to='/confirm-order'>Order Meal</Link>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='c-medium-3 c-xsmall-12 c-3' id='pd-0'>
              <div className='box'>
                <img src={ image } alt='Avatar' style={{ width: '100%' }} />
                <div className='box-body'>
                  <div className='row'>
                    <div className='c-medium-12 c-xsmall-12' id='pd-0'><p><b>Spaghetti</b></p></div>
                  </div><hr/>
                  <div className='row'>
                    <div className='c-medium-6 c-xsmall-6' id='pd-0'><p><b>&#8358;1000</b></p></div>
                    <div className='c-medium-6 c-xsmall-6' id='pd-0'>
                      <button className='button warning'>
                       <Link to='/confirm-order'>Order Meal</Link>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='c-medium-3 c-xsmall-12 c-3' id='pd-0'>
              <div className='box'>
                <img src={ image } alt='Avatar' style={{ width: '100%' }} />
                <div className='box-body'>
                  <div className='row'>
                    <div className='c-medium-12 c-xsmall-12' id='pd-0'><p><b>Spaghetti</b></p></div>
                  </div><hr/>
                  <div className='row'>
                    <div className='c-medium-6 c-xsmall-6' id='pd-0'><p><b>&#8358;1000</b></p></div>
                    <div className='c-medium-6 c-xsmall-6' id='pd-0'>
                      <button className='button warning'>
                        <Link to='/confirm-order'>Order Meal</Link>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='c-medium-3 c-xsmall-12 c-3' id='pd-0'>
              <div className='box'>
                <img src={ image } alt='Avatar' style={{ width: '100%' }} />
                <div className='box-body'>
                  <div className='row'>
                    <div className='c-medium-12 c-xsmall-12' id='pd-0'><p><b>Spaghetti</b></p></div>
                  </div><hr/>
                  <div className='row'>
                    <div className='c-medium-6 c-xsmall-6' id='pd-0'><p><b>&#8358;1000</b></p></div>
                    <div className='c-medium-6 c-xsmall-6' id='pd-0'>
                      <button className='button warning'>
                        <Link to='/confirm-order'>Order Meal</Link>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div><br/>

            <div className='row'>
              <div className='c-medium-3 c-xsmall-12 c-3' id='pd-0'>
              <div className='box'>
                <img src={ image } alt='Avatar' style={{ width: '100%' }} />
                <div className='box-body'>
                  <div className='row'>
                    <div className='c-medium-12 c-xsmall-12' id='pd-0'><p><b>Spaghetti</b></p></div>
                  </div><hr/>
                  <div className='row'>
                    <div className='c-medium-6 c-xsmall-6' id='pd-0'><p><b>&#8358;1000</b></p></div>
                    <div className='c-medium-6 c-xsmall-6' id='pd-0'>
                      <button className='button warning'>
                        <Link to='/confirm-order'>Order Meal</Link>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='c-medium-3 c-xsmall-12 c-3' id='pd-0'>
              <div className='box'>
                <img src={ image } alt='Avatar' style={{ width: '100%' }} />
                <div className='box-body'>
                  <div className='row'>
                    <div className='c-medium-12 c-xsmall-12' id='pd-0'><p><b>Spaghetti</b></p></div>
                  </div><hr/>
                  <div className='row'>
                    <div className='c-medium-6 c-xsmall-6' id='pd-0'><p><b>&#8358;1000</b></p></div>
                    <div className='c-medium-6 c-xsmall-6' id='pd-0'>
                      <button className='button warning'>
                        <Link to='/confirm-order'>Order Meal</Link>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='c-medium-3 c-xsmall-12 c-3' id='pd-0'>
              <div className='box'>
                <img src={ image } alt='Avatar' style={{ width: '100%' }} />
                <div className='box-body'>
                  <div className='row'>
                    <div className='c-medium-12 c-xsmall-12' id='pd-0'><p><b>Spaghetti</b></p></div>
                  </div><hr/>
                  <div className='row'>
                    <div className='c-medium-6 c-xsmall-6' id='pd-0'><p><b>&#8358;1000</b></p></div>
                    <div className='c-medium-6 c-xsmall-6' id='pd-0'>
                      <button className='button warning'>
                        <Link to='/confirm-order'>Order Meal</Link>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='c-medium-3 c-xsmall-12 c-3' id='pd-0'>
              <div className='box'>
                <img src={ image } alt='Avatar' style={{ width: '100%' }} />
                <div className='box-body'>
                  <div className='row'>
                    <div className='c-medium-12 c-xsmall-12' id='pd-0'>
                      <p><b>Eba and Egusi Soup</b></p>
                    </div>
                  </div><hr/>
                  <div className='row'>
                    <div className='c-medium-6 c-xsmall-6' id='pd-0'><p><b>&#8358;1000</b></p></div>
                    <div className='c-medium-6 c-xsmall-6' id='pd-0'>
                      <button className='button warning'>
                        <Link to='/confirm-order'>Order Meal</Link>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>

          </div>
      </div><br/><hr/>

      <Pagination/>
      </div>
    );
  }
}

export default MenuMeal;
