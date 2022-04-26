import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  static: true,
  sequelize: {
    enable: true,
    package: "egg-sequelize",
  },
  helper: {
    enable: true,
    package: 'egg-helper',
  },
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
};

export default plugin;
