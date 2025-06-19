const mongoose = require('mongoose');

main().catch((err) => console.error(err));

async function main() {
    await mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`)
    console.log('Connected to MongoDB successfully',process.env.DB_NAME);
    mongoose.connection.on('error', (err) => {
        console.error('MongoDB connection error:', err);
    });
}