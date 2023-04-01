import React, { useState, useEffect } from "react";
import Article from "./Article";
import Form from "./Form";
import Pagination from './Pagination';
const Articles = () => {
  const [news, setNews] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [currentPage,setCurrentPage]=useState(1);
  const [postsPerPage, setPostsPerPage]=useState(5);
  const[totalResult,setTotalResult]=useState();
  const[errorMsg,setErrorMsg]=useState("");
  let url;

  async function getNews() {
    try {
      // url.searchParams.set('page', page);
      let res = await fetch(url);
      let data = await res.json();
      setTotalResult(res.totalResults)
    
     if(res.status ==200){
      setNews(data.articles);
      if(data.articles.length === 0){
        setErrorMsg("검색된 결과 값이 없습니다.")
       
      }
    }else{
      setErrorMsg(data.message)
      console.log(data.message)
      throw new Error(data.message);
    }
   
     
      

    } catch (e) {
     
      
      console.log(e.Error);
    }
  }

  async function getLatestNews() {
    url = new URL(
      `https://newsapi.org/v2/top-headlines?countr=us&pageSize=${totalResult}&apiKey=e9e6b1a12aa54dd5bff096fc2f99ee54`

    );
    await getNews();
    if(!await getNews()){
      url = new URL(
        `https://newsapi.org/v2/everything?q=keyword&apiKey=4c4a76bd28a24c998f04964da74b0b79`
      );
      await getNews();
    }
   
   
  }

  async function getNewsByTopic(evt) {
    evt.preventDefault();
    let topic = evt.target.textContent.toLowerCase();
    console.log(topic);
    url = new URL(
      `https://newsapi.org/v2/top-headlines?category=${topic}&country=us&apiKey=e9e6b1a12aa54dd5bff096fc2f99ee54`
    );
    await getNews();
  }
  
  async function getNewsByKeyword(keyword) {
    url = new URL(
      `https://newsapi.org/v2/everything?q=${keyword}&from=2023-03-27&sortBy=popularity&apiKey=e9e6b1a12aa54dd5bff096fc2f99ee54`
    );

    await getNews();
  }

  useEffect(() => {
    getLatestNews();
    getNewsByKeyword();
  }, []);

  const indexOfLastPost=currentPage *postsPerPage;
  const indexOfFirstPost=indexOfLastPost - postsPerPage;
  const currentPosts=news.slice(indexOfFirstPost,indexOfLastPost)
  const paginate=(pageNumber)=>setCurrentPage(pageNumber)






  return (
    <div>
      <Form
        getNewsByTopic={getNewsByTopic}
        getNewsByKeyword={getNewsByKeyword}
        errorMsg={errorMsg}
      />
      { currentPosts.map((each) => (
        <Article
          author={each.author}
          title={each.title}
          description={each.description}
          publishedAt={each.publishedAt}
          urlToImage={each.urlToImage}
          url={each.url}
          errorMsg={errorMsg}
        />
      ))}
      <Pagination postPerPage={postsPerPage} totalPosts={news.length} paginate={paginate} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    </div>
  );
};

export default Articles;
