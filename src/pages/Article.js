import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../App.css';

const Article = ({author,title,description,urlToImage,publishedAt,url,errorMsg}) => {
  
  return (
    <div className=' Article-body'>
      
      <Container>
     
<Row className=" Article-row " >
  <Col lg={4} >
    <img className='img' src={urlToImage}/>
  </Col>
  <Col className='Article-col1' lg={8} >
    <h2><a href={url}>{title}</a> </h2>
    <p>{description}</p>
  </Col>
  <div>{author}*{publishedAt}</div>
</Row>
      </Container>

    </div>
  )
}

export default Article