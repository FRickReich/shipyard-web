

## Dashboard

### Menu

#### Account
##### Overview
##### Settings

#### Translations
##### Languages
##### Collections | contains items

#### Message of the Day
##### Create Message
##### Calendar



## Database

A list of all Database models.

### User

Database model for User-Accounts.

| key       			| type      | default 		| description 									|
| --------------------- | --------- | ------------- | --------------------------------------------- |
| email             	| String    |				| Email of user.								|
| password             	| String    |				| Password of user.								|
| signUpDate            | Date      | Date.now()	| Date the user registered.						|
| verificationToken     | String    |				| The token sent to the user for verification.	|
| isVerified            | Boolean   | false			| Is the user verified? 						|
| isDeleted             | Boolean   | false			| Is the user deleted?							|

### UserSession

Database model for User-Sessions

| key       			| type      | default 		| description 									|
| --------------------- | --------- | ------------- | --------------------------------------------- |
| userId            	| String    |				| Id of user wich requested the token.			|
| timestamp         	| Date	    | Date.now()	| Creation time of token.						|
| isDeleted         	| Boolean   | false			| Is the session deleted?						|

### TranslationLanguage

Database model for Languages

| key       			| type      | default 		| description 									|
| --------------------- | --------- | ------------- | --------------------------------------------- |
| title					| String 	|				| Title of language.							|
| titleTranslated		| String	|				| Title of language in its own language.		|
| titleShort			| String	|				| Short 2 letter title of language, upper case.	|

### TranslationCollection

Database model for translation collections

| key       			| type      | default 		| description 									|
| --------------------- | --------- | ------------- | --------------------------------------------- |
| title					| String 	|				| 												|
| titleTranslated		| String	|				|												|
| items					| String	|				|												|

### TranslationItem

Database model for translation items, subdocument of TranslationCollection

| key       			| type      | default 		| description 									|
| --------------------- | --------- | ------------- | --------------------------------------------- |
| title					| String 	|				|												|
| text					| Object	|				|												|



















---





| key       			| type      | default 		| description 									|
| --------------------- | --------- | ------------- | --------------------------------------------- |
| title					| String 	|				|												|
| titleTranslated		| String	|				|												|
| titleShort			| String	|				|												|



Languages
- title : String
- titleTranslated: String
- short : String

TranslationCategory
- title : String

TranslationItem
- title : String