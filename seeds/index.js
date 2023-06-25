const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30) + 10;
        const camp = new Campground({
            author: "649584552b4acff8ef0cf212",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            price: price,
            geometry: {
                type: 'Point',
                coordinates: [cities[random1000].longitude, cities[random1000].latitude]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dfsjcrbfz/image/upload/v1686870687/YelpCamp/amhwsc0elnsj0ng2qegy.jpg',
                    filename: 'YelpCamp/amhwsc0elnsj0ng2qegy',
                },
                {
                    url: 'https://res.cloudinary.com/dfsjcrbfz/image/upload/v1686868061/YelpCamp/tkugyrjrc3ajxbkxrngs.jpg',
                    filename: 'YelpCamp/tkugyrjrc3ajxbkxrngs',
                }
            ],
            description: `Nestled amidst a lush forest, the random campground is a haven for outdoor enthusiasts seeking an escape into nature. The campsite offers a serene and tranquil environment, with a variety of amenities to ensure a comfortable stay.`
        })
        await camp.save();
    }
}
seedDB().then(() => {
    db.close();
});
