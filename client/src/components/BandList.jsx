
import React, { useState, useEffect } from 'react';

const BandList = ({user}) => {
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

    

    return (
        <div>
            {bandList.map((band) => (
                <button key={band._id} onClick={handleSubmit()}>{band.name}</button>
            ))}
        </div>
    )
}

export default BandList