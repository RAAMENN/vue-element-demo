module.exports = function(router) {
  router.post("/excel/landPrice/cal", ctx => {
    ctx.body = {
      code: 200,
      // --返回状态码 200成功 400失败 404接口不存在 500服务器内部错误
      data: {
        // --返回结果（对象）
        landPriceCalResult: 105
        // --地价计算结果
      },
      message: "SUCCESS"
      // --返回信息
    }
  })
}
