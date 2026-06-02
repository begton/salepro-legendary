==================================================================
   SRMS - Sales Record Management System
   MongoDB Database Import Instructions
==================================================================

The database name is: SRMS

Collections:
  1. customers  - Customer records
  2. products   - Product records
  3. sales      - Sales transaction records
  4. users      - User accounts (created via seed.js)

------------------------------------------------------------------
OPTION 1: Import using mongoimport (easiest)
------------------------------------------------------------------

Open Command Prompt or PowerShell and run:

  1. Import customers:
     mongoimport --db SRMS --collection customers --file "C:\Users\user\Desktop\Igitego_Aime_Begton_National_Practical_Exam_2026\database\customers.json"

  2. Import products:
     mongoimport --db SRMS --collection products --file "C:\Users\user\Desktop\Igitego_Aime_Begton_National_Practical_Exam_2026\database\products.json"

  3. Import sales:
     mongoimport --db SRMS --collection sales --file "C:\Users\user\Desktop\Igitego_Aime_Begton_National_Practical_Exam_2026\database\sales.json"

------------------------------------------------------------------
OPTION 2: Use the seed script (recommended - includes user account)
------------------------------------------------------------------

The seed script creates the default admin user AND sample data:

  1. Open PowerShell in backend-project folder
  2. Run: npm run seed

  This will create:
    - User: admin / admin123
    - 5 sample customers
    - 5 sample products
    - 8 sample sales

------------------------------------------------------------------
Start the application:
------------------------------------------------------------------

  1. Start backend:  cd backend-project && npm start
  2. Start frontend: cd frontend-project && npm run dev
  3. Login: admin / admin123
  4. Open: http://localhost:3000

==================================================================
