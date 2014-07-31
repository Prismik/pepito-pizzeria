pepito-pizzeria
===============

TP - LOG2010
### Specs
> **Database:** MongoDB (Mongoose)
 
> **Language:** Javascript (Node.js) 

> **Framework:** Express, Jade

## Branches

* master: Should be the working app UTD version
* [yourName]-branch: Should be each programmer's testing branch. You commit and push on it. When everything works perfectly, we merge on Master.
* production: The final, up to date version of the app

## Application setup 
You will need to install MongoDB and several modules in order to make the app work.

We will show you what commands to run and from where in order to have a working local version of the application.

**$** Stands for the terminal command prompt

**>** Stands for the mongo command prompt
    # Initialise the repo
    $ git clone [url from github] 
    
    # Install the dependencies. If this does not work, try installing them manually
    # with npm install [package name]. The packages are found in package.json
    $ npm install

    # Create the database locally. MongoDB has to be installed on your computer.
    # See http://www.mongodb.org/downloads
    $ mkdir data
    $ mongod --dbpath data

    # In a new terminal, open a mongo instance.
    $ mongo

    # You will see
    # MongoDB shell version: 2.4.5
    # connecting to: test

    # We are going to run a little test
    > use pepito-pizzeria
    > db.test.insert({ "field": "Test" })
    > db.test.find().pretty()

    # You should get a result, which means your database works

    # The next step is to migrate the data we've created just for you.
    # It is important that mongo-migrate is installed in your modules for this step
    # to work. Let's make sure it is installed
    $ npm install mongo-migrate --save

    # Take everything in miscs, then put the content directly in node_modules
    $ node mongo-migrate -runmm

    # Now let's start the app
    $ npm start

    # You are now ready to use pepito-pizzeria. Let's make a quick wrap up of what
    # you must do everytime you want to use the app (given that you successfully
    # run the Application Setup once before.
    $ mongod
    $ npm start

## Connect to the app

We have created several roles to make it easy for you to test the app.

**Admin**

> Username: admin@email.com

> Password: admin

**Delivery guy**

> Username: deliveryGuy@email.com

> Password: deliveryGuy

**Entrepreneur**

> Username: entrepreneur@email.com

> Password: entrepreneur

**Restaurateur**

> Username: restaurateur@email.com

> Password: restaurateur

**User**

> Username: user@email.com

> Password: user
