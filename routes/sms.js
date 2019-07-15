const AWS = require('aws-sdk');
const util = require('util');

const sns = new AWS.SNS({ region:'us-east-1' });

AWS.region = 'us-east1';
// AWS.config.update({ accessKeyId: 'AKIAQHOAGVVTPZTX55M4', secretAccessKey: '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' });

sns.publish = util.promisify(sns.publish);

exports.handler = async (mobileNo,OTP) => {
    console.log('>>>>>>',mobileNo,OTP);
  try {
    const params = {
      Message: `Hi, Your OTP is ${OTP}- SCOPE Team.`,
      MessageStructure: 'string',
      PhoneNumber: `${mobileNo}`
    };
    await sns.publish(params);
  }
  catch (err) {
    console.log(err);
    throw new Error('RequestedUser Approve Email and SMS Send Failed');
  }
};
