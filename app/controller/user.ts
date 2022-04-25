import { Controller } from 'egg';
import { Get, Prefix } from 'egg-shell-decorators';

@Prefix('user')
export default class UserController extends Controller {
    @Get('/getTokenByApp')
    public async getTokenByApplications({
      request: {
        query: { code },
      },
    }) {
      const { ctx } = this;
      // gitLab 获取 access_token
      const userToken = await ctx.service.user.getTokenByApplications({ code });
      this.ctx.body = userToken;
    }
}