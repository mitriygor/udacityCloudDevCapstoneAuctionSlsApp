 ## Auction Core

The application provides basic functionality for creating and processing the auction items. The applications has functionality for authentication and image upload.

Resources
* API Gateway 
* S3
* DynamoDB


## Getting started
Firstly, install dependencies:
```
npm i
sls deploy -v
```
After that, deploy application
```
sls deploy -v
```
or deploying specific function if there are no changes in the serverless.yml

```
sls deploy -f FUNCTION_NAME -v
```
