// src/components/PostDetail.jsx
import React from 'react';

const PostDetail = ({ post }) => {
  if (!post) return <div>Caricamento...</div>;

  return (
    <div>
      <h1>{post.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    </div>
  );
};

export default PostDetail;
