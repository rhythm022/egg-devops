import  BaseController from './base';
import { Get, Prefix } from 'egg-shell-decorators';

@Prefix('user')
export default class UserController extends BaseController {
    @Get('/getTokenByApp')
    public async getTokenByApplications({
      request: {
        query: { code },
      },
    }) {
      const { ctx } = this;
      // gitLab 获取 access_token
      const userToken = await ctx.service.user.getTokenByApplications({ code });
      console.log(userToken)
      // gitlab 获取用户信息
      const userInfo = await ctx.service.user.getUserInfo({
        accessToken: userToken.access_token,
      });
      
      
      // 添加用户数据本地落库，此段代码为用户落库
      ctx.service.user.saveUser({
        userInfo,
      });

      // // 将用户信息及 token 使用 jwt 注册
      // const token = app.jwt.sign(
      //   {
      //     userToken,
      //     userInfo,
      //   },
      //   app.config.jwt.secret
      // );
      
      // ctx.set({ authorization: token }); // 设置 headers
      this.success(userInfo);
    }
}

// http://192.168.56.119/oauth/authorize?client_id=137b236596d6001528762603d17bc782999120a7070333478683abc4522048ed&redirect_uri=http://127.0.0.1:7002/user/getTokenByApp&response_type=code
