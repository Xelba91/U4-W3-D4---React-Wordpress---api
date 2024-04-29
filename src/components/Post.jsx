import React from 'react';
import { Card, Button } from 'react-bootstrap';

const Post = ({ post }) => {
  // Assumi che post.featured_media_src_url contenga l'URL dell'immagine in evidenza
  // Se non disponi di questa proprietà, potresti doverla recuperare in un altro modo
  let imageUrl = post._embedded && post._embedded['wp:featuredmedia'] 
                         ? post._embedded['wp:featuredmedia'][0].source_url 
                         : 'https://via.placeholder.com/150';

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={imageUrl} alt="Post Image" />
      <Card.Body>
        <Card.Title dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
        <Card.Text as="div" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
        <Button variant="primary" href={post.link} target="_blank">Post Link</Button>
      </Card.Body>
    </Card>
  );
};

export default Post;
