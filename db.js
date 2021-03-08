//db.js

// const mongoose = require('mongoose')

// const url = `mongodb+srv://Adnan1921:adnanbiberatlas@cluster0.0atn2.mongodb.net/Adnan1921?retryWrites=true&w=majority`;
// const client = new MongoClient(uri);

// await client.connect();
// await listDatabases(client);
// try {
//     await client.connect();

//     await listDatabases(client);

// } catch (e) {
//     console.error(e);
// }
// const connectionParams={
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true 
// }
// mongoose.connect(url,connectionParams)
//     .then( () => {
//         console.log('Connected to database ')
//     })
//     .catch( (err) => {
//         console.error(`Error connecting to the database. \n${err}`);
//     })
//     exports.getUser = function (userId) {

// 	async function runUser() {
// 	  await client.connect();
// 	  const database = client.db(dbName);
// 	  const collection = database.collection(collectionName);
	  
// 	  const findQuery = { shortId: userId };
// 	  const findOneResult = await collection.findOne(findQuery);
// 	  return findOneResult;
// 	  await client.close();
	  
	  
	  
// }
// runUser();
// };
const mongoose = require('mongoose');

const uri = 'mongodb+srv://Adnan1921:adnanbiberatlas@cluster0.0atn2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB Connected…')
})
.catch(err => console.log(err))