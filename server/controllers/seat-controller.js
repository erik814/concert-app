require('dotenv').config()
const bodyParser = require('body-parser');

module.exports = {
    getBand(req, res) {
        const { searchQuery } = req.body;
        const seatGeek = `https://api.seatgeek.com/2/performers?q=${searchQuery}&client_id=${process.env.REACT_APP_SG_CLIENT}&client_secret=${process.env.REACT_APP_SG_SECRET}`

        fetch(seatGeek)
            .then(res => res.json())
            .then(data => res.send(data))
            .catch(error => console.error(error));
    },

    getShows(req, res) {
        const { searchQuery } = req.body;
        const seatGeek = `https://api.seatgeek.com/2/events?q=${searchQuery}&client_id=${process.env.REACT_APP_SG_CLIENT}&client_secret=${process.env.REACT_APP_SG_SECRET}`

        fetch(seatGeek)
            .then(res => res.json())
            .then(data => res.send(data))
            .catch(error => console.error(error));
    }
}