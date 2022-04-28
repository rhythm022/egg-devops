import BaseController from './base';
import { Get, Prefix } from 'egg-shell-decorators';

@Prefix('project')
export default class ProjectController extends BaseController {
  /**
   * @description: 获取 gitLab 对应自身的项目列表
   */
  @Get('/getList')
  public async getProjectList({ request: { query } }) {
    const { ctx } = this;
    const { access_token } = this.user;
    const { id: userId } = this.userInfo;
    const { pageSize, pageNum } = query;
    const projectList = await ctx.service.project.getProjectList({
      pageSize,
      pageNum,
      access_token,
      userId,
    });
    this.success(projectList);
  }

  /**
   * @description: 获取 gitLab 单个项目
   */
  @Get('/get')
  public async getProject({ request: { query } }) {
    const { ctx } = this;
    const { projectId } = query;
    console.log('this.user==>', this);
    const { access_token } = this.user;
    const project = await ctx.service.project.getProject({
      projectId,
      access_token,
    });

    this.success(project);
  }
}
