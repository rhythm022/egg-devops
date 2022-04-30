import BaseController from './base';
import { Get, Prefix } from 'egg-shell-decorators';
import { FE_URL } from '../config/default.config';
@Prefix('user')
export default class UserController extends BaseController {
  @Get('/getTokenByApp')
  public async getTokenByApplications({
    request: {
      query: { code },
    },
  }) {
    const { ctx, app } = this;
    // gitLab 获取 access_token
    const userToken = await ctx.service.user.getTokenByApplications({ code });

    // gitlab 获取用户信息
    const userInfo = await ctx.service.user.getUserInfo({
      accessToken: userToken.access_token,
    });


    // 添加用户数据本地落库，此段代码为用户落库
    ctx.service.user.saveUser({
      userInfo,
    });

    // 将用户信息及 token 使用 jwt 注册
    const token = app.jwt.sign(
      {
        userToken,
        userInfo,
      },
      app.config.jwt.secret,
    );
    ctx.set({ authorization: token }); // 设置 headers
    ctx.set({ 'Access-Control-Expose-Headers': 'authorization' });
    ctx.cookies.set('authorization', token, {
      maxAge: 1000 * 3600 * 24,
      httpOnly: true,
      // domain: '.cookieboty.com',
    });
    // ctx.redirect(FE_URL);

    this.success({ userInfo, token, FE_URL });

  }

  /**
   * @author: Cookie
   * @description: 根据 gitLab 用户密码获取 access_token
   */
  @Get('/getUserInfo')
  public async getUserInfo() {
    const { ctx } = this;
    const { access_token } = this.user;
    // gitLab 获取用户信息
    const userInfo = await ctx.service.user.getUserInfo({
      accessToken: access_token,
    });

    this.success(userInfo);
  }
}

// http://192.168.56.119/oauth/authorize?client_id=137b236596d6001528762603d17bc782999120a7070333478683abc4522048ed&redirect_uri=http://127.0.0.1:7001/user/getTokenByApp&response_type=code
