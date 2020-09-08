import grpc from 'grpc'

export default class RPCClient {
  /**
   * 服务的运行方法
   * 
   * @param {*} port    需要绑定的端口。默认50051
   * @param {*} host    需要绑定的`ip`。默认0.0.0.0
   * @param {*} callback 客户端回调函数，回调时传入`grpc`。需返回从`proto`文件中读取出的定义中的`service`定义
   * @returns client    客户端对象
   */
  run(port, host, callback) {
    host = host || '0.0.0.0'
    port = port || '50054'
    const ClientObject = callback(grpc)
    // see https://grpc.github.io/grpc/node/grpc.ServerCredentials.html
    // ServerCredentials  服务凭证工厂
    // createInsecure     创建不安全的服务器凭证
    const client = new ClientObject(`${host}:${port}`, grpc.credentials.createInsecure())
    this.client = client
    return client
  }
}