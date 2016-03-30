# Stackable

## Start App

`meteor --settings settings.json`

## To deploy

`meteor build .`

Then extract tar file on server and run following:

```
$ (cd programs/server && npm install)
$ export MONGO_URL='mongodb://katocms:katocms@cockney.2.mongolayer.com:10231,cockney.3.mongolayer.com:10231/katocms?replicaSet=set-55e6c9795556ddd3af0005ab'
$ export ROOT_URL='http://localhost'
$ PORT=3000 node main.js
```
PORT=1984 ROOT_URL='http://localhost' MONGO_URL='' node main.js
```
FREE_MONGO_URL='mongodb://myUserAdmin:abc123@146.185.137.239:27017/admin' meteor

mongodb://stackable:stackable@cockney.2.mongolayer.com:10231,cockney.3.mongolayer.com:10231/stackable?replicaSet=set-55e6c9795556ddd3af0005ab

## To deploy using MUP

```
cd private/cli
mup deploy
```

## Connecting to remote database for testing

```
MONGO_URL="mongodb://katocms:katocms@cockney.2.mongolayer.com:10231,cockney.3.mongolayer.com:10231/katocms?replicaSet=set-55e6c9795556ddd3af0005ab" meteor
```