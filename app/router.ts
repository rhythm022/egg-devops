import { Application } from 'egg';
import { EggShell } from 'egg-shell-decorators';
// export default (app: Application) => {
//   const { controller, router } = app;

//   router.get('/', controller.home.index);
//   // router.get('/:name', controller.home.index);
// };
// 打开 websocket 在线测试网页 ws.douqq.com/
// 输入 ws://127.0.0.1:7002/socket.io/?room=nsp&userId=client_0.38599487710107594&EIO=3&transport=websocket

export default (app: Application) => {
  const { io } = app;
  EggShell(app);

  io.of('/').route('server', io.controller.nsp.ping);
};
