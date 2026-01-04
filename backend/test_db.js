const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        console.log('Attempting to connect to MongoDB...');
        console.log('URI:', process.env.MONGO_URI.replace(/:([^:@]+)@/, ':****@')); // Log masked URI

        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`SUCCESS: MongoDB Connected: ${conn.connection.host}`);
        process.exit(0);
    } catch (error) {
        console.error(`ERROR: ${error.message}`);
        console.error('Full Error:', error);
        process.exit(1);
    }
};

connectDB();
