import { Service } from 'egg';
import { CLIENT_ID, CLIENT_SECRET } from '../config/default.config';
import { END_URL } from '../config/default.config';
export default class User extends Service {

  public async getTokenByApplications({ code }) {
    const { data: token } = await this.ctx.helper.utils.http.post({
      url: '/oauth/token',
      params: {
        grant_type: 'authorization_code',
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
        redirect_uri: END_URL + 'user/getTokenByApp',
      },
    });

    if (token && token.access_token) {
      return token;
    }
    return false;
  }

  // 使用 gitlab api 获取 gitlab 用户信息
  public async getUserInfo({ accessToken }) {
    const userInfo = await this.ctx.helper.api.gitlab.user.getUserInfo({
      access_token: accessToken,
    });
    return userInfo;
  }

  // 新增用户信息落库方法，此段代码为用户落库
  public async saveUser({ userInfo }) {
    const { ctx } = this;
    const {
      id,
      name,
      username,
      email,
      avatar_url: avatarUrl,
      web_url: webUrl,
    } = userInfo;

    // 查询用户是否已经落库
    const exist = await ctx.model.User.findOne({
      where: {
        id,
      },
      raw: true,
    });

    // 创建用户信息
    if (!exist) {
      ctx.model.User.create({
        id,
        name,
        username,
        email,
        avatarUrl,
        webUrl,
      });
    } else {
      // ctx.model.User.update({
      //   name,
      //   username,
      //   email,
      //   avatarUrl,
      //   webUrl,
      // }, {
      //   where: {
      //     id,
      //   }
      // })
    }
  }
}

