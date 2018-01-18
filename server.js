const KoaStatic = require('koa-static');
const Server = require('boardgame.io/server');
import { Jaipur } from './src/game';

const app = Server({ games: [ Jaipur ] });
app.use(KoaStatic('build'));
app.listen(8000);
