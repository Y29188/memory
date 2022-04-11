var express = require('express')
var router = express.Router()

// 导入控制器模块
const IndexController = require('../controller/IndexController.js')
const CateController = require('../controller/CateController.js')
const ArtController = require('../controller/ArtController.js')
const UserController = require('../controller/UserController.js')
const query = require('../model/query.js')

// 后台首页
router.get('/', IndexController.index)

// 系统设置页面
router.get('/setting', IndexController.setting)
// 系统设置：获取数据
router.get('/systemData', IndexController.systemData)
// 系统设置：添加数据
router.post('/addSystemData', IndexController.addSystemData)
// 系统设置：修改数据
router.post('/updSystemData', IndexController.updSystemData)
// 系统设置：删除数据
router.post('/delSystemData', IndexController.delSystemData)

// 展示分类列表页面
router.get('/catelist', CateController.index)
// 展示文章列表页面
router.get('/artlist', ArtController.index)

// 后台登录页
router.get('/login', IndexController.login)
router.get('/test', IndexController.test)
router.get('/apiData', IndexController.apiData)

// 分类列表数据接口
router.get('/cateData', CateController.cateData)
// 编辑分类的接口  
router.post('/updCateData', CateController.updCateData)
// 删除分类指定的数据接口
router.post('/delCateData', CateController.delCateData)
// 添加分类数据
router.post('/addCateData', CateController.addCateData)

// 登录接口
router.post('/userLogin', UserController.userLogin)

// 登出接口
router.post('/userLogout', UserController.userLogout)

module.exports = router;

