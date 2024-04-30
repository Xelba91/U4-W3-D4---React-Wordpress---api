import React from "react";
import { Button } from "react-bootstrap";

const Header = ({ onOpenCreateForm }) => {
  return (
    <div className="mb-4">
      <h1 className="text-center mb-4">Gestione Articoli WordPress</h1>
      <Button variant="primary" onClick={onOpenCreateForm}>
        Crea Nuovo Articolo
      </Button>
    </div>
  );
};

export default Header;
