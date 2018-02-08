import React from 'react';
import Book from './Book';
import SortColumn from './SortColumn';

export default class BookList extends React.Component {

  handleSortColumn = (name, order) => {
    this.props.handleSortColumn(name, order);
  };

  handleAddToCart = (id) =>{
    this.props.handleAddToCart(id);
  }; 


  render = () => {
    var books = [];

    var self = this;
    this.props.books.forEach(function(book) {
      books.push(<Book book={book}
                         key={'book' + book.id}
                         handleAddToCart={self.handleAddToCart} />);
      }
    );


    return(
      <table className="table table-striped" width="auto">
        <thead>
          <tr>
            <th className="col-md-2">Image url</th>          
            <th className="col-md-2 sortable">
            <SortColumn     name="title"
                            text="Title"
                            sort={this.props.sort}
                            order={this.props.order} 
                            handleSortColumn={this.handleSortColumn}
            />
            </th>
            <th className="col-md-6">Description</th>
            <th className="col-md-2 sortable">
            <SortColumn     name="price"
                            text="Price"
                            sort={this.props.sort}
                            order={this.props.order} 
                            handleSortColumn={this.handleSortColumn}
            />
            </th>           
            <th className="col-md-2 sortable">
            <SortColumn     name="popularity"
                            text="Popularity"
                            sort={this.props.sort}
                            order={this.props.order} 
                            handleSortColumn={this.handleSortColumn}
            />
            </th>
            <th className="col-md-2">Actions</th> 
          </tr>
        </thead>
        <tbody>
          {books}
        </tbody>
      </table>
    )
  }
}