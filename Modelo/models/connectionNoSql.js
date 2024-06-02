const { mongoose } = require('mongoose')
require('dotenv').config()

const db = async () => {
    await mongoose.connect(process.env.MONGO_URL)
        .then(() => console.log("DB connected"))
        .catch((error) => console.error(error))
};

module.exports = {
    db
}
