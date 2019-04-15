const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
    const method = req.method
    const id = req.query.id
    // const url = req.url
    // const path = url.split('?')[0]


    // 获取博客列表
    if(method === 'GET' && req.path ==='/api/blog/list'){
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        // const listData = getList(author, keyword)

        // return new SuccessModel(listData)
        const result = getList(author, keyword)

        return result.then(listData => {
            return new SuccessModel(listData)
        })
    }

    // 获取博客详情
    if(method === 'GET' && req.path ==='/api/blog/detail'){
        
        // const data = getDetail(id)
        // return new SuccessModel(data)
        const result = getDetail(id)
        return result.then(data => {
            return new SuccessModel(data)
        })
    }

    // 新建一篇博客
    if(method === 'POST' && req.path ==='/api/blog/new'){
        // const data = newBlog(req.body)
        // return new SuccessModel(data)
        const author = 'Mark' // 假数据
        req.body.author = author
        const result = newBlog(req.body)
        return result.then(data => {
            return new SuccessModel(data)
        }) 


    }

    // 更新博客
    if(method === 'POST' && req.path ==='/api/blog/update'){
        const result = updateBlog(id, req.body)

        return result.then(val => {
            if (val) {
                return new SuccessModel()
            } else {
                return new ErrorModel('更新失败')
            }
        })
    }

     // 删除博客
     if(method === 'POST' && req.path ==='/api/blog/del'){
        const author = 'Mark' // 假数据
        const result = delBlog(id, author)

        return result.then(val => {
            if (val) {
                return new SuccessModel()
            } else {
                return new ErrorModel('删除失败')
            }
        })
    }
}
module.exports = handleBlogRouter