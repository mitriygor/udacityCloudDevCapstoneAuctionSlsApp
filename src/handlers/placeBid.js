import AWS from 'aws-sdk';
import commonMiddleware from '../lib/commonMiddleware';
import createError from 'http-errors';
import {getActionById} from './getAuction';
import validator from '@middy/validator';
import placeBidsSchema from '../lib/schemas/placeBidsSchema.js';

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function placeBid(event, context) {
  const {id} = event.pathParameters;
  const {email} = event.requestContext.authorizer;
  const auction = await getActionById(id);
  const { amount } = event.body;
  let updatedAuction;

  if (auction.status === 'CLOSED') {
    throw new createError.Forbidden(`This auction is closed`);
  }

  if (email === auction.highestBid.bidder) {
    throw new createError.Forbidden(`You are already the highest bidder`);
  }

  if (email === auction.seller) {
    throw new createError.Forbidden(`You cannot bid on your own auctions`);
  }

  if (amount <= auction.highestBid.amount) {
    throw new createError.Forbidden(`Your bid must be higher than ${auction.highestBid.amount}`)
  }

  const params = {
    TableName: process.env.AUCTIONS_TABLE_NAME,
    Key: {id},
    UpdateExpression: 'set highestBid.amount = :amount, highestBid.bidder = :bidder',
    ExpressionAttributeValues: {
      ':amount': amount,
      ':bidder': email
    },
    ReturnValues: 'ALL_NEW',
  };

  try {
    const result = await dynamodb.update(params).promise();
    updatedAuction = result.Attributes;
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerErauctionror(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(updatedAuction),
  };
}

export const handler = commonMiddleware(placeBid).use(validator({inputSchema: placeBidsSchema}));


