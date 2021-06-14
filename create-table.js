const { DynamoDBClient, CreateTableCommand } = require('@aws-sdk/client-dynamodb');

const REGION = "us-west-2";
const TableName = "CMGW";

const dbclient = new DynamoDBClient({ region: REGION });

async function createTable() {
    const params = {
        AttributeDefinitions: [
            {
                AttributeName: "Id",
                AttributeType: "S",
            },
            {
                AttributeName: "Metadata",
                AttributeType: "S",
            }
        ],
        KeySchema: [
            {
                AttributeName: "Id",
                KeyType: "HASH", // Partition key
            },
            {
                AttributeName: "Metadata",
                KeyType: "RANGE", // Sort key
            },
        ],
        BillingMode: "PAY_PER_REQUEST",
        TableName: TableName, // Substitute your table name for "Music"
    };
    return await dbclient.send( new CreateTableCommand(params));
}

createTable()
    .then((data) => console.log(data))
    .catch((error) => console.log("An error occured while creating the table:" + ' ' + error.message ));