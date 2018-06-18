import React from 'react';

/**
 * Search class declaration
 *
 * @class Search
 *
 * @extends {React.Component}
 */
class Search extends React.Component {
  /**
   * Renders Search component
   *
   * @returns {XML} XML/JSX
   */
  render() {
    return (
      <div className='wrapper search'>
          <input type='text' placeholder='Search..' />
      </div>
    );
  }
}

export default Search;
