import express from 'express';
import cors from 'cors';

export const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
    console.log('Server started on http://localhost:3003');
});