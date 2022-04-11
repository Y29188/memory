const path = require('path');

// 导入模型
const query = require('../model/query.js')

const UserController = {};

UserController.userLogin = async (req, res) => {
    // 1. 接受参数
    const {
        username,
        password
    } = req.body;
    // 2. 拼接sql语句，查询用户名和密码是否匹配
    const sql = `select * from users where username = '${username}' and password = '${password}'`
    //3. 成功，
    const result = await query(sql)
    if (result.length > 0) {
        // 将信息记录到session中
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

module.exports = UserController;