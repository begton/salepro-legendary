// MongoDB Database Initialization Script for SRMS
//
// This script initializes the SRMS database with:
// - Database: SRMS
// - Collections: users, customers, products, sales
// - Default admin user: admin / admin123
//
// Prerequisites:
// 1. MongoDB must be installed and running on localhost:27017
// 2. Run: node seed.js
//
// MongoDB Collections Structure:
//
// 1. users collection:
//    {
//      username: String (unique),
//      password: String (hashed with bcrypt),
//      createdAt: Date,
//      updatedAt: Date
//    }
//
// 2. customers collection:
//    {
//      customerNumber: String (unique, Primary Key),
//      firstName: String,
//      lastName: String,
//      telephone: String,
//      address: String,
//      createdAt: Date,
//      updatedAt: Date
//    }
//
// 3. products collection:
//    {
//      productCode: String (unique, Primary Key),
//      productName: String,
//      quantitySold: Number,
//      unitPrice: Number,
//      createdAt: Date,
//      updatedAt: Date
//    }
//
// 4. sales collection:
//    {
//      invoiceNumber: String (unique, Primary Key),
//      salesDate: Date,
//      paymentMethod: String (Cash, Card, Mobile Money, Bank Transfer),
//      totalAmountPaid: Number,
//      customerNumber: String (Foreign Key referencing customers),
//      productCode: String (Foreign Key referencing products),
//      createdAt: Date,
//      updatedAt: Date
//    }

console.log('SRMS Database Initialization');
console.log('============================');
console.log('Database: SRMS');
console.log('Collections: users, customers, products, sales');
console.log('');
console.log('To initialize:');
console.log('1. Ensure MongoDB is running (mongod)');
console.log('2. Run: node seed.js');
console.log('');
console.log('To start the server:');
console.log('3. Run: npm start');
