import React, { useEffect,useState } from 'react'
import  NewsItem  from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


const  News = (props)=>{
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
   

    const updateNews=async()=>{
      props.setProgress(10);
      let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`;
      setLoading(true);
      // document.title=props.category;
      let data=await fetch(url);
      props.setProgress(30);
      let parsedData= await data.json();
      props.setProgress(70);
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setLoading(false);
      props.setProgress(100);

    }

    // In place of componentDidMount we are using useEffect
    useEffect(() => {
        updateNews();
    }, [updateNews])

    // async componentDidMount(){
    //   props.setProgress(10);
    //   let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`;
    //   this.setState({loading:true})
      document.title=props.category;
    //   let data=await fetch(url);
    //   props.setProgress(30);
    //   let parsedData= await data.json();
    //   props.setProgress(70);
    //   this.setState({
    //     articles:parsedData.articles,
    //     totalResults:parsedData.totalResults,
    //     loading:false
    //   })
    //   props.setProgress(100);
    // }

    // const handlePrev=async()=>{
        
    //     setPage(page-1);
    //     updateNews();
    //   }

    // const handleNxt=async()=>{
    //  
    //     setPage(page+1);
    //     updateNews();
    //   
    // }

    const fetchMoreData = async() => {
      // this.setState({
      //   page:this.state.page+1
      // })
      setPage(page+1)
      let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
      let data=await fetch(url);
      let parsedData= await data.json();
      setArticles(articles.concat(parsedData.articles));
      setTotalResults(parsedData.totalResults);
    }

        return (
            <>
            
                <h1 className='text-center my-3'>Top Headlines</h1>
                {loading && <Spinner/>}
                
                <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
                <div className="row">
                  {articles.map((element)=>{
                    return <div className="col-md-4" key={element.url}>
                    <NewsItem title={element.title?element.title:''} description={element.description?element.description:''} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author?element.author:"Unknown"} date={element.publishedAt} />
                </div>
                  })}
                  </div>
                  </div>
         </InfiniteScroll>
       
                {/* <div className='container d-flex justify-content-between'>
                    <button type="button" disabled={this.state.page<=1} onClick={this.handlePrev} className="btn btn-success">&larr; Previous</button>
                    <button type="button" disabled={this.state.page+1>Math.ceil(this.state.totalResults/props.pageSize)} onClick={this.handleNxt} className="btn btn-success">Next &rarr;</button>
                </div> */}
                

            </>
        )
    }

News.defaultProps={
  country:'in',
  pageSize:8,
  category:'general'
}

News.propTypes={
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}
export default News

// import React, { Component } from 'react'
// import NewsItem from './NewsItem'
// import Spinner from './Spinner';
// import PropTypes from 'prop-types'
// import InfiniteScroll from "react-infinite-scroll-component";

// export class News extends Component {
//     static defaultProps = {
//         country: 'in',
//         pageSize: 8,
//         category: 'general',
//     }

//     static propTypes = {
//         country: PropTypes.string,
//         pageSize: PropTypes.number,
//         category: PropTypes.string,
//     }
//     capitalize = (string) => {
//         return string.charAt(0).toUpperCase() + string.slice(1);
//     }
//     constructor(props) {
//         super(props);
//         this.state = {
//             articles: [],
//             loading: true,
//             page: 1,
//             totalResults: 0
//         }
//         document.title = `${this.capitalize(this.props.category)}`;
//     }

//     async updateNews() {
//         this.props.setProgress(10);
//         const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
//         this.setState({ loading: true });
//         let data = await fetch(url);
//         this.props.setProgress(30);
//         let parsedData = await data.json()
//         this.props.setProgress(70);
//         this.setState({
//             articles: parsedData.articles,
//             totalResults: parsedData.totalResults,
//             loading: false, 
//         })
//         this.props.setProgress(100);

//     }
//     async componentDidMount() {
//         this.updateNews();
//     }

//     handlePrevClick = async () => {
//         this.setState({ page: this.state.page - 1 });
//         this.updateNews();
//     }

//     handleNextClick = async () => {
//         this.setState({ page: this.state.page + 1 });
//         this.updateNews()
//     }

//     fetchMoreData = async () => {  
//         this.setState({page: this.state.page + 1})
//         const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
//         let data = await fetch(url);
//         let parsedData = await data.json()
//         this.setState({
//             articles: this.state.articles.concat(parsedData.articles),
//             totalResults: parsedData.totalResults
//         })
//       };

//     render() {
//         return (
//             <>
//                 <h1 className="text-center" style={{ margin:'35px 0px'}}>Top {this.capitalize(this.props.category)} Headlines</h1>
//                 {this.state.loading && <Spinner />}
//                 <InfiniteScroll
//                     dataLength={this.state.articles.length}
//                     next={this.fetchMoreData}
//                     hasMore={this.state.articles.length !== this.state.totalResults}
//                     loader={<Spinner/>}
//                 > 
//                     <div className="container">
                         
//                     <div className="row">
//                         {this.state.articles.map((element) => {
//                             return <div className="col-md-4" key={element.url}>
//                                 <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author?element.author:"Unknown"} date={element.publishedAt} />
//                             </div>
//                         })}
//                     </div>
//                     </div> 
//                 </InfiniteScroll>

//             </>
//         )
//     }
// }

// export default News
