import React from 'react';
import LineItems from './LineItems';
import axios from 'axios';

export default class Cart extends React.Component {
  state = {
    id: 0,
    line_items: [],
    total_price: 0
  };

 componentDidMount = () => {
    var self = this;

    axios.defaults.headers.common['X-Requested-With'] = "XMLHttpRequest";
    axios.get('/carts/'+this.props.id)
      .then(function (response) {
        console.log(response.data);
        self.setState({ id: response.data.id });
        self.setState({ total_price: response.data.total_price });
        if(response.data.line_items != undefined) {
          self.setState({ line_items: response.data.line_items });
        } else {
          self.setState({ line_items: [] });
        }


      })
      .catch(function (error) {
        console.log(error);
      });
  };

 handleRemoveFromCart = (id) => {
    var self = this;

    axios.defaults.headers.common['X-Requested-With'] = "XMLHttpRequest";
    axios.patch('/line_items/'+id+'/decrement')
      .then(function (response) {
        console.log(response.data);
        self.setState({ id: response.data.id });
        self.setState({ total_price: response.data.total_price });
        self.setState({ line_items: response.data.line_items });

        // window.location = response.headers.location;
      })
      .catch(function (error) {
        // console.log(error);
        alert('Cannot remove line item: ', error);
    });

  };

 handleEmptyCart = () => {
    var self = this;

    axios.defaults.headers.common['X-Requested-With'] = "XMLHttpRequest";
    axios.delete('/carts/'+this.state.id)
      .then(function (response) {
        console.log(response.data);
        self.setState({ id: response.data.id });
        self.setState({ total_price: response.data.total_price });
        self.setState({ line_items: response.data.line_items });

        // window.location = response.headers.location;
      })
      .catch(function (error) {
        // console.log(error);
        alert('Cannot empty cart: ', error);
    });

  };

  handleCheckout = () => {
    var self = this;

    axios.defaults.headers.common['X-Requested-With'] = "XMLHttpRequest";
    axios.get('/orders/new/')
      .then(function (response) {
        console.log(response.data);
        window.location = response.data.redirect_url;
      });

  };


 handleAddToCart = (cart) => {
    // console.log(cart);
    this.setState({ id: cart.id});
    this.setState({ total_price: cart.total_price});
    this.setState({ line_items: cart.line_items});
    // this.props.updatePop();
  };

 render = () => {
  console.log(this.state.line_items)
    if (this.state.total_price != 0) {
      return(
        <div className="spa_cart">
          <h2>Your Cart</h2>
          <LineItems total_price={this.state.total_price}
                     line_items={this.state.line_items} 
                     handleRemoveFromCart={this.handleRemoveFromCart} />
          <a className="btn btn-primary btn-xs my_button"
             onClick={this.handleEmptyCart} >
            Empty Cart
          </a>
          <a className="btn btn-primary btn-xs my_button"
             onClick={this.handleCheckout} >
            Checkout
          </a>

        </div>
      )
    }
    else {
      return (
        <div className="spa_cart">
          <h2>Your Cart</h2>
        </div>
      );
    }
  }
}