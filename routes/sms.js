const AWS = require("aws-sdk");
const util = require("util");

const config = {
  region: 'us-east-1',
  apiVersion: "2010-03-31",
  accessKeyId: "AKIAINJQ4BBPTNR4UCUQ",
  secretAccessKey: "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"
};

const sns = new AWS.SNS(config);

sns.publish = util.promisify(sns.publish);

exports.handler = async (mobileNo, OTP) => {
  console.log(">>>>>>", mobileNo, OTP);
  try {
    const params = {
      Message: `Hi, Your OTP is ${OTP}- SCOPE Team.`,
      MessageStructure: "string",
      PhoneNumber: `+917893574123`
    };
    console.log('>>..',params)
    await sns.publish(params);
  } catch (err) {
    console.log(err);
    throw new Error("RequestedUser Approve Email and SMS Send Failed");
  }
};

//this.handler();
