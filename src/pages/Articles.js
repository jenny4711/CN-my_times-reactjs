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
      console.log(data.articles.length)
     if(res.status ==200){
      setNews(data.articles);
      if(data.articles.length === 0){
        setErrorMsg("검색된 결과 값이 없습니다.")
        console.log(errorMsg)
      }
    }else{
      setErrorMsg(data.message)
      throw new Error(data.message);
    }
   
     
      

    } catch (e) {
      setErrorMsg(e)
      
      console.log(e);
    }
  }

  async function getLatestNews() {
    url = new URL(
      `https://newsapi.org/v2/top-headlines?country=us&pageSize=${totalResult}&apiKey=e9e6b1a12aa54dd5bff096fc2f99ee54`
    );
    console.log(news);
    await getNews();
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
