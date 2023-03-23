
import React, { useState, useEffect } from 'react';

const BandList = ({user, setBandResults, setShowResults}) => {
    const [bandList, setBandList] = useState([])

    useEffect(() => {
        function getBands() {
            fetch(`/api/band/${user._id}`)
                .then(res => res.json())
                .then(data => {
                    setBandList(data.bands)
                    console.log('bandlist: ', bandList)
                })
                .catch(err => console.error(err));
        }

        if (user) {
            getBands()
        }
    }, [user])


        const handleClick = (searchQuery) => {
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
            })
            .catch(error => console.error(error));
        };

    return (
        <div>
            {bandList.map((band) => (
                <button key={band._id} onClick={() => {handleClick(band.name)}}>{band.name}</button>
            ))}
        </div>
    )
}

export default BandList