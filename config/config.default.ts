import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1650716631986_5621';

  // add your egg config in here
  config.middleware = [ 'jwtAuth', 'errorHandler' ];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  config.sequelize = {
    database: 'devops_dev',
    delegate: 'model', // load all models to app.model and ctx.model
    baseDir: 'model', // load models from `app/model/*.js`
    dialect: 'mysql',
    host: '192.168.56.120',
    port: 3306,
    username: 'sam',
    password: '111111',
  };

  config.security = {
    csrf: {
      enable: false,
    },
    // domainWhiteList: '*'  // 白名单
  };
  config.cors = {
    origin: ctx => ctx.get('origin'),
    credentials: true,
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };
  config.jwt = {
    secret: '123456', // 自定义 token 的加密条件字符串
  };

  config.jwtAuth = {};

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
