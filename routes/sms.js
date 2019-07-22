const AWS = require("aws-sdk");
const util = require("util");

const config = {
  region: 'us-east-1',
  apiVersion: "2010-03-31",
  accessKeyId: "AKIA57VFS2CP5LOAY7SW",
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
      PhoneNumber: `+91${mobileNo}`
    };
    console.log('>>..', params)
    await sns.publish(params);
  } catch (err) {
    console.log(err);
    throw new Error("RequestedUser Approve Email and SMS Send Failed");
  }
};

this.handler();
