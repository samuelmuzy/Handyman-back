import { app } from './app';

app.use('/api', (req, res) => {
    res.send('Hello from the API');
});