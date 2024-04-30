// import React from "react";
// import { Container, Card, Button } from "react-bootstrap";

// const PostDetails = ({ post, onEdit, onDelete }) => {
//   const imageUrl =
//     post._embedded && post._embedded["wp:featuredmedia"]
//       ? post._embedded["wp:featuredmedia"][0].source_url
//       : "https://via.placeholder.com/150";

//   return (
//     <Container className="py-4">
//       <Card>
//         {imageUrl && <Card.Img variant="top" src={imageUrl} alt="Post Image" />}
//         <Card.Body>
//           <Card.Title dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
//           <Card.Text dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
//           <Button variant="info" onClick={() => onEdit(post)}>
//             Modifica
//           </Button>{" "}
//           <Button variant="danger" onClick={() => onDelete(post.id)}>
//             Elimina
//           </Button>
//         </Card.Body>
//       </Card>
//     </Container>
//   );
// };

// export default PostDetails;
