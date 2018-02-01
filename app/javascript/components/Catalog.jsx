import React from 'react';

export default class Catalog extends React.Component {

    state = { books: [] };

    componentDidMount = () => {
        this.setState({ books: this.props.catalog });
    };

    render = () => {
        return(
            <div>
                <ul>
                    There are {this.state.books.length} books in the catalog.
                </ul>
            </div>
        );
    };
}  