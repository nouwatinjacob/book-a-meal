import React from 'react';
import Header from './partials/Header.jsx';


/**
 * App class declaration
 *
 * @class App
 *
 * @extends {React.Component}
 */
class App extends React.Component {
  /**
   * Renders Login component
   *
   * @returns {XML} XML/JSX
   */
  render() {
    return (
       <React.Fragment>
         <Header/>
         { this.props.children }
       </React.Fragment>
    );
  }
}

export default App;

