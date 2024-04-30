import React, { useState, useEffect } from "react";
import { Container, Button, Spinner } from "react-bootstrap"; // Aggiunto Spinner da react-bootstrap
import CreatePostForm from "./components/CreatePostForm";
import Header from "./components/Header";
import PostList from "./components/PostList";
import Footer from "./components/Footer";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false); // Aggiunto stato per indicare se il caricamento è in corso

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  const fetchPosts = (page = 1, perPage = 12) => {
    setLoading(true); // Imposta lo stato di caricamento su true prima di effettuare la richiesta
    fetch(`http://localhost/e-commerce/wp-json/wp/v2/posts?_embed&page=${page}&per_page=${perPage}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore durante il recupero dei post");
        }
        const totalPages = parseInt(response.headers.get("X-WP-TotalPages"), 10);
        setTotalPages(totalPages);
        return response.json();
      })
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => console.error("Errore durante il recupero dei post:", error))
      .finally(() => setLoading(false)); // Imposta lo stato di caricamento su false dopo che la richiesta è stata completata
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
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="">
      <Container className="py-4">
        <Header onOpenCreateForm={() => setShowCreateForm(true)} />
        <div className="pagination mb-3 d-flex justify-content-center">
          <Button className="me-2 " variant="outline-primary" onClick={handlePrevPage} disabled={currentPage === 1}>
            <i class="bi bi-arrow-left text-white"></i>
          </Button>{" "}
          <span className="page-number d-flex align-items-center">{currentPage}</span>{" "}
          {/* Visualizza il numero della pagina corrente */}
          <Button
            className="ms-2 "
            variant="outline-primary"
            onClick={handleNextPage}
            disabled={currentPage >= totalPages}
          >
            <i class="bi bi-arrow-right text-white"></i>
          </Button>
        </div>
        {loading ? ( // Mostra lo spinner se il caricamento è in corso
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="sr-only"></span>
            </Spinner>
          </div>
        ) : (
          <div>
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
            <Footer />
          </div>
        )}
      </Container>
    </div>
  );
};

export default App;
