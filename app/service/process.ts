/*
 * @Author: Cookie
 * @Date: 2020-08-05 16:28:21
 * @LastEditors: Cookie
 * @LastEditTime: 2020-08-16 10:44:45
 * @Description: 流程
 */
import { Service } from 'egg';

export default class Process extends Service {
  /**
   * @author: Cookie
   * @description: 创建任务流关联 branch，任务流模板以及需求
   */
  public async createProcess({
    name,
    branchIds,
    workflowTplId,
    createdUser,
    updateUser,
    desc,
  }) {
    const { ctx } = this;
    console.log({
      name,
      branchIds,
      workflowTplId,
      createdUser,
      updateUser,
      desc,
    });
    const workflowTpl = await ctx.model.Process.create({
      name,
      branchIds,
      workflowTplId,
      createdUser,
      updateUser,
      desc,
    });
    return workflowTpl;
  }

  /**
   * @author: Cookie
   * @description: 创建任务流关联 branch，任务流模板以及需求
   */
  public async getProcessList({ pageSize = 10, pageNum = 1, opt = {} }) {
    const { ctx } = this;
    // 创建任务流模板
    const offset = (pageNum - 1) * pageSize;
    const processList = await ctx.model.Process.findAndCountAll({
      where: { ...opt },
      limit: pageSize,
      offset,
      order: [[ 'created_at', 'DESC' ]],
    });
    return processList && JSON.parse(JSON.stringify(processList));
  }
}
