
import React, { useState } from 'react';
import { BandList } from "./components"

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
            // set state variables using showsData and bandData
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
                <form onSubmit={handleSubmit}>
                    <label>
                        Search Band:
                        <input type="text" value={searchQuery} onChange={handleInputChange} />
                    </label>
                    <button type="submit">Search</button>
                </form>

                <div className='band-list'>
                    <BandList.jsx user={user} />
                </div>
            </div>

            <div className='search-right'>
                <div className='band-header'>
                    <img src={bandResults.performers?.[0].image}/>
                </div>

                <div className='show-results'>
                    {showResults.events?.map((event) => (
                        <div className='results' key={event.id}>
                            <p>{event.datetime_local}</p>
                            <p>{event.venue.name}</p>
                            <p>{event.venue.city}, {event.venue.state}</p>
                            {event.performers?.map((band) => (
                                <div key={band.id}>
                                    <p>{band.name}</p>
                                </div>
                            ))}
                            <div>
                                <a href={event.url} target='blank'>Get Tickets</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SearchPage