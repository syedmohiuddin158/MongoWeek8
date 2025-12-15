// ===============================
// TASK 1: Connect MongoDB & add single document
// ===============================

mongoose = require('mongoose');
const MONGO_URI = 'mongodb://localhost:27017/Week8';

// Connect to MongoDB (new versions – no options needed)
mongoose.connect(MONGO_URI);

const db = mongoose.connection;

db.on('error', function (err) {
  console.log("Error occured during connection " + err);
});

db.once('connected', function () {
  console.log(`Connected to ${MONGO_URI}`);
});

// ===============================
// Create Schema
// ===============================

const PersonScheme = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  Gender: String,
  Salary: Number
});

// Create Model & Collection
const person_doc = mongoose.model(
  'modelname',
  PersonScheme,
  'personCollection'
);

// ===============================
// TASK 1: Insert SINGLE document
// ===============================

const doc1 = new person_doc({
  name: 'Jacky',
  age: 36,
  Gender: "Male",
  Salary: 3456
});

doc1.save()
  .then((doc) => {
    console.log("Single document added:", doc.name);
  })
  .catch((err) => {
    console.error(err);
  });

// ===============================
// TASK 2: Insert MULTIPLE documents
// ===============================

const manypersons = [
  { name: 'Simon', age: 42, Gender: "Male", Salary: 3456 },
  { name: 'Neesha', age: 23, Gender: "Female", Salary: 1000 },
  { name: 'Mary', age: 27, Gender: "Female", Salary: 5402 },
  { name: 'Mike', age: 40, Gender: "Male", Salary: 4519 }
];

person_doc.insertMany(manypersons)
  .then(function () {
    console.log("Multiple documents inserted");
  })
  .catch(function (error) {
    console.log(error);
  });

// ===============================
// TASK 3: Fetch data using FIND
// 1) Return all documents
// 2) Limit records to 5
// ===============================

person_doc.find().limit(5).exec()
  .then(docs => {
    console.log("TASK 3: Showing first 5 records");
    docs.forEach(function (Doc) {
      console.log(Doc.name, Doc.age, Doc.Gender);
    });
  })
  .catch(err => {
    console.error(err);
  });

// ===============================
// TASK 4: FIND with FILTER
// Gender = Female AND age > given number
// ===============================

const givenage = 25;

person_doc.find({ Gender: "Female", age: { $gt: givenage } }).exec()
  .then(docs => {
    console.log("TASK 4: Female and age greater than", givenage);
    docs.forEach(function (Doc) {
      console.log(Doc.name, Doc.age);
    });
  })
  .catch(err => {
    console.error(err);
  });

// ===============================
// TASK 5: Count total documents
// ===============================

person_doc.countDocuments().exec()
  .then(count => {
    console.log("TASK 5: Total documents count:", count);
  })
  .catch(err => {
    console.error(err);
  });

// ===============================
// TASK 6: Delete documents
// Delete where age >= 25
// ===============================

person_doc.deleteMany({ age: { $gte: 25 } }).exec()
  .then(result => {
    console.log("TASK 6: Deleted documents count:", result.deletedCount);
  })
  .catch(err => {
    console.error(err);
  });

// ===============================
// TASK 7: Update documents
// Update salary of all Female records
// ===============================

person_doc.updateMany(
  { Gender: "Female" },
  { Salary: 5555 }
).exec()
  .then(result => {
    console.log("TASK 7: Updated documents:", result.modifiedCount);
  })
  .catch(err => {
    console.error(err);
  });

