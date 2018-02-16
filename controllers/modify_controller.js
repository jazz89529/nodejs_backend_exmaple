const jwt = require('jsonwebtoken');
const toRegister = require('../models/register_model');
const Check = require('../service/member_check');
const encryption = require('../models/encryption');
const loginAction = require('../models/login_model');
const verify = require('../models/verification_model');
const updateAction = require('../models/update_model');

let check = new Check();

module.exports = class Member {
    postRegister(req, res, next){

        const password = encryption(req.body.password);

        //get client's data
        const memberData = {
            name: req.body.name,
            email: req.body.email,
            password: password,
            create_date: onTime()
        }

        const checkEmail = check.checkEmail(memberData.email);
        if(checkEmail == false) {
            res.json({
                result: {
                    status: '註冊失敗。',
                    err: '請輸入正確的Email格式'
                }
            })
        } else if (checkEmail == true) {
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

    postLogin(req, res, next) {

        const password = encryption(req.body.password);

        //get client's data
        const memberData = {
            email: req.body.email,
            password: password,
        }

        loginAction(memberData).then(rows => {
            if(check.checkNull(rows) === true) {
                res.json({
                    result: {
                        status: '登入失敗。',
                        err: '請輸入正確的帳號或密碼。'
                    }
                })
            }else if(check.checkNull(rows) === false) {
                //產生Token
                const token = jwt.sign({
                    algorithm: 'HS256',
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),//Token設為一個小時
                    data: rows[0].id
                }, 'secret');

                res.setHeader('token', token);
                res.json({
                    result: {
                        status: '登入成功。',
                        loginMember: '歡迎' + rows[0].name + ' 的登入'
                    }
                })
            }
        })
    }

    putUpdate(req, res, next) {
        const token = req.headers['token'];
        //確定token是否有輸入
        if(check.checkNull(token) === true) {
            res.json({
                err: '請輸入token'
            })
        } else if(check.checkNull(token) === false) {
            verify(token).then(tokenResult => {
                if(tokenResult === false) {
                    res.json({
                        result: {
                            status: 'token錯誤。',
                            err: '請重新登入。'
                        }
                    })
                } else {
                    const id = tokenResult;
                    //進行加密
                    const password = encryption(req.body.password);
                    const memberUpdateData = {
                        name: req.body.name,
                        password: password,
                        update_date: onTime()
                    }
                    updateAction(id, memberUpdateData).then(result => {
                        res.json({
                            result: result
                        })
                    }, (err) => {
                        res.json({
                            result: err
                        })
                    })
                }
            })
        }
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