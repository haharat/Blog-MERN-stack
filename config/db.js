const mongoose = require("mongoose");

//const URI = `mongodb+srv://deepdive_admin123:zfkQPmGudlRQRBzg@cluster0.ph5wz.mongodb.net/UserDB?retryWrites=true&w=majority`;
const URI = `mongodb+srv://user_2:iGfHyE6YkJCogSs7@cluster0.fvzcv.mongodb.net/StoryBook_Users?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
