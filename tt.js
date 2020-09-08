
import 'babel-core/register'
import RPCServer from './rpc_server/server';


const server = new RPCServer();
server.start();