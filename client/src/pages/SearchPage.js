
import React, { useState } from 'react';

const SearchPage = ({user}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

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
        })
        .catch(error => console.error(error));
};

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     fetch('/api/seat/shows', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ searchQuery }),
    //     })
    //         .then(res => res.json())
    //         .then(data => setSearchResults(data))
    //         .catch(error => console.error(error));
    // };

    // // // this search is for the band itself
    // // const handleSubmit = (e) => {
    // //     e.preventDefault();
    // //     fetch('/api/seat/band', {
    // //         method: 'POST',
    // //         headers: {
    // //             'Content-Type': 'application/json',
    // //         },
    // //         body: JSON.stringify({ searchQuery }),
    // //     })
    // //         .then(res => res.json())
    // //         .then(data => setSearchResults(data))
    // //         .catch(error => console.error(error));
    // // };

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
            </div>

            <div className='search-right'>
                <div className='band-header'>
                    <img src={searchResults[0].performers?.image}/>
                </div>

                <div className='show-results'>
                    {searchResults.events?.map((event) => (
                        <div class='results' key={event.id}>
                            <p>{event.datetime_local}</p>
                            <p>{event.venue.name}</p>
                            <p>{event.venue.city}, {event.venue.state}</p>
                            {event.performers?.map((band) => (
                                <div key={band.id}>
                                    <p>{band.name}</p>
                                </div>
                            ))}
                            <div>
                                <a href={event.url}>Get Tickets</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* <p>{searchResults.performers?.[0].name}</p>
            <img src={searchResults.performers?.[0].image} alt={searchResults.performers?.[0].name}/>
            <div>
                <a href={searchResults.performers?.[0].url}>Get Tickets</a>
            </div> */}

        </div>
    )
}

export default SearchPage