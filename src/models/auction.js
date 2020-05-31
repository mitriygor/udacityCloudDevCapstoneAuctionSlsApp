import AWS from 'aws-sdk';
import createError from 'http-errors';

const dynamodb = new AWS.DynamoDB.DocumentClient();

export function createAuctionItem(auction) {
  try {
    return dynamodb.put({
      TableName: process.env.AUCTIONS_TABLE_NAME,
      Item: auction,
    }).promise();
  } catch(error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
}

export function getActionItemById(id) {
  try {
    return dynamodb.get({
      TableName: process.env.AUCTIONS_TABLE_NAME,
      Key: {id}
    }).promise();
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
}

export function getAuctionItems(params) {
  try {
    return dynamodb.query(params).promise();
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
}

export function updateAuctionItem(params) {
  try {
    return dynamodb.update(params).promise();
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerErauctionror(error);
  }
}
