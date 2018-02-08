import React from 'react';
import axios from 'axios';
import BookList from './BookList';
import SearchForm from './SearchForm';

export default class Catalog extends React.Component {

    state = { 
        books: [],
        sort: "popularity",
        order: "asc"
    };

    handleSearch = (books) => {
        this.setState({ books: books });
    };

    handleSortColumn = (name, order) => {
        if (this.state.sort != name) {
          order = 'asc';
        }

        var self = this;

        axios.defaults.headers.common['X-Requested-With'] = "XMLHttpRequest";
        axios.get('/', {params: {sort_by: name, order: order }})
          .then(function (response) {
            console.log(response.data);
            self.setState({ books: response.data, sort: name, order: order });
          })
          .catch(function (error) {
            console.log(error);
            alert('Cannot sort events: ', error);
        });
    };

    componentDidMount = () => {
        var self = this;

        axios.defaults.headers.common['X-Requested-With'] = "XMLHttpRequest";
        axios.get('/')
            .then(function (response) {
                console.log(response.data);
                self.setState({ books: response.data })
            })
            .catch(function (error) {
                console.log(error);
            });
    };  

    handleAddToCart = (id) => {

        var self = this;

        axios.defaults.headers.common['X-Requested-With'] = "XMLHttpRequest";
        axios.post('/line_items', {product_id: id})
            .then(function (response) {
                console.log(response);
                window.location = response.headers.location;
             })
            .catch(function (error) {
                console.log(error);
                alert('Cannot sort events: ', error);
        });

    };
    
    render = () => {
        
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                            <SearchForm handleSearch={this.handleSearch} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <BookList books={this.state.books}
                              sort ={this.state.sort}
                              order={this.state.order}
                              handleSortColumn={this.handleSortColumn}
                              handleAddToCart={this.handleAddToCart} />
                    </div>
                </div>
            </div>
        ); 
    };

    
}