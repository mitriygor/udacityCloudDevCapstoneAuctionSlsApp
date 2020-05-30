 ## Auction Core

The application provides basic functionality for creating and processing the auction items. The applications includes five endpoints. 

Usaed resources include 
* API Gateway 
* S3
* DynamoDB
## Getting started
FIrstly, install dependencies:
```
npm i
sls deploy -v
```
After that, deploy application

or deploying specific function if there are no changes in the serverless.yml

```
sls deploy -f FUNCTION_NAME -v
```
