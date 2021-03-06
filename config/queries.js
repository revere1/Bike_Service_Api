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
    cancelBookings: `update booked_services set status = 'Cancelled' where id_book_services = ? and id_user = ?`,
    getAllBookings: `select bs.*,DATE_FORMAT(bs.day_slot, '%d-%b,%Y') day_slot,up.full_name, up.mobile_number from booked_services bs left join user_profile as up on up.id_user = bs.id_user where bs.id_user = ? ORDER BY id_book_services DESC;`,
    getSelectedBookingDetails: `select id_book_services,id_user,user_address,user_mobile_number,payment,payment,user_emailid,service_name,time_slot,DATE_FORMAT(day_slot, '%d-%b,%Y') day_slot, status from booked_services where id_book_services = ? and id_user = ?;`,
    getAllHistoryBookings: `select id_book_services,DATE_FORMAT(day_slot, '%d-%b,%Y') day_slot,time_slot,status from booked_services where id_user = ? ORDER BY day_slot DESC;`,
    InActiveBookings: `update booked_services set status = 'InActive' where id_user = ?`,
    InActiveAddress:`update user_address set status = 'InActive' where id_user = ?`,
    addressStatus:`update user_address set status = 'Active' where id_user_address = ?`,
    adminBookings: `SELECT bs.id_book_services bookingId,bs.id_user,bs.user_mobile_number,bs.service_name,bs.time_slot,DATE_FORMAT(bs.day_slot, '%d-%b,%Y') day_slot,bs.status,up.full_name, ua.full_address, ua.city FROM booked_services bs LEFT JOIN user_profile up ON up.id_user = bs.id_user LEFT JOIN user_address ua ON ua.id_user = bs.id_user WHERE bs.status=? GROUP BY bs.id_book_services ORDER BY bs.day_slot DESC;`,
    adminDateBookings: `SELECT bs.id_book_services,bs.id_user,bs.user_mobile_number,bs.service_name,bs.time_slot,bs.day_slot,bs.status,up.full_name, ua.full_address, ua.city FROM booked_services bs JOIN user_profile up ON up.id_user = bs.id_user JOIN user_address ua ON ua.id_user = bs.id_user    WHERE bs.day_slot BETWEEN CAST(? AS DATE) AND CAST(? AS DATE) GROUP BY bs.id_book_services ORDER BY day_slot DESC;`,
    adminFilterBookings: `SELECT bs.id_book_services,bs.id_user,bs.user_mobile_number,bs.service_name,bs.time_slot,bs.day_slot,bs.status,up.full_name, ua.full_address, ua.city FROM booked_services bs JOIN user_profile up ON up.id_user = bs.id_user JOIN user_address ua ON ua.id_user = bs.id_user ORDER BY day_slot DESC;`,
    checkAdmin: 'select * from admin_login where mobile_number = ?;',
    updateAdminOtp: 'update admin_login set otp = ? where mobile_number = ?',
    loginAdminOtp: 'select * from admin_login where otp = ? and mobile_number = ?',
    closeAdminBooking: `update booked_services set status = 'Closed' where id_book_services = ?`
}