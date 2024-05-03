import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Footer from "./Footer";
import Carousel from "react-bootstrap/Carousel";
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import { InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductPage = () => {
  const products = [
    {
      id: 1,
      name: "Scarpe da corsa",
      description: "Scarpe da corsa molto leggere e traspiranti primo",
      price: 59.99,
      imageUrl: "https://via.placeholder.com/300x200?text=Scarpe+da+corsa",
    },
    {
      id: 2,
      name: "Pallone da calcio",
      description: "Pallone da calcio ufficiale per partite di campionato",
      price: 29.99,
      imageUrl: "https://via.placeholder.com/300x200?text=Pallone+da+calcio",
    },
    {
      id: 3,
      name: "Maglia da basket",
      description: "Maglia da basket professionale con design aerodinamico",
      price: 39.99,
      imageUrl: "https://via.placeholder.com/300x200?text=Maglia+da+basket",
    },
    {
      id: 4,
      name: "Scarpe da corsa",
      description: "Scarpe da corsa leggere e traspiranti",
      price: 59.99,
      imageUrl: "https://via.placeholder.com/300x200?text=Scarpe+da+corsa",
    },
    {
      id: 5,
      name: "Pallone da calcio",
      description: "Pallone da calcio ufficiale per partite di campionato",
      price: 29.99,
      imageUrl: "https://via.placeholder.com/300x200?text=Pallone+da+calcio",
    },
    {
      id: 6,
      name: "Maglia da basket",
      description: "Maglia da basket professionale con design aerodinamico",
      price: 39.99,
      imageUrl: "https://via.placeholder.com/300x200?text=Maglia+da+basket",
    },
    {
      id: 7,
      name: "Pallone da calcio",
      description: "Pallone da calcio ufficiale per partite di campionato",
      price: 29.99,
      imageUrl: "https://via.placeholder.com/300x200?text=Pallone+da+calcio",
    },
    {
      id: 8,
      name: "Maglia da basket",
      description: "Maglia da basket professionale con design aerodinamico",
      price: 39.99,
      imageUrl: "https://via.placeholder.com/300x200?text=Maglia+da+basket",
    },
    {
      id: 9,
      name: "Scarpe da corsa",
      description: "Scarpe da corsa molto leggere e traspiranti",
      price: 69.99,
      imageUrl: "https://via.placeholder.com/300x200?text=Scarpe+da+corsa",
    },
    {
      id: 10,
      name: "Pallone da calcio",
      description: "Pallone da calcio ufficiale per partite di campionato",
      price: 29.99,
      imageUrl: "https://via.placeholder.com/300x200?text=Pallone+da+calcio",
    },
    {
      id: 11,
      name: "Maglia da basket",
      description: "Maglia da basket professionale con design aerodinamico",
      price: 39.99,
      imageUrl: "https://via.placeholder.com/300x200?text=Maglia+da+basket",
    },
    {
      id: 12,
      name: "Scarpe da corsa",
      description: "Scarpe da corsa leggere e traspiranti",
      price: 59.99,
      imageUrl: "https://via.placeholder.com/300x200?text=Scarpe+da+corsa",
    },
    {
      id: 13,
      name: "Pallone da calcio",
      description: "Pallone da calcio ufficiale per partite di campionato",
      price: 29.99,
      imageUrl: "https://via.placeholder.com/300x200?text=Pallone+da+calcio",
    },
    {
      id: 14,
      name: "Maglia da basket",
      description: "Maglia da basket professionale con design aerodinamico",
      price: 39.99,
      imageUrl: "https://via.placeholder.com/300x200?text=Maglia+da+basket",
    },
    {
      id: 15,
      name: "Pallone da calcio",
      description: "Pallone da calcio ufficiale per partite di campionato",
      price: 29.99,
      imageUrl: "https://via.placeholder.com/300x200?text=Pallone+da+calcio",
    },
    {
      id: 16,
      name: "Maglia da basket",
      description: "Maglia da basket professionale con design aerodinamico",
      price: 39.99,
      imageUrl: "https://via.placeholder.com/300x200?text=Maglia+da+basket",
    },
    {
      id: 17,
      name: "Scarpe da corsa",
      description: "Scarpe da corsa molto leggere e traspiranti",
      price: 79.99,
      imageUrl: "https://via.placeholder.com/300x200?text=Scarpe+da+corsa",
    },
    {
      id: 18,
      name: "Pallone da calcio",
      description: "Pallone da calcio ufficiale per partite di campionato",
      price: 29.99,
      imageUrl: "https://via.placeholder.com/300x200?text=Pallone+da+calcio",
    },
    {
      id: 19,
      name: "Maglia da basket",
      description: "Maglia da basket professionale con design aerodinamico",
      price: 39.99,
      imageUrl: "https://via.placeholder.com/300x200?text=Maglia+da+basket",
    },
    {
      id: 20,
      name: "Scarpe da corsa",
      description: "Scarpe da corsa leggere e traspiranti",
      price: 59.99,
      imageUrl: "https://via.placeholder.com/300x200?text=Scarpe+da+corsa",
    },
    {
      id: 21,
      name: "Pallone da calcio",
      description: "Pallone da calcio ufficiale per partite di campionato",
      price: 29.99,
      imageUrl: "https://via.placeholder.com/300x200?text=Pallone+da+calcio",
    },
    {
      id: 22,
      name: "Maglia da basket",
      description: "Maglia da basket professionale con design aerodinamico",
      price: 39.99,
      imageUrl: "https://via.placeholder.com/300x200?text=Maglia+da+basket",
    },
    {
      id: 23,
      name: "Pallone da calcio",
      description: "Pallone da calcio ufficiale per partite di campionato",
      price: 29.99,
      imageUrl: "https://via.placeholder.com/300x200?text=Pallone+da+calcio",
    },
    {
      id: 24,
      name: "Maglia da basket",
      description: "Maglia da basket professionale con design aerodinamico",
      price: 39.99,
      imageUrl: "https://via.placeholder.com/300x200?text=Maglia+da+basket",
    },
  ];
  console.log(products);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [showCarousel, setShowCarousel] = useState(true);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setShowCarousel(term === "" && minPrice === "" && maxPrice === "");
  };

  const handleMinPriceChange = (e) => {
    const price = e.target.value;
    setMinPrice(price);
    setShowCarousel(searchTerm === "" && price === "" && maxPrice === "");
  };

  const handleMaxPriceChange = (e) => {
    const price = e.target.value;
    setMaxPrice(price);
    setShowCarousel(searchTerm === "" && minPrice === "" && price === "");
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (minPrice === "" || product.price >= parseFloat(minPrice)) &&
      (maxPrice === "" || product.price <= parseFloat(maxPrice))
  );

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">MyShop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/products">Products</Nav.Link>
            <Nav.Link href="/cart">Cart</Nav.Link>
            <Nav.Link href="/admin">Admin</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container className="mt-4">
        <div className="mb-4"></div>{" "}
        <Form>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Cerca prodotti..."
              aria-label="Cerca prodotti..."
              aria-describedby="basic-addon1"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <FormControl
              placeholder="Prezzo minimo"
              aria-label="Prezzo minimo"
              aria-describedby="basic-addon2"
              value={minPrice}
              onChange={handleMinPriceChange}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <FormControl
              placeholder="Prezzo massimo"
              aria-label="Prezzo massimo"
              aria-describedby="basic-addon3"
              value={maxPrice}
              onChange={handleMaxPriceChange}
            />
          </InputGroup>
        </Form>
        {showCarousel ? (
          <Carousel
            interval={8000}
            indicators={false}
            prevIcon={
              <span aria-hidden="true" className="carousel-control-prev-icon" />
            }
            nextIcon={
              <span aria-hidden="true" className="carousel-control-next-icon" />
            }
            prevLabel=""
            nextLabel=""
          >
            {[...Array(Math.ceil(products.length / 8))].map((_, index) => (
              <Carousel.Item key={index}>
                <div className="my-4 d-flex justify-content-center">
                  <div className="d-flex flex-wrap">
                    {products
                      .slice(index * 8, (index + 1) * 8)
                      .map((product) => (
                        <div key={product.id} className="mx-2 mb-4">
                          <Card style={{ width: "18rem" }}>
                            <Card.Img
                              variant="top"
                              src={product.imageUrl}
                              alt={product.name}
                            />
                            <Card.Body>
                              <Link to={`/products/${product.id}`}>
                                <Card.Title>{product.name}</Card.Title>
                              </Link>
                              <Card.Text>{product.description}</Card.Text>
                              <Card.Text>
                                Prezzo: €{product.price.toFixed(2)}
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </div>
                      ))}
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <div className="my-4 d-flex justify-content-center">
            <div className="d-flex flex-wrap">
              {filteredProducts.map((product) => (
                <div key={product.id} className="mx-2 mb-4">
                  <Card style={{ width: "18rem" }}>
                    <Card.Img
                      variant="top"
                      src={product.imageUrl}
                      alt={product.name}
                    />
                    <Card.Body>
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text>{product.description}</Card.Text>
                      <Card.Text>Prezzo: €{product.price.toFixed(2)}</Card.Text>
                      {/* Sostituisci ProductDetailPage con un link */}
                      <Link
                        to={`/products/${product.id}`}
                        className="btn btn-primary"
                      >
                        Dettagli
                      </Link>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default ProductPage;
