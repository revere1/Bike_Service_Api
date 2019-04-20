module.exports = {
    checkUser: 'select * from user_profile where mobile_number = ?',
    loginOtp: 'select * from user_profile where otp = ? and mobile_number = ?',
    createUser: 'insert into user_profile (mobile_number,otp) values (?,?)',
    updateOtp: 'update user_profile set otp = ? where mobile_number = ?',
    updateProfile: 'update user_profile set ? where id_user = ?',
    insertAddress: 'insert into user_address set ?',
    getAllAddress: 'select * from user_address where id_user = ?',
    updateAddress: 'update user_address set ? where id_user_address = ? and id_user = ?',
    deleteAddress: 'delete from user_address where id_user_address = ?',
    getSelectedAddress: 'select * from user_address where id_user = ? and id_user_address = ?',
    createBookings: 'insert into booked_services set ?',
    cancelBookings: "update booked_services set status = 'InActive' where id_book_services = ?",
    getAllBookings: "select bs.*, up.full_name, up.mobile_number from booked_services bs left join user_profile as up on up.id_user = bs.id_user where bs.id_user = ? and bs.status = 'Active'",
    getAllHistoryBookings: "select * from booked_services where id_user = ?",
    InActiveBookings: "update booked_services set status = 'InActive' where id_user = ?"
}