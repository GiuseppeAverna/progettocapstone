import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import { InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";

const Description = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const words = text.split(" ");
  const isLong = words.length > 12;

  const displayText =
    isExpanded || !isLong ? text : words.slice(0, 14).join(" ") + "...";

  return (
    <div>
      {displayText}
      {isLong && (
        <span
          className="expand-collapse-link"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Riduci" : "Estendi"}
        </span>
      )}
    </div>
  );
};

const ProductPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [showCarousel, setShowCarousel] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) navigate("/login");
    fetch("http://localhost:3001/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((response) => response.json())
      .then((data) => setProducts(data.content));
  }, []);

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
      <Header />
      <div className="page-content productpage">
        <Container>
          <div className="mb-4"></div>
          <Form className="products-form">
            <InputGroup>
              <FormControl
                placeholder="Cerca prodotti..."
                aria-label="Cerca prodotti..."
                aria-describedby="basic-addon1"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </InputGroup>

            <InputGroup>
              <FormControl
                type="number"
                placeholder="Prezzo minimo"
                aria-label="Prezzo minimo"
                aria-describedby="basic-addon2"
                value={minPrice}
                onChange={handleMinPriceChange}
              />
            </InputGroup>

            <InputGroup>
              <FormControl
                type="number"
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
              interval={6000}
              indicators={false}
              prevIcon={
                <span
                  aria-hidden="true"
                  className="carousel-control-prev-icon"
                />
              }
              nextIcon={
                <span
                  aria-hidden="true"
                  className="carousel-control-next-icon"
                />
              }
              prevLabel=""
              nextLabel=""
            >
              {[...Array(Math.ceil(products.length / 8))].map((_, index) => (
                <Carousel.Item key={index}>
                  <div className="my-4 d-flex justify-content-center">
                    <div className="d-flex flex-wrap justify-content-center">
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
                                <Description text={product.description || ""} />
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
                        <Description text={product.description || ""} />
                        <Card.Text>
                          Prezzo: €{product.price.toFixed(2)}
                        </Card.Text>

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
      </div>
    </>
  );
};

export default ProductPage;
