import React from 'react'
const  NewsItem =(props)=>{
        let {title,description,imageUrl,newsUrl,author,date}=props;
    return (
      <div className='my-3'>
        <div className="card">
          <img src={imageUrl?imageUrl:'https://i.gadgets360cdn.com/large/oneplus_nord_3_1688545391639.jpg'} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 style={{fontWeight:'bolder'}} className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-body-secondary">By {author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target='blank' className="btn btn-sm btn-primary btn-dark">Read more</a>
          </div>
        </div>
      </div>
    )
    
}

export default NewsItem