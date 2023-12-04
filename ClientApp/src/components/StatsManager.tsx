import React, { useState, useEffect } from "react";
import "./MovieManager.css";
import { Movie, SingleTextModal } from "../types/types";
import MovieFilterForm from "./MovieFilterForm";
import fetch from "../utils/Fetch";
import { PieChart } from 'react-minimal-pie-chart';



interface Props {
    moviesEndpoint: string;
    actorsEndpoint: string;
    genresEndpoint: string;
    statsEndpoint: string;
    pieEndpoint: string;
    topclientsEndpoint: string;
}

interface Duo {
    national: number;
    international: number;
}

interface TopClient {
    nick: string;
    totalSales: number;
}

function StatsManager({ moviesEndpoint, actorsEndpoint, genresEndpoint, statsEndpoint, pieEndpoint, topclientsEndpoint }: Props) {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [actors, setActors] = useState<SingleTextModal[]>([]);
    const [genres, setGenres] = useState<SingleTextModal[]>([]);
    const [count, setCount] = useState<Duo>({ national: 0, international: 0 });
    const [topClients, setTopClients] = useState<TopClient[]>([]);

    useEffect(() => {
        fetch(actorsEndpoint, setActors);
        fetch(genresEndpoint, setGenres);
        fetch(statsEndpoint, setMovies);
        fetch(pieEndpoint, setCount);
        fetch(topclientsEndpoint, setTopClients);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const minColor = count!.national > count!.international ? '#FEBE03' : '#356DFF';
    const maxColor = count!.national > count!.international ? '#356DFF' : '#FEBE03';
    const colorPalette = ['#FEBE03', '#356DFF', '#6D757D', '#ff5733', '#33ff57'];
    return (
        <div className="full-container border rounded" style={{overflowY: 'scroll', maxHeight: '78vh'}}>
            <div className="container">
                <div className='row mb-4'>
                    <div className='col-md-6 col-sm-12'>
                        <div style={{ textAlign: 'center', marginTop: '5px' }}>
                            <h3>Cine Cubano vs. Cine Extranjero</h3>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <div style={{ width: '130px', height: '150px', marginTop: '5px' }} className="img-fluid">
                                    <PieChart
                                        data={[
                                            { title: '', value: count!.national, color: maxColor },
                                            { title: '', value: count!.international, color: minColor },
                                        ]}
                                    />
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
                                        <div style={{ display: 'flex', alignItems: 'left', marginBottom: '10px', marginLeft: '20px' }}>
                                            <div style={{ width: '1em', height: '1em', backgroundColor: maxColor, marginRight: '5px', marginTop: '5px' }}></div>
                                            <span style={{ fontSize: '1em' }}>Cubano:</span>
                                            <span style={{ marginLeft: '0.5em', fontSize: '1em' }}>{count!.national}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'left', marginLeft: '20px' }}>
                                            <div style={{ width: '1em', height: '1em', backgroundColor: minColor, marginRight: '5px', marginTop: '5px' }}></div>
                                            <span style={{ fontSize: '1em' }}>Extranjero:</span>
                                            <span style={{ marginLeft: '0.5em', fontSize: '1em' }}>{count!.international}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6 col-sm-12'>
                        <div style={{ textAlign: 'center', marginTop: '5px' }}>
                            <h3>Clientes con más compras</h3>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <div style={{ width: '130px', height: '150px', marginTop: '5px' }} className="img-fluid">
                                    <PieChart
                                        data={topClients.map((x, index) => ({ title: x.nick, value: x.totalSales, color: colorPalette[index % colorPalette.length] }))}
                                    />
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    {topClients.map((client, index) => (
                                        <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
                                            <div style={{ display: 'flex', alignItems: 'left', marginBottom: '10px', marginLeft: '20px' }}>
                                                <div style={{ width: '1em', height: '1em', backgroundColor: colorPalette[index % colorPalette.length], marginRight: '5px', marginTop: '5px' }}></div>
                                                <span style={{ fontSize: '1em' }}>{client.nick + ':'}</span>
                                                <span style={{ marginLeft: '0.5em', fontSize: '1em' }}>{client.totalSales}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div >
            </div >
            <h2 className="header">Películas Taquilleras</h2>
            <div className="toolButtons">
                <MovieFilterForm
                    setMovies={setMovies}
                    actorsList={actors}
                    genresList={genres}
                    buttonConfig={{
                        className: "align-right",
                        color: "primary",
                        content: <>Filtro</>,
                    }}
                    statsEndpoint={statsEndpoint}
                />
            </div>
            <div className="table-container">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Año</th>
                            <th>País</th>
                            <th>Director</th>
                            <th>Actores</th>
                            <th>Géneros</th>
                            <th>Duración</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {movies.map((movie) => (
                            <tr key={movie.id}>
                                <td>{movie.title}</td>
                                <td>{movie.year}</td>
                                <td>{movie.country}</td>
                                <td>{movie.director}</td>
                                <td>{(movie.actors ? movie.actors.map(a => a.name) : []).map((n, i) => (
                                    <React.Fragment key={i}>
                                        {n}<br />
                                    </React.Fragment>
                                ))}</td>
                                <td>{(movie.genres ? movie.genres.map(g => g.name) : []).map((n, i) => (
                                    <React.Fragment key={i}>
                                        {n}<br />
                                    </React.Fragment>
                                ))}</td>
                                <td>{movie.duration} min</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    );
}

export default StatsManager;
