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

// http://192.168.56.119/oauth/authorize?client_id=137b236596d6001528762603d17bc782999120a7070333478683abc4522048ed&redirect_uri=http://127.0.0.1:7002/user/getTokenByApp&response_type=code
