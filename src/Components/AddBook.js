import React,{useEffect,useState} from 'react'
import { graphql } from 'react-apollo'
import * as compose from 'lodash.flowright';
import { getAuthorsQuery,getBooksQuery, addBookMutation } from '../queries/queries'

const AddBook = ({getAuthorsQuery,addBookMutation}) => {

    const [formData,setFormData] = useState({
        name:'',
        genre:'',
        authorId:'default',
    })

    const { authors, loading } = getAuthorsQuery
    const { name, genre, authorId} = formData
    const displayAuthors = () =>{
        if(loading){
            return 
        }else{
            return authors.map(author =>{
                const { id, name } = author
                return <option value={id} key={id}>{name}</option>
            })
        }
    }

    const handleChange = (e) =>{
        setFormData(prevState =>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        const { name, genre, authorId } = formData
        addBookMutation({
            variables:{
                name,
                genre,
                authorId
            },
            refetchQueries:[{query:getBooksQuery}]
        })
        setFormData({
            name:'',
            genre:'',
            authorId:'default',
        })
    }
  
    return (
        <div className="book">
            <form className="book__form" onSubmit={(e)=>{handleSubmit(e)}}>
                <div className="book__field">
                    <label htmlFor="name">Book Name:</label>
                    <input type="text" name="name" onChange={(e)=>{handleChange(e)}} value={name}/>
                </div>
                <div className="book__field">
                    <label htmlFor="genre">Genre:</label>
                    <input type="text" name="genre" onChange={(e)=>{handleChange(e)}}  value={genre}/>
                </div>
                <div className="book__field">
                    <label htmlFor="author">Select Author</label>
                    <select name="author" id="author" defaultValue="default" name="authorId" onChange={(e)=>{handleChange(e)}} value={authorId}>
                        <option value="default" disabled>Select Author</option>
                        {displayAuthors()}
                    </select>
                </div>
                <button type="submit">Add Book</button>
            </form>
        </div>
    )
}

export default compose(
    graphql(getAuthorsQuery,{name:"getAuthorsQuery"}),
    graphql(addBookMutation,{name:"addBookMutation"})
)(AddBook)
