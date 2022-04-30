/*
 * @Author: Cookie
 * @Date: 2020-07-29 23:30:02
 * @LastEditors: Cookie
 * @LastEditTime: 2021-06-26 19:29:19
 * @Description: 分支
 */
import { Service } from 'egg';

export default class Branch extends Service {
  /**
   * @author: Cookie
   * @description: 根据 gitlab api 获取分支 list，且数据落库
   */
  public async getBranchList({
    projectId,
    projectSourceId,
    access_token,
    pageSize = 100,
    pageNum = 1,
  }) {

    const { ctx } = this;
    const branchList = await ctx.helper.api.gitlab.branch.getBranchList({
      projectId: projectSourceId,
      access_token,
      pageSize,
      pageNum,
    });
    console.log(222222, branchList);
    branchList.forEach(branch => {
      branch.branchGitName = branch.name;
      branch.projectId = projectId;
      branch.projectSourceId = projectSourceId;
      delete branch.name;
    });

    branchList.length > 0 &&
      (await ctx.model.Branch.bulkCreate(branchList, {
        ignoreDuplicates: true,
        updateOnDuplicate: [ 'branchGitName', 'project_id', 'project_source_id' ],
      }));

    const local = await ctx.model.Branch.findAll({
      where: {
        projectId,
      },
    });
    return local;
  }

  /**
   * @author: Cookie
   * @description: 根据 gitlab api 获取分支 list，且数据落库
   */
  public async getSelfBranchList({ branchIds }) {
    const { ctx } = this;
    const local = await ctx.model.Branch.findAll({
      where: {
        id: branchIds,
      },
    });
    return local;
  }

  /**
   * @author: Cookie
   * @description: 根据 gitlab api 创建分支，且数据落库
   */
  public async createBranch({
    projectId,
    projectSourceId,
    access_token,
    ref,
    branch,
    userName,
  }) {
    const { ctx } = this;
    const newBranch = await ctx.helper.api.gitlab.branch.createBranch({
      projectSourceId,
      access_token,
      ref,
      branch,
      userName,
    });

    if (!newBranch || !newBranch.commit) return null;
    const branchCallBack = await ctx.model.Branch.create({
      projectId,
      projectSourceId,
      branchType: newBranch.branchType,
      branchGitName: newBranch.name,
      branchFrom: newBranch.ref,
      remarks: newBranch.remarks,
      createdUser: userName,
      commit: newBranch.commit,
    });
    console.log(33333, newBranch, {
      projectId,
      projectSourceId,
      branchType: newBranch.branchType,
      branchGitName: newBranch.name,
      branchFrom: newBranch.ref,
      remarks: newBranch.remarks,
      createdUser: userName,
      commit: newBranch.commit,
    });

    return branchCallBack;
  }

  /**
   * @author: Cookie
   * @description: 更新分支信息
   */
  public async updateBranch({ branchIds, opt }) {
    const { ctx } = this;
    const branchCallBack = await ctx.model.Branch.update(
      {
        ...opt,
      },
      {
        where: {
          id: branchIds,
        },
      },
    );
    return branchCallBack;
  }

  /**
   * @author: Cookie
   * @description: 查询分支流程信息
   */
  public async checkProcess({ branchIds, status = 'some' }) {
    const { ctx } = this;
    const branchCallBack = await ctx.model.Branch.findAll({
      where: { id: branchIds },
    });
    if (branchCallBack[status](branch => branch.processId)) {
      return false;
    }
    return true;
  }
}
