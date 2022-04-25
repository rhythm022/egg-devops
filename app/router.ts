import { Application } from 'egg';
import { EggShell } from 'egg-shell-decorators';
// export default (app: Application) => {
//   const { controller, router } = app;

//   router.get('/', controller.home.index);
//   // router.get('/:name', controller.home.index); 
// };


export default (app: Application) => {
  EggShell(app);
};