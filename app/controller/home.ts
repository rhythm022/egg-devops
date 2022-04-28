import BaseController from './base';
import { Get, Prefix } from 'egg-shell-decorators';

@Prefix('/home')
export default class HomeController extends BaseController {

  @Get('/')
  public async index() {
    const { ctx } = this;
    // ctx.body = `Hello ${ctx.query.name}!`;
    // ctx.body = `Hello ${ctx.queries.name.join(',')}!`;

    // ctx.body = `Hello ${ctx.request.body.name}!`;
    ctx.body = `Hello ${ctx.helper.util.hello()}!`;
  }
}

// @Prefix("robot")
// export default class ProjectController extends BaseController {
//   @Post("/ding")
//   public async getProjectList({
//     request: {
//       body: { params },
//     },
//   }) {
//     const { ctx } = this;
//     const { content } = params;
//     await ctx.helper.robot.ding.text({ content });
//     this.success({});
//   }
// }
