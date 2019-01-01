module.exports = {
    checkUser: 'select * from user_profile where mobile_number = ?',
    createUser: 'insert into user_profile (mobile_number,otp) values (?,?)',
    updateOtp: 'update user_profile set otp = ? where mobile_number = ?',
    updateProfile: 'update user_profile set full_name = ?, full_address = ?, city = ?, zip = ? where mobile_number = ?'
}