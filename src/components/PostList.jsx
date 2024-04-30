import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";

const PostList = ({ posts, onEdit, onDelete }) => {
  return (
    <Row>
      {posts.map((post) => (
        <Col key={post.id} md={4} className="mb-4">
          <Card>
            {post._embedded && post._embedded["wp:featuredmedia"] && (
              <Card.Img variant="top" src={post._embedded["wp:featuredmedia"][0].source_url} alt="Post Image" />
            )}
            <Card.Body>
              <Card.Title dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
              <Card.Text dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
              <Button variant="info" onClick={() => onEdit(post)}>
                Modifica
              </Button>{" "}
              <Button variant="danger" onClick={() => onDelete(post.id)}>
                Elimina
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default PostList;
