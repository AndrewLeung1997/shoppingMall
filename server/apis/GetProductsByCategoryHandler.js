import { mProduct } from "../utils/mongodb.ts";

module.exports.handler = async function(event, context) {
  const categoryId = event.queryStringParameters.CategoryId;
  const product = await mProduct
    .collection()
    .find({ categoryId: categoryId })
    .toArray();

  if (product.length === 0) {
    return {
      statusCode: 404,
      body: JSON.stringify([]),
    };
  } else {
    return {
      statusCode: 200,
      body: JSON.stringify(product),
    };
  }
}
