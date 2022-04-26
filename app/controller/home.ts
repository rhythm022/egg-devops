import  BaseController from './base';
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
