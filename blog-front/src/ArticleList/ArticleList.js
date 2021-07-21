import React from 'react'
import APIService from './APIService'
import { useCookies } from 'react-cookie'

const ArticleList = (props) => {
    const [token]=useCookies(['mytoken'])

    const editBtn=(article)=>{
        props.editBtn(article)
    }

    const deleteArticle=(article)=>{
        APIService.DeleteArticle(article.id,token['mytoken'])
        .then(()=>props.deleteArticle(article))
        .catch(error=>console.log(error))
        
    }

    return (
        <div>
            {
                props.articles && props.articles.map(article => {
                    return (
                        <div key={article.id}>
                            <h2>{article.title}</h2>
                            <p>{article.description}</p>
                            <div className="row">
                                <div className="col-md-2">
                                    <button onClick={()=>editBtn(article)} className="btn btn-primary">Update</button>
                                </div>
                                <div className="col-md-1">
                                    <button onClick={()=>deleteArticle(article)} className="btn btn-danger">Delete</button>
                                </div>
                            </div>
                            <hr className="hrclass"/>
                            
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ArticleList
