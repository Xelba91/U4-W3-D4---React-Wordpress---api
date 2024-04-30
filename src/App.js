import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import CreatePostForm from "./components/CreatePostForm";
import Header from "./components/Header";
import PostList from "./components/PostList";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    fetch("http://localhost/e-commerce/wp-json/wp/v2/posts?_embed")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Errore durante il recupero dei post:", error));
  };

  const handleCreate = (formData) => {
    fetch("http://localhost/e-commerce/wp-json/wp/v2/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa("xelba91:Xaji4qH8sWSBZJWjCD5beJZv")}`,
      },
      body: JSON.stringify({
        title: formData.title,
        content: formData.content,
        status: "publish",
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore durante la creazione del post");
        }
        fetchPosts();
        setShowCreateForm(false);
      })
      .catch((error) => {
        console.error("Errore durante la creazione del post:", error);
      });
  };

  const handleEdit = (post) => {
    setSelectedPost(post);
    setShowCreateForm(true);
    setEditMode(true);
  };

  const handleUpdate = (formData) => {
    fetch(`http://localhost/e-commerce/wp-json/wp/v2/posts/${selectedPost.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa("xelba91:Xaji4qH8sWSBZJWjCD5beJZv")}`,
      },
      body: JSON.stringify({
        title: formData.title,
        content: formData.content,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore durante l'aggiornamento del post");
        }
        fetchPosts();
        setShowCreateForm(false);
        setEditMode(false);
        setSelectedPost(null);
      })
      .catch((error) => {
        console.error("Errore durante l'aggiornamento del post:", error);
      });
  };

  const handleDelete = (postId) => {
    fetch(`http://localhost/e-commerce/wp-json/wp/v2/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa("xelba91:Xaji4qH8sWSBZJWjCD5beJZv")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore durante l'eliminazione del post");
        }
        fetchPosts();
      })
      .catch((error) => {
        console.error("Errore durante l'eliminazione del post:", error);
      });
  };

  return (
    <Container className="py-4">
      <Header onOpenCreateForm={() => setShowCreateForm(true)} />
      <PostList posts={posts} onEdit={handleEdit} onDelete={handleDelete} />
      <CreatePostForm
        show={showCreateForm}
        onClose={() => {
          setShowCreateForm(false);
          setSelectedPost(null);
          setEditMode(false);
        }}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        editMode={editMode}
        formData={selectedPost}
      />
    </Container>
  );
};

export default App;
