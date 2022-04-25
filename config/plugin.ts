import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  helper: {
    enable: true,
    package: 'egg-helper',
  },
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
};

export default plugin;
