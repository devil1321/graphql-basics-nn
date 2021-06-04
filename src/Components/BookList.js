import React,{useEffect,useState} from 'react'
import { graphql } from 'react-apollo'
import { getBooksQuery } from '../queries/queries'
import BookDetails from '../Components/BookDetails'

const BookList = ({data}) => {
    const { books, loading } = data
    const [id,setId] = useState(null)

    const handleDetails = (id) =>{  
        setId(id)
    }

    const displayBooks = () =>{
        if(loading){
            return <div>Loading Books...</div>
        }else{
            return books.map(book=>{
                const { id, name } = book
                return (
                    <li onClick={(e)=>{handleDetails(id)}} key={id}>{name}</li>
                )
            })
        }
    }

    return (
        <div className="book">
            <ul className="book__list">
               {displayBooks()}
            </ul>
            <BookDetails id={id} />
        </div>
    )
}

export default graphql(getBooksQuery)(BookList)
