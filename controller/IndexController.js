const path = require('path')

const viewsDir = path.join(path.dirname(__dirname), 'views')

// 导入模型
const query = require('../model/query.js')

const IndexController = {};

IndexController.index = (req, res) => {
    // res.sendFile(`${viewsDir}/index.html`)
    res.render('index.html', {
    })
}

IndexController.systemData = async (req, res) => {
    const sql = 'select * from settings';
    const rows = await query(sql)
    res.json(rows)
}


IndexController.login = (req, res) => {
    res.render(`login.html`)
}

IndexController.test = (req, res) => {
    res.render(`test.html`)
}

// api数据接口
IndexController.apiData = (req, res) => {
    const myData = [{
        id: 1,
        title: '《活着》',
        content: '《活着》讲述了在大时代背景下，随着内战、三反五反、大跃进、文化大革命等社会变革...',
        author: "余华",
        status: 0,
        pic: "1.png",
        add_date: "1998",
        cate_id: 1
    },
    {
        id: 2,
        title: '《平凡的世界》',
        content: '该书以中国70年代中期到80年代中期十年间为背景，通过复杂的矛盾纠葛...',
        author: "路遥",
        status: 0,
        pic: "2.png",
        add_date: "2019",
        cate_id: 1
    },
    {
        id: 3,
        title: '《彷徨》',
        content: '作品表达了作者彻底的不妥协地反对封建主义的精神，是中国革命思想的镜子...',
        author: "鲁迅",
        status: 0,
        pic: "3.png",
        add_date: "1925",
        cate_id: 1
    },
    {
        id: 4,
        title: '《这么慢，那么美》',
        content: '以慢博快，以简博繁，有舍方得的生活...',
        author: "罗敷",
        status: 0,
        pic: "4.png",
        add_date: "2015",
        cate_id: 1
    },
    {
        id: 5,
        title: '《解忧杂货店》',
        content: '该书讲述了在僻静街道旁的一家杂货店，只要写下烦恼投进店前门卷帘门的投信口...',
        author: "东野圭吾",
        status: 0,
        pic: "5.png",
        add_date: "2017",
        cate_id: 1
    },
    ]
    res.json({
        code: 0,
        msg: "success",
        count: 100,
        data: myData
    })
}


module.exports = IndexController;