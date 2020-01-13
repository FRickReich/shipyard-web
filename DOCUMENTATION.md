# Shipyard-Application Documentation

## Use-Case

- User registers at page and creates a project, gives it a name and an api-url, then he can create:
- A set of translation-collections (a named array of translations, folder/directory, so to say).
- Add translation strings to these collections
- Add a message of the day and apply a calendar to it

## UI

### Structure

- Header
  - Left
    - Links
      - Home (Dashboard Overview)
  - Right
    - Create Project / Object
      - Search
    - Links
      - Messages
      - User
        - Links
          - Settings
          - Profile
          - Logout
- Content
  - Left
    - Team
    - Project
    - Account
  - Right
    - Dashboard Content
  - Footer
    - Links
      - Home
      - Documentation

### Page

#### 404 Page
Shown when a website is not found, wether on the website or the app, shows the Page menu and Contains a link back to the previous page.

### Dashboard

## Database

A list of all Database models.

### User

Database model for User-Accounts.

| key               | type    | default    | description                                  |
| ----------------- | ------- | ---------- | -------------------------------------------- |
| email             | String  |            | Email of user.                               |
| fistName          | String  |            | FirstName of user.                           |
| lastName          | String  |            | LastName of user.                            |
| location          | String  |            | Location of user.                            |
| password          | String  |            | Password of user.                            |
| signUpDate        | Date    | Date.now() | Date the user registered.                    |
| verificationToken | String  |            | The token sent to the user for verification. |
| isVerified        | Boolean | false      | Is the user verified?                        |
| isDeleted         | Boolean | false      | Is the user deleted?                         |

### UserSession

Database model for User-Sessions

| key       | type    | default    | description                          |
| --------- | ------- | ---------- | ------------------------------------ |
| userId    | String  |            | Id of user wich requested the token. |
| timestamp | Date    | Date.now() | Creation time of token.              |
| isDeleted | Boolean | false      | Is the session deleted?              |

### Project

| key  | type   | default | description       |
| ---- | ------ | ------- | ----------------- |
| name | String |         | Title of project. |

### TranslationLanguage

Database model for Languages

| key             | type   | default | description                                   |
| --------------- | ------ | ------- | --------------------------------------------- |
| name            | String |         | Title of language.                            |
| titleTranslated | String |         | Title of language in its own language.        |
| titleShort      | String |         | Short 2 letter title of language, upper case. |

### TranslationCollection

Database model for translation collections

| key          | type   | default | description |
| ------------ | ------ | ------- | ----------- |
| name         | String |         |             |
| translations | String |         |             |

### TranslationItem

Database model for translation items, subdocument of TranslationCollection

| key  | type   | default | description |
| ---- | ------ | ------- | ----------- |
| name | String |         |             |
| text | Object |         |             |