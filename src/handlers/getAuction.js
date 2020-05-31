import commonMiddleware from '../lib/commonMiddleware';
import createError from 'http-errors';
import {getActionItemById} from '../models/auction';

export async function getActionById(id) {
  let auction;

  try {
    const result = await getActionItemById(id);
    auction = result.Item;
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }

  if (!auction) {
    throw new createError.NotFound(`Auction with ID "${id}" not found`);
  }

  return auction
}

async function getAuction(event, context) {
  const {id} = event.pathParameters;
  const auction = await getActionById(id);

  return {
    statusCode: 200,
    body: JSON.stringify(auction),
  };
}

export const handler = commonMiddleware(getAuction);


