import { Service } from 'egg';
import { CLIENT_ID ,CLIENT_SECRET} from '../config/default.config';
export default class User extends Service {

    public async getTokenByApplications({ code }) {
        const { data: token } = await this.ctx.helper.utils.http.post({
           url: '/oauth/token',
           params: {
             grant_type: 'authorization_code',
             client_id: CLIENT_ID,
             client_secret: CLIENT_SECRET,
             code,
             redirect_uri: 'http://127.0.0.1:7002/user/getTokenByApp',
           },
         });
     
         if (token && token.access_token) {
           return token;
         }
         return false;
       }
}

