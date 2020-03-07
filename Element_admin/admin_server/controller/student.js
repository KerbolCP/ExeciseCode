const Router = require('koa-router');
let router = new Router();
const cloud = require('tcb-admin-node');
const db = cloud.database();
const studentSet = db.collection("test_student");

router.post("/add", async (ctx, next) => {
  console.log(ctx.request.body);
  let res = null;
  try {
    res = await studentSet.add({
      data: {
        ...ctx.request.body
      }
    })
  } catch (error) {
    console.log(error);
  }
  ctx.body = {
    code: 20000,
    data: res
  }
})

router.get("/list", async (ctx, next) => {
  console.log(ctx.query);
  let res = null;
  try {
    res = await studentSet.get()
  } catch (error) {
    console.log(error);
  }
  ctx.body = {
    code: 20000,
    data: res
  }
})

module.exports = router;