const AWS = require('aws-sdk');
const config = require('config');
const util = require('util');
const sns = new AWS.SNS({ region:'us-east-1' });

AWS.region = 'us-east1';
AWS.config.update({ accessKeyId: 'AKIAIHOJTP6FMI3I4DKQ', secretAccessKey: '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' });

sns.publish = util.promisify(sns.publish);

exports.handler = async (mobileNo,OTP) => {
    console.log('>>>>>>',mobileNo,OTP);
  try {
    const params = {
      Message: `Hi, Your OTP is ${OTP}- SCOPE Team.`,
      MessageStructure: 'string',
      PhoneNumber: `${+917893574123}`
    };
    await sns.publish(params);
  }
  catch (err) {
    console.log(err);
    throw new Error('RequestedUser Approve Email and SMS Send Failed');
  }
};
