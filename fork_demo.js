const express = require('express');
const { fork } = require('child_process');
const app = express();

app.get('/one', (req, res) => {
    const sum = longComputation();
    res.send({ sum: sum });
})

app.get('/two', async (req, res) => {
    const sum = await longComputerPromise();
    res.send({ sum: sum });
})

app.get('/three', (req, res) => {
    const child = fork('./longtasks.js');
    child.send('start');
    child.on('message', (sum) => {
	res.send({ sum: sum });
    });
});

app.listen(3000, () => console.log('server on port 3000 running'))

function longComputation() {
    let sum = 0;
    for(let i = 0; i < 1e9; i++) {
	sum += i;
    }
    return sum;
}

function longComputerPromise() {
    return new Promise((resolve, reject) => {
	let sum = 0;
	for(let i = 0; i < 1e9; i++) { 
            sum += i;
        }
        resolve(sum);
    })	
}


