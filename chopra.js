const axios = require('axios');


axios.get('http://wisdomofchopra.com/')
    .then(response => {
        console.log(response);
    })
    .catch(err => {
        console.log(err);
    });