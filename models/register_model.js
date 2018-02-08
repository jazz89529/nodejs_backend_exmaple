const db = require('./connection_db');

module.exports = function register(memberData) {
    let result = {};
    return new Promise((resolve, reject) => {
        // sotre data into DB
        db.query('INSERT INTO member_info SET ?', memberData, function(err, rows) {
            if(err) {
                console.log(err);
                result.status = '註冊失敗。';
                result.err = '伺服器錯誤，請稍候在試！';
                reject(result);
                return;
            }
            result.registerMember = memberData;
            resolve(result);
        })
    })
}