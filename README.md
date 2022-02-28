# SwappiChallenge

## First: Some considerations

- The search by name feature is already made by the MaterialTable
- The search by id is not implemented but I made other calls using params, like, GetMovies, GetFilms and GetSpecies
- The Pagination is made by a specific configuration of MaterialTable and I think you guys do not want to see this sort os thing.

## Features
- The Table list the 10 first characters
- You can expand each line and you'll see a card
- Inside each card you have a link to more specific details about the character selected!

## Tech

JediMindTricks uses a number of open source projects to work properly:

- React
- node.js - evented I/O for the backend
- Express - fast node.js network app framework [@tjholowaychuk]
- MaterialTable
- AntD

And of course JediMindTricks itself is open source with a [public repository]
on GitHub.

## Installation

JediMindTricks requires [Node.js](https://nodejs.org/) v10+ to run.
We have 2 apps, one client and one server!

Install the dependencies and devDependencies and start the server.
```sh
cd jedimindtricksserver
npm i
npm start
```
Install the dependencies and devDependencies and start the server.
```sh
cd jedimindtricksclient
npm i
npm start
```

## _Thanks for everything_ ##