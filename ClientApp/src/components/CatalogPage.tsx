import React, { useEffect, useState } from "react";
import TopicList from "./TopicList";
import { Criterion, Movie } from "../types/types";
import "./CatalogPage.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import fetch from "./Fetch";
import Spinner from 'react-bootstrap/Spinner';

interface Props {
  modalContent?: React.ComponentType<any>;
}

function CatalogPage({modalContent} : Props) {
  const criteriaEndpoint = '/api/criterion/all';
  const activeCriteriaEndpoint = '/api/activecriterion';
  const scheduleEndpoint = '/api/availableprogramming'

  // Criteria
  const randomMoviesEndpoint = '/api/criterion/random';

  const [criteria, setCriteria] = useState<Criterion[]>([]);
  const [activeCriteria, setActiveCriteria] = useState<{id: number}[]>([]);
  const [randomMovies, setRandomMovies] = useState<Movie[]>([]);

  const [showedCriteria, setShowedCriteria] = useState<Criterion[]>([]);
  const [key, setKey] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      fetch(criteriaEndpoint, setCriteria),
      fetch(activeCriteriaEndpoint, setActiveCriteria),
      fetch(randomMoviesEndpoint, setRandomMovies),
    ]).then(() => {
      setIsLoading(false);
    }).catch((e) => {
      console.error("Error fetching data:", e);
        // En caso de error, también se detiene la carga
        setIsLoading(false);
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  useEffect(() => {
    setShowedCriteria(criteria.filter((criterion) =>
      activeCriteria.some((active) => active.id === criterion.id)
    ))
    if(showedCriteria.length !== 0) setKey(showedCriteria[0].id.toString());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCriteria]);

  useEffect(() => {
    if(showedCriteria.length !== 0) setKey(showedCriteria[0].id.toString());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showedCriteria])
  
  function getMovies(criteria: string) : Movie[] {
    if(criteria === 'Random'){
      return randomMovies;
    }
    else{
      throw new Error('No match in criterion selection');
    }
  }

  return (
    <div>
      <h2 className="text-center mb-5 mt-5 text-">Cartelera</h2>

      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center">
          <Spinner animation="border" variant="dark" />
        </div>
      ) : <Tabs
        id="main"
        activeKey={key}
        onSelect={(k) => {
          console.log('key:' + key)
          if (k) setKey(k);
        }}
        className="mb-3"
        justify
      >
        {showedCriteria.map((c) => (
          <Tab key={c.id} eventKey={c.id} title={c.name}>
            <div className="topic-slider">
              <TopicList topic={c.name} movies={getMovies(c.name)} scheduleEndpoint={scheduleEndpoint} modalContent={modalContent} />
            </div>
          </Tab>
        ))}


      </Tabs>}
    </div>
  );
}

export default CatalogPage;
