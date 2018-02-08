const toRegister = require('../models/register_model');

module.exports = class Member {
    postRegister(req, res, next){
        //get client's data
        const memberData = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            create_date: onTime()
        }
        //store data into DB
        toRegister(memberData).then(result => {
            // if successful
            res.json({
                status: '註冊成功',
                result: result
            })
        }, (err) => {
            // if error
            res.json({
                result: err
            })
        })
    }
}


const onTime = () => {
    const date = new Date();
    const mm = date.getMonth()+1;
    const dd = date.getDate();
    const hh = date.getHours();
    const mi = date.getMinutes();
    const ss = date.getSeconds();

    return [date.getFullYear(), '-' +
    (mm > 9 ? '' : '0') + mm, '-' +
    (dd > 9 ? '' : '0') + dd, '-' +
    (hh > 9 ? '' : '0') + hh, '-' +
    (mi > 9 ? '' : '0') + mi, '-' +
    (ss > 9 ? '' : '0') + ss
    ].join('');
}