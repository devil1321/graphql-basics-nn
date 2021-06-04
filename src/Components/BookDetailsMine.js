import React from 'react'
import { graphql,useQuery } from 'react-apollo'
import { getBookQuery } from '../queries/queries'

const BookDetailsMine = ({id}) => {

    const { loading, error, data } = useQuery(getBookQuery, {
        variables: { id },
      });
      console.log(data)
    return (
        <div className="book__details">
            {id !== null ? 
                <React.Fragment>
                {loading ? (
                    <p>Loading Details...</p>
                ):
                (
                   <div>
                       <h3>Book Details</h3>
                       <p>Book Name: {data.book.name}</p>
                       <p>Book Genre: {data.book.genre}</p>

                       <h3>Author Details</h3>
                       <p>Author : {data.book.author.name}</p>
                       <p>Author Age: {data.book.author.age}</p>
                       <h3>Author Books</h3>
                       <ul className="author__list">
                            {data.book.author.books.map(book => <li>{book.name}</li>)}
                       </ul>
                   </div>
                )
            }</React.Fragment> : null}
        </div>
    )
}

export default graphql(getBookQuery)(BookDetailsMine)

