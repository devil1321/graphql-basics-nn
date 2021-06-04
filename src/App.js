import React from 'react'
import './styles/themes/theme.scss'
import BookList from './Components/BookList'
import AddBook from './Components/AddBook'


import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

const  App = () => {
// apollo client setut

const client = new ApolloClient({
  uri:'http://localhost:4000/graphql'
})

  return (
    <ApolloProvider client={client}>
      <div className="main">
        <h1>Ninjas List</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
