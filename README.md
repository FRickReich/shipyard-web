# shipyard

A Content Management Web-Application, with an api to serve its content to Unity

## Concept

A Creator (User) can create a project and add the following types of content to it:

-   Message of the Day
-   Notification
-   Asset Items
-   Characters
-   Translations

Each Project gets a unique token to be used for game-connection to the API, made out of a token and a secret that is encrypted and decrypted on application side, to be checked, and on successful connection, to be served the unity plugin.

## Technology

-   Hosted on DigitalOcean.
-   MERN stack.
-   TravisCI for building.
-   Brunch.io for packaging.

### Translations

## API

### ACCOUNT

-   CREATE new Account
-   SIGN-IN to Account
-   CREATE username with usernameGenerator
-   VERIFY Account
-   LOG-OUT of Account
-   GET accountData (by id)
-   GET accountData (by accountname)
-   GET accountname (by id)
-   Edit Account

### Project

-   GET all projects connected to Account
-   GET single project connected to Account
-   GET single project (by title)
-   GET single project (by id)
-   EDIT single project
-   CREATE new project
-   DELETE project (by title)
-   DELETE project (by id)

### Log

A new log message catches the account that triggered the log according to its ID and apply the name to it on parsing.

-   Create log Message
-   Read log Message

### Mail

-   SEND email to user
