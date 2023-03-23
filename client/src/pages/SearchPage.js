
import React, { useState } from 'react';
import { BandList } from "../components"

const SearchPage = ({user}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [bandResults, setBandResults] = useState([]);
    const [showResults, setShowResults] = useState([]);

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        Promise.all([
            fetch('/api/seat/shows', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ searchQuery }),
            }),
            fetch('/api/seat/band', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ searchQuery }),
            })
        ])
        .then(responses => Promise.all(responses.map(res => res.json())))
        .then(data => {
            const [showsData, bandData] = data;
            setBandResults(bandData);
            setShowResults(showsData);
            addBand();
        })
        .catch(error => console.error(error));
    };

    function addBand() {
        fetch('/api/band', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: searchQuery,
                userId: user._id,
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to create band');
            }
            console.log('Band created successfully');
        })
        .catch(error => console.error(error));
    }

    return (
        <div className='search-page'>
            <div className='search-left'>
                <form className='search-form' onSubmit={handleSubmit}>
                    <input className='search-input' type="text" placeholder='Search A Band' value={searchQuery} onChange={handleInputChange} />
                    <button className='search-button' type="submit">Search</button>
                </form>

                <div>
                    <BandList user={user} setBandResults={setBandResults} setShowResults={setShowResults} />
                </div>
            </div>

            <div className='search-right'>
                <div className='band-header'>
                    <img className='band-image' src={bandResults.performers?.[0].images.huge}/>
                </div>

                <div className='show-results'>
                    {showResults.events?.map((event) => (
                        <div className='results' key={event.id}>
                            <div className='results-left'>
                                <p>{new Date(event.datetime_local).toLocaleString('en-US', { month: 'short', day: 'numeric' })}</p>
                                <p>{new Date(event.datetime_local).toLocaleString('en-us', { weekday: 'short' })} - {new Date(event.datetime_local).toLocaleTimeString().substring(0, 5)}</p>
                            </div>

                            <div className='results-right'>
                                <div className='results-info'>
                                    <p>{event.title}</p>
                                    <p>{event.venue.name} - {event.venue.city}, {event.venue.state}</p>
                                    {/* {event.performers?.map((band) => (
                                        <div key={band.id}>
                                            <p>{band.name}</p>
                                        </div>
                                    ))} */}
                                </div>

                                <div>
                                    <a className='ticket-button' href={event.url} target='blank'>Get Tickets</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SearchPage