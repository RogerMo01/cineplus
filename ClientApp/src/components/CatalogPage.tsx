import React, { useState } from "react";
import TopicList from "./TopicList";
import { Criterion, Movie } from "../types/types";
import "./CatalogPage.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

function CatalogPage() {
  const movies: Movie[] = [
    {
      id: 1,
      title: "Inception",
      year: 2010,
      country: "United States",
      director: "Christopher Nolan",
      actors: [
        { id: 101, name: "Leonardo DiCaprio" },
        { id: 102, name: "Joseph Gordon-Levitt" },
        // Agrega más actores si es necesario
      ],
      genres: [
        { id: 201, name: "Sci-Fi" },
        { id: 202, name: "Action" },
        // Agrega más géneros si es necesario
      ],
      duration: 148,
    },
    {
      id: 2,
      title: "The Shawshank Redemption",
      year: 1994,
      country: "United States",
      director: "Frank Darabont",
      actors: [
        { id: 103, name: "Tim Robbins" },
        { id: 104, name: "Morgan Freeman" },
        // Agrega más actores si es necesario
      ],
      genres: [
        { id: 203, name: "Drama" },
        { id: 204, name: "Crime" },
        // Agrega más géneros si es necesario
      ],
      duration: 142,
    },
    {
      id: 3,
      title: "The Godfather",
      year: 1972,
      country: "United States",
      director: "Francis Ford Coppola",
      actors: [
        { id: 105, name: "Marlon Brando" },
        { id: 106, name: "Al Pacino" },
        // Agrega más actores si es necesario
      ],
      genres: [
        { id: 205, name: "Crime" },
        { id: 206, name: "Drama" },
        // Agrega más géneros si es necesario
      ],
      duration: 175,
    },
    {
      id: 4,
      title: "Pulp Fiction",
      year: 1994,
      country: "United States",
      director: "Quentin Tarantino",
      actors: [
        { id: 107, name: "John Travolta" },
        { id: 108, name: "Samuel L. Jackson" },
        // Agrega más actores si es necesario
      ],
      genres: [
        { id: 207, name: "Crime" },
        { id: 208, name: "Drama" },
        // Agrega más géneros si es necesario
      ],
      duration: 154,
    },
    {
      id: 5,
      title: "Forrest Gump",
      year: 1994,
      country: "United States",
      director: "Robert Zemeckis",
      actors: [
        { id: 109, name: "Tom Hanks" },
        { id: 110, name: "Robin Wright" },
        // Agrega más actores si es necesario
      ],
      genres: [
        { id: 209, name: "Drama" },
        { id: 210, name: "Romance" },
        // Agrega más géneros si es necesario
      ],
      duration: 142,
    },
  ];

  const criteria: Criterion[] = [
    {
      id: "1",
      name: "Aleatorio",
    },
    {
      id: "2",
      name: "Pura adrenalina",
    },
    {
      id: "3",
      name: "Dramas",
    },
  ];

  const [key, setKey] = useState("1");

  return (
    // <Container className="full-container border rounded">
    <div>
      <h2 className="text-center mb-5 mt-5 text-">Catálogo</h2>

      <Tabs
        id="main"
        activeKey={key}
        onSelect={(k) => {
          if (k) setKey(k);
        }}
        className="mb-3"
      >
        {criteria.map((c) => (
          <Tab key={c.id} eventKey={c.id} title={c.name}>
            <div className="topic-slider">
              <TopicList header={c.name} movies={movies} />
            </div>
          </Tab>
        ))}
      </Tabs>
    </div>
    // </Container>
  );
}

export default CatalogPage;
