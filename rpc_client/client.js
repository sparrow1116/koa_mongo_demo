import Utils from '../utils'
import RPCClient from './client_base'

const tool = require("../utils/tool")

export default class RPCSimpleClient extends RPCClient {
  constructor (port, host, proto) {
    super()
    this.port = port || '50051'
    this.host = host || tool.getIPAdress()
    this.proto = proto || '../protos/simple_rpc.proto'
  }
  
  getFeature(point) {
    this.getClient().getFeature(point, (error, feature) => {
      if (error) {
        console.error(`error: ${error}`)
      } else {
        console.log(`[RPCSimpleClient] 服务器返回消息 ${JSON.stringify(feature)}`)
      }
    })
  }

  Call(request){
      
  }



  getClient () {
    if (this.client) {
      return this.client
    } else {
      this.start()
      return this.client
    }
  }

  /**
   * 启动客户端
   */
  start() {
    return super.run(this.port, this.host, (grpc) => {
      const packageDefinition = Utils.readPackageDefinition(this.proto)
      // simplerpc是proto中的package定义
      const simplerpc = grpc.loadPackageDefinition(packageDefinition).runtime.v1
      // SimpleRPC是proto中的service定义
      return simplerpc.Runtime.service
    })
  }
}