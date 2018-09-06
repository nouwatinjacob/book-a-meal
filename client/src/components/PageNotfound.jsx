import React from 'react';

/**
 * PageNotFound class declaration
 *
 * @class PageNotFound
 *
 * @extends {React.Component}
 */
class PageNotFound extends React.Component {
  /**
   * Renders PageNotFound component
   *
   * @return {XML} JSX
   */
  render() {
    return (
      <React.Fragment>
        <div className='pageNotFound'>
          <h5 className='text-center'>
          Click <a href='/menus'>here</a> to go to the menus page
          </h5>
        </div>
      </React.Fragment>
    );
  }
}

export default PageNotFound;
