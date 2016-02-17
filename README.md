# Kato CMS

## Start App

`meteor --settings settings.json`

## To deploy

`meteor build .`

Then extract tar file on server and run following:

```
$ (cd programs/server && npm install)
$ export MONGO_URL='
$ export ROOT_URL='http://localhost'
$ PORT=3000 node main.js
```
PORT=1984 ROOT_URL='http://localhost' MONGO_URL='' node main.js
```

## To deploy using MUP

```
cd private/cli
mup deploy
```

## Connecting to remote database for testing

```
MONGO_URL="" meteor
```