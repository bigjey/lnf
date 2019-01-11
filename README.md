![Alt text](https://image.flaticon.com/icons/png/512/139/139481.png)

## local setup

`yarn`
create `./server/.env` file based on `./server/.env-structure` put your data there
create a database if needed `./server/node_modules/.bin/sequelize db:create`
run db migrations `./server/node_modules/.bin/sequelize db:migrate`
start dev server `cd server && node .`
