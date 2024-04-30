import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const CreatePost = ({ show, onClose, onCreate, onUpdate, editMode, formData }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (editMode) {
      // Se il form è in modalità di modifica e un articolo è stato selezionato, imposta i valori dei campi del form con i dati dell'articolo selezionato
      if (formData) {
        setTitle(formData.title.rendered);
        setContent(formData.content.rendered);
      }
    } else {
      // Altrimenti, reimposta lo stato dei campi del form in modo che siano vuoti
      setTitle("");
      setContent("");
    }
  }, [editMode, formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      onUpdate({ title, content });
    } else {
      onCreate({ title, content });
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{editMode ? "Modifica Articolo" : "Crea Nuovo Articolo"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Titolo</Form.Label>
            <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="content">
            <Form.Label>Contenuto</Form.Label>
            <Form.Control as="textarea" rows={6} value={content} onChange={(e) => setContent(e.target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit">
            {editMode ? "Salva Modifiche" : "Crea Articolo"}
          </Button>{" "}
          <Button variant="secondary" onClick={onClose}>
            Annulla
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreatePost;
