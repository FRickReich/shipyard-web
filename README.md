# shipyard
A Content Management Web-Application, with an api to serve its content to Unity

## Concept

A Creator (User) can create a project and add the following types of content to it:
- Message of the Day
- Notification
- Asset Items
- Characters
- Translations

Each Project gets a unique token to be used for game-connection to the API, made out of a token and a secret that is encrypted and decrypted on application side, to be checked, and on successful connection, to be served the unity plugin.

## Technology
- Hosted on DigitalOcean.
- MERN stack.
- TravisCI for building.
- Brunch.io for packaging.
