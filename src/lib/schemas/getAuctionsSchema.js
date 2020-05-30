const schema = {
  properties: {
    queryStringParameters: {
      Type: 'object',
      properties: {
        status: {
          types: 'string',
          enum: ['OPEN', 'CLOSED'],
          default: 'OPEN'
        }
      }
    }
  },
  required: [
    'queryStringParameters'
  ]
};

export default schema;
