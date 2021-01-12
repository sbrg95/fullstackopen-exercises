import React, { useState, useEffect } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import RecommendedBooks from './components/RecommendedBooks';
import { useApolloClient, useLazyQuery, useSubscription } from '@apollo/client';
import { GET_USER, BOOK_ADDED, ALL_BOOKS, ALL_AUTHORS } from './queries';

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const client = useApolloClient();

  const [getUser, userResult] = useLazyQuery(GET_USER);

  const updateCashWith = (query, queryName, newObject, variables) => {
    const includedIn = (set, object) =>
      set.map((p) => p.id).includes(object.id);

    const dataInStore = client.readQuery({
      query,
      variables: variables || null,
    });
    if (!includedIn(dataInStore[queryName], newObject)) {
      client.writeQuery({
        query,
        data: {
          ...dataInStore,
          [queryName]: [...dataInStore[queryName], newObject],
        },
        variables: variables || null,
      });
    }
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      updateCashWith(ALL_BOOKS, 'allBooks', addedBook);
      updateCashWith(ALL_BOOKS, 'allBooks', addedBook, {
        genre: user.favoriteGenre,
      });

      const author = addedBook.author;
      updateCashWith(ALL_AUTHORS, 'allAuthors', author);

      alert(`${addedBook.title} added`);
    },
  });

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token]); // eslint-disable-line

  useEffect(() => {
    if (userResult.data) {
      setUser(userResult.data.me);
    }
  }, [userResult.data]);

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.clear();
    client.clearStore();
    setPage('authors');
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommendations')}>
              recommend
            </button>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>Login</button>
        )}
      </div>
      <Authors show={page === 'authors'} user={user} />
      <Books show={page === 'books'} />
      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setUser={setUser}
      />

      {user && (
        <>
          <NewBook show={page === 'add'} user={user} />
          <RecommendedBooks show={page === 'recommendations'} user={user} />
        </>
      )}
    </div>
  );
};

export default App;
