const REGION = "us-west-2";
const { DynamoDB } = require("@aws-sdk/client-dynamodb");
const { unmarshall } = require("@aws-sdk/util-dynamodb");

// Create low level client
const dbclient = new DynamoDB({ region: REGION });

// In PartiQL, the single quotes and double quotes matter. Double quotes are used to signify variable names,
// single quotes are for string literals. 
const params = { Statement: `SELECT Author FROM CMGW WHERE "Metadata" = 'Open'`}

const executePartiQLStatement = async () => {
    return data = await dbclient.executeStatement(params);
}

executePartiQLStatement()
    .then((data) => {
            //Iterate through the Items array returned in the data variable and then unmarshall the DynamoDB JSON format to "regular" json format.
            data.Items.forEach(function (item) {
                console.log(JSON.stringify(unmarshall(item), null, 2));
            });
        }
    )
    .catch((error) => console.error(JSON.stringify(error, null, 2)));
