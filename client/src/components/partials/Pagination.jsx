import React from 'react';

class Pagination extends React.Component {
  render() {
    return (
      <div className='wrapper search'>
        <div className='pagination'>
          <a href='#'>&laquo;</a>
          <a href='#'>1</a>
          <a className='active' href='#'>2</a>
          <a href='#'>3</a>
          <a href='#'>4</a>
          <a href='#'>5</a>
          <a href='#'>6</a>
          <a href='#'>&raquo;</a>
        </div>
      </div>
    );
  }
}

export default Pagination;
