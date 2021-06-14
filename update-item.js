const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, UpdateCommand } = require("@aws-sdk/lib-dynamodb");

async function updateItem() {
  const client = new DynamoDBClient({ region: "us-west-2" });
  const ddbDocClient = DynamoDBDocumentClient.from(client);

  return await ddbDocClient.send(
      new UpdateCommand({
        TableName: "CMGW",
        Key: {
          Id: "563e96e7-4954-4b5c-b0b5-37f51ef89b95",    // Partition key
          Metadata: "Open",                 // Sort key
        },
        UpdateExpression: "set Priority = :p",
        ExpressionAttributeValues: {
          ":p": 4,
        },
        ReturnValues: "UPDATED_NEW",
      })
  );
}

updateItem()
    .then((data) =>
        console.log("UpdateCommand succeeded:", JSON.stringify(data, null, 2)))
    .catch((error) => console.error(JSON.stringify(error, null, 2)));