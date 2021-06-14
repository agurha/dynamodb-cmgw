const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");
var fs = require('fs')

const cmgitems = JSON.parse(fs.readFileSync("items.json", "utf8"))

async function putItems(element) {
    const client = new DynamoDBClient({ region: "us-west-2" });
    const ddbDocClient = DynamoDBDocumentClient.from(client);

    return await ddbDocClient.send(
        new PutCommand({
            TableName: "CMGW",
            Item: element,
        })
    );
}

cmgitems.forEach(element => {
    putItems(element)
        .then((data) =>
            console.log("PutCommand succeeded with HTTP code:", JSON.stringify(data.$metadata.httpStatusCode, null, 2)))
        .catch((error) => console.error(JSON.stringify(error, null, 2)));

});
