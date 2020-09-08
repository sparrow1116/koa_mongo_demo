import grpc from 'grpc'
const { logger } = require('../utils/log_config');


export default class RPCServer {
  /**
   * 服务的运行方法
   *
   * @param {*} methods 需要绑定到服务器的方法对象
   * @param {*} port    需要绑定的端口。默认50051
   * @param {*} host    需要绑定的ip。默认0.0.0.0
   * @param {*} callback 服务回调函数，回调时传入`grpc`。需返回在从`proto`文件中读取出的定义后，在定义中的`service`定义下的服务
   * @returns server    服务对象
   */
  run (methods, port, host, callback) {
    const service = callback(grpc)

    // 获取一个新服务器
    var grpcServer = new grpc.Server();
    this.server = grpcServer
    // 处理函数绑定到服务方法
    grpcServer.addProtoService(service, methods)
    // 请在未使用的端口上启动服务器
    host = host || '172.171.2.211'
    port = port || '50051'
    // see https://grpc.github.io/grpc/node/grpc.ServerCredentials.html
    // ServerCredentials  服务凭证工厂
    // createInsecure     创建不安全的服务器凭证
    grpcServer.bind(`${host}:${port}`, grpc.ServerCredentials.createInsecure());

    console.log("on server start:: server port is:: " + port);
    grpcServer.start();
    return grpcServer;
  }

  /**
   * 强制关闭已存在的服务器
   */
  close () {
    if (this.server) {
      this.server.forceShutdown()
    } else {
      throw 'Service not started'
    }
  }
}
