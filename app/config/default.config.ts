/*
 * @Author: Cookie
 * @Date: 2019-07-17 14:29:27
 * @LastEditors: Cookie
 * @LastEditTime: 2021-05-16 16:21:25
 * @Description: 基础参数配置
 */


/**
 * @description: 这里的配置内容需要自己替换成本地的
 */

// 反向代理git url
const GIT_URL = 'http://192.168.56.119/';

// app 授权客户端id 与 秘钥
const CLIENT_SECRET = 'ee2edaa629668cca5e650aa73990c0608601dc0886ed3aca7c161c2f2f80f92e'
const CLIENT_ID = '137b236596d6001528762603d17bc782999120a7070333478683abc4522048ed'
// // 钉钉机器人


// const DING_SECRET =
//   "SECc477ca6197e14dd888662eb22a33e1b38eb786130d154ed692d855b6f48e132e";

// const DING_SEND_URL =
//   "https://oapi.dingtalk.com/robot/send?access_token=5a576c01fdee6bf137a3e3826a3b768ecfc913000545fd67926e7228c57dabe8";

// 邮箱配置
const MAIL_CONFIG = {
  user_email: '',
  service: '',
  port: '',
  auth_code: ''
}


export { 
    GIT_URL, 
    CLIENT_ID, 
    CLIENT_SECRET, 
    // DING_SEND_URL,
    // DING_SECRET, 
    MAIL_CONFIG
 };