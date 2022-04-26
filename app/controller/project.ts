import  BaseController from './base';
import { Post, Prefix } from "egg-shell-decorators";

@Prefix("project")
export default class ProjectController extends BaseController {
  @Post("/getProjectList")
  public async getProjectList() {
    const { ctx } = this;
    const { params } = ctx.request.body;
    const { pageSize, pageNum, accessToken:access_token } = params;
    const projectList = await ctx.service.project.getProjectList({
      pageSize,
      pageNum,
      access_token,
    });
    ctx.body = projectList;
  }
}