import { Service } from "egg";

export default class Project extends Service {
  public async getProjectList({ pageSize = 100, pageNum = 1, access_token }) {
    const {
      projectList,
    } = await this.ctx.helper.api.gitlab.project.getProjectList({
      pageSize,
      pageNum,
      access_token,
    });
    return projectList;
  }
}