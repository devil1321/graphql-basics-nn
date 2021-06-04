import React from 'react'
import { graphql,useQuery } from 'react-apollo'
import { getBookQuery } from '../queries/queries'

const BookDetailsMine = (props) => {

    const displayBookDetails = () =>{
        const { book,loading } = props.data
        if(book){
            if(loading){
                return <h3>Loading Details...</h3>
            }else{
                return  <div>
                          <h3>Book Details</h3>
                          <p>Book Name: {book.name}</p>
                          <p>Book Genre: {book.genre}</p>
                          <h3>Author Details</h3>
                          <p>Author : {book.author.name}</p>
                          <p>Author Age: {book.author.age}</p>
                          <h3>Author Books</h3>
                          <ul className="author__list">
                               {book.author.books.map(book => <li>{book.name}</li>)}
                          </ul>
                      </div>
            }   
        }else{
            return <h3>No Book Selected</h3>
        }
    }

    return (
        <div className="book__details">
         {displayBookDetails()}
        </div>
    )
}

export default graphql(getBookQuery,{
    options:(props)=>{
        return{
            variables:{
                id:props.id
            }
        }
    }
})(BookDetailsMine)

