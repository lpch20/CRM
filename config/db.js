const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const db = await mongoose.connect(
        process.env.MONGODB_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    const url =  `${db.connection.host}:${db.connection.port}`

  } catch (error) {
    console.log(error);
  }
};


module.exports = connectDB