import React,{useEffect, useState} from 'react'
import APIService from './APIService'
import { useCookies } from 'react-cookie'

const Form = ({updatedInformation,article,insertedInformation}) => {
    const [title,setTitle]=useState('')
    const [description,setDiscription]=useState('')
    const [token]=useCookies(['mytoken'])

    const updateArticle=()=>{
        APIService.UpdateArticle(article.id,{title,description},token['mytoken'])
        .then(resp=>updatedInformation(resp))
        setTitle('')
        setDiscription('')
    }

    useEffect(()=>{
        setTitle(article.title)
        setDiscription(article.description)
    },[article])

    const insertArticle=()=>{
        APIService.InsertArticle({title,description},token['mytoken'])
        .then(resp=>insertedInformation(resp))
        setTitle('')
        setDiscription('')
    }


    return (
        <div>
            {article ?(
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" value={title} onChange={e=>setTitle(e.target.value)}  className="form-control" id="title" placeholder="Please Enter The Title"/>
                        <br/>
                        <label htmlFor="title" className="form-label">Description</label>
                        <textarea value={description} onChange={e=>setDiscription(e.target.value)} className="form-control" id="description" rows="5" ></textarea>
                        <br/>
                        {
                            article.id? <button onClick={updateArticle} className="btn btn-warning">Update Article</button> : <button onClick={insertArticle} className="btn btn-warning">Insert Article</button>
                        }
                        
                    </div>
                ) : null}
        </div>
    )
}

export default Form
