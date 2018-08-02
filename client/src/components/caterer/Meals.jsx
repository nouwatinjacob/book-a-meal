import React from 'react';
import PropTypes from 'react-proptypes';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

/**
 * Meals class declaration
 *
 * @class Meals
 *
 * @extends {React.Component}
 */
class Meals extends React.Component {
  /**
   * Handles meal deletion
   * 
   * @method handleDelete
   * 
   * @param { object } mealId
   * 
   * @return {void}
     */
  handleDelete = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover the meal!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        this.props.deleteAction(this.props.meals.id);
        swal("Meal Deleted Successfully", {
          icon: "success",
        });
      }
    });
  }
  

  /**
   * Renders Meals component
   *
   * @returns {XML} XML/JSX
   */
  render() {
    const { meals } = this.props;
    return ( 
        <tr>
          <td>{meals.name}</td>
          <td><img src={meals.image} 
          width='60' height='50' /></td>
          <td>{meals.price}</td>
          <td>
          <button className='button warning' style={{ marginRight: '5px' }}>
          <Link to={`/edit-meal/${meals.id}`}>
          <i className="fa fa-pencil"></i>
          </Link>
          </button>
          <button
          onClick={this.handleDelete}
          className='button danger'
          >
            <i className="fa fa-trash"></i>
          </button>
        </td>
        </tr>
    );
  }
}

Meals.propTypes = {
  deleteAction: PropTypes.func.isRequired,
  meals: PropTypes.object.isRequired
};

export default Meals;