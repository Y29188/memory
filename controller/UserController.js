const path = require('path')
const md5 = require('md5')

// 导入模型
const query = require('../model/query.js')

const UserController = {};
const {
    password_secret
} = require('../config/config.js')

UserController.userLogin = async (req, res) => {
    // 1. 接受参数
    let {
        username,
        password
    } = req.body;
    // 2. 拼接sql语句，查询用户名和密码是否匹配
    password = md5(`${password}${password_secret}`)
    const sql = `select * from users where username = '${username}' and password = '${password}'`
    // 3. 成功
    const result = await query(sql)
    if (result.length > 0) {
        // 将信息记录到session或cookie
        req.session.userInfo = result[0];
        res.cookie('userInfo', JSON.stringify(result[0]), {
            expires: new Date(Date.now() + 1 * 3600000),
        })
        res.json({
            code: 0,
            message: "login success"
        })
    } else {
        // 失败则提示用户
        res.json({
            code: -2,
            message: "login fail"
        })
    }

}

UserController.userLogout = async (req, res) => {
    // 1. 清除session
    req.session.destroy(function (err) {
        if (err) {
            throw err;
        }
    })
    // 2. 响应json
    res.json({
        code: 0,
        message: "logout success"
    })

}

UserController.updUserInfo = async (req, res) => {
    const {
        id,
        intro
    } = req.body;
    const sql = `update users set intro = '${intro}' where id = ${id}`;
    const {
        affectedRows
    } = await query(sql)
    const successData = {
        code: 0,
        message: "update user success"
    }
    const failData = {
        code: -5,
        message: "update user fail"
    }

    if (affectedRows > 0) {
        // 需要先取出用户信息，然后同步session和cookie中的用户信息
        const sql = `select * from users where id = ${id}`
        const result = await query(sql)
        // 将信息记录到session或cookie
        req.session.userInfo = result[0];
        res.cookie('userInfo', JSON.stringify(result[0]), {
            expires: new Date(Date.now() + 1 * 3600000),
        })

        res.json(successData)
    } else {
        res.json(failData)
    }
}

module.exports = UserController;