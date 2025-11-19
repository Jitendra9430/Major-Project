const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(() => {
  console.log("connected to DB");
}).catch((err) => {
  console.log(err);
});

async function main() {
  await mongoose.connect(MONGO_URL);
}

const intiDB = async () => {
  await Listing.deleteMany({});
  const ownerId = new mongoose.Types.ObjectId("67fb9c8004a5e397526d37fa");

  const listingsWithOwner = initData.data.map(obj => ({
    ...obj,
    owner: ownerId
  }));

  console.log(listingsWithOwner[0]); 

  await Listing.insertMany(listingsWithOwner);
  console.log("data was initialized");
};

intiDB();