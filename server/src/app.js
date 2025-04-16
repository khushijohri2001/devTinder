const express = require('express');

const app = express();

// app.use('/', (req, res) => {
//     res.send('Hello Dev!')
// })

app.use('/test', (req, res) => {
    res.send('Hello Tester2!')
})

app.listen(7777, () => {
    console.log('Listening to port 7777');
    
})