import React, { useState } from "react";
import "../App.css";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Alert from 'react-bootstrap/Alert';

const Form = ({ getNewsByTopic, getNewsByKeyword ,errorMsg}) => {
  const [string, setString] = useState("");
  async function topicNews(evt) {
    await getNewsByTopic(evt);
  }

  function keywordNews(e) {
    const keyword = e.target.value;
    console.log(keyword);
    setString(keyword);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await getNewsByKeyword(string);
    // setKeyword(string)
    // console.log(string)
  }

  return (
    <div className="Form-body">
       
      <form onSubmit={handleSubmit} className="Form-form">
        <input
          onChange={keywordNews}
          className="search-input"
          type="text"
          placeholder="Search"
        />
        <button className="searchBtn">Go</button>
      </form>
      <form className="menus">
        <button onClick={topicNews}>Business</button>
        <button onClick={topicNews}>Entertainment</button>
        <button onClick={topicNews}>General</button>
        <button onClick={topicNews}>Health</button>
        <button onClick={topicNews}>Science</button>
        <button onClick={topicNews}>Sports</button>
        <button onClick={topicNews}>Technology</button>
      </form>
      <span className={errorMsg?"":'hide'}>
      <Alert key="danger" variant="danger">
           {errorMsg} 
        </Alert>
     </span>
    </div>
  );
};

export default Form;
