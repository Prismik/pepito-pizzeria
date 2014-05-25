pepito-pizzeria
===============

TP - LOG2010

## Branches

* Master: Should be the working app UTD version
* [yourName]-branch: Should be each programmer's testing branch. You commit and push on it. When everything works perfectly, we merge on Master.
* heroku: You probably won't ever see this branch. It is our remote git repo used to handle the production version of our application.

## Aww maww gawwwd 
You will need to install MongoDB and several modules in order to make the app work.

To do so, look into package.json, then for everything in the dependencies node, do (from the root of the project) `npm install [dependency]`

You will also need to create the db locally. To do so, you need to install mongoDB on your computer then do this, (from the root of the project):

    mongod --dbpath data

    // In a new terminal
    mongo

    // You will see
    MongoDB shell version: 2.4.5
    connecting to: test

    // Much amazing, such sexy, very omgawd, wow (create the DB)
    use pepito-pizzeria

    // Add a test row
    db.usercollection.insert({ "username" : "testuser1", "email" : "testuser1@testdomain.com" })

    // See the result
    db.usercollection.find().pretty()

    // Cool

## Migrate data
First you will need to do a `npm install mongo-migrate --save` at the project root

You will find a folder called `miscs`. Take all the content and paste it in the `node_modules` folder. 

Then go into `node_modules` folder in your terminal and run the command `node mongo-migrate -runmmnode mongo-migrate -runmm`

GG, you have migrated the sexy data 