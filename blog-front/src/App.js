import React, { useState, useEffect } from 'react';
import './App.css';
import ArticleList from './ArticleList/ArticleList';
import Form from './ArticleList/Form';
import { useCookies } from 'react-cookie'
import { useHistory } from 'react-router-dom'

function App() {

  const [articles, setArticles] = useState([])
  const [editArticle, setEditArticles] = useState(null)
  const [token, setToken, removeToken] = useCookies(['mytoken'])
  let history = useHistory()

  useEffect(() => {
    fetch('http://localhost:8000/api/articles/', {
      'method': 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token['mytoken']}`
      }
    })
      .then(resp => resp.json())
      .then(resp => setArticles(resp))
      .catch(error => console.log(error))
  }, [])

  useEffect(() => {
    if (!token['mytoken']) {
      // history.push('/')
      window.location.href='/'
    }
  }, [token])

  const editBtn = (article) => {
    setEditArticles(article)
  }
  const updatedInformation = (article) => {
    const new_article = articles.map(myarticle => {
      if (myarticle.id === article.id) {
        return article;
      }
      else {
        return myarticle;
      }
    })
    setArticles(new_article)
  }

  const articleInsert = () => {
    setEditArticles({ title: '', description: '' })
  }

  const insertedInformation = (article) => {
    const new_articles = [...articles, article]
    setArticles(new_articles)
  }
  const deleteArticle = (article) => {
    const new_articles = articles.filter(myarticle => {
      if (myarticle.id === article.id) {
        return false
      }
      return true;
    })
    setArticles(new_articles)
  }

  const logOut = () => {
    removeToken(['mytoken'])
  }


  return (
    <div className="app">
      <div className="app__row">
        <h1>Django React App</h1>
        <div className="app__col">
          <button onClick={articleInsert} className="btn btn-primary">Insert Article</button>
        </div>
        <div className="app__col">
          <button onClick={logOut} className="btn btn-primary">Log Out</button>
        </div>
      </div>
      <br />
      <br />

      <div className="app__component">
        <div className="app__component__list">
          <ArticleList deleteArticle={deleteArticle} articles={articles} editBtn={editBtn} />
        </div>
        <div className="app__component__1">
          {editArticle ? <Form article={editArticle} updatedInformation={updatedInformation} insertedInformation={insertedInformation} /> : null}
        </div>
      </div>
    </div>
  );
}

export default App;
