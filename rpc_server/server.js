import Utils from '../utils'
// import store from '../store'
import RPCServer from './server_base'

import RPCInterface from "../appApi/rpc_interface"

const fs = require('fs');

const tool = require("../utils/tool")
const { logger } = require('../utils/log_config');
const TAG = "sv::rpc_server::server";


// 从数据仓库中取出数据
// const featureList = store.featureList

export default class RPCSimpleServer extends RPCServer {
  constructor (port, host, proto) {
    super()
    this.port = port || '50054'
    this.host = host || tool.getIPAdress()
    this.proto = proto || '../protos/runtime.proto'
  }



  async handleData(originData){
    let entiy = originData.writeRequest.entities[0].entity;

    let isSuccess = false,tabel = "",data= null,opration =""
    switch(entiy){
      case "alarm":         //增加/删除/修改都有
          console.log(TAG,"save to Alarm tabel");
          data =  originData.writeRequest.entities[0]["alarm"];
          tabel = "Alarm";
          // opration = originData.operation;
          console.log(TAG,"data::" + data);

          if(data.almstate == 1){
            opration = "DELETE";
            if(!global.alarmMap.has(data["almsequence"])){
                console.log(TAG,"已经删除了")
            }else{
                global.alarmMap.delete(data["almsequence"]);
                global.wsServer.sendText(JSON.stringify({key:"Alarm",opration,data}));
            }
          }else{
              if(global.alarmMap.has(data["almsequence"])){//修改
                  global.alarmMap.set(data["almsequence"],data);
                  global.wsServer.sendText(JSON.stringify({key:"Alarm",opration:"MODIFY",data}));
              }else{
                  global.alarmMap.set(data["almsequence"],data);//增加
                  global.wsServer.sendText(JSON.stringify({key:"Alarm",opration:"INSERT",data}));
              }

              let alarmArr = [...global.alarmMap.values()];
              fs.writeFileSync("../alarmFile.json",JSON.stringify(alarmArr),"utf8");

          }


          // let returnObj = await RPCInterface.saveData(tabel, data,opration,"almsequence");
          // console.log(TAG,"isSuccess::" + returnObj.isOK);
          // console.log(TAG,"type::" + returnObj.type);
          // console.log(returnObj);
          // if(returnObj.type){
          //   opration = returnObj.type;
          // }
          // if(global.wsServer){
          //   global.wsServer.sendText(JSON.stringify({key:"Alarm",opration,data}));
          // }
          // return returnObj.isOk;
            return true;
      case "interface":    //只有修改，
          console.log(TAG,"save to Interface tabel");
          data =  originData.writeRequest.entities[0]["interface"];
          tabel = "Interface";
          opration = "MODIFY";
          if(global.wsServer){
            global.wsServer.sendText(JSON.stringify({key:"Interface",opration,data}));
          }

          break;
      case "lldp":  //只有增加和删除
          console.log(TAG,"save to Lldp tabel");
          data =  originData.writeRequest.entities[0]["lldp"]["lldpmsg"][0];
          tabel = "Lldp";
          if(data.neighborstate == "UP"){
              opration = "INSERT"
          }else if(data.neighborstate == "DOWN"){
              opration = "DELETE"
          }
          if(global.wsServer){
            global.wsServer.sendText(JSON.stringify({key:"Lldp",opration,data}));
          }

          break;
      default:
        console.log(TAG,"originData entity error");
        break;
    }
    return true;
  }


  async Call(call,callback){
    console.log(TAG,"Call param::" + JSON.stringify(call.request))

    let isOk = await this.handleData(call.request);
    console.log(TAG,"call>>>isOK " + isOk )
    if(isOk){
      callback(null,{
        metadata:{
          UNSPECIFIED_MDKey:"xxx",
          Rootpath:"xxxx",
          Label:"xxjjdsk",
          Updatetime:"jjjj"
        }
      })
    }else{
      callback(null,{
        metadata:{
          UNSPECIFIED_MDKey:"xxx",
          Rootpath:"xxxx",
          Label:"xxjjdsk",
          Updatetime:"jjjj"
        }
      })
    }
  }
  async CallStream(call,callback){
    console.log(TAG,"Call param::" + JSON.stringify(call.request))

    let isOk = await this.handleData(call.request);

    if(isOk){
      call.write({
        metadata:{
          UNSPECIFIED_MDKey:"xxx",
          Rootpath:"xxxx",
          Label:"xxjjdsk",
          Updatetime:"jjjj"
        }
      })
    }else{
      call.write({
        metadata:{
          UNSPECIFIED_MDKey:"xxx",
          Rootpath:"xxxx",
          Label:"xxjjdsk",
          Updatetime:"jjjj"
        }
      })
    }
  }

  /**
   * 启动服务
   */
  start() {
    return super.run(this, this.port, this.host, (grpc) => {
      const packageDefinition = Utils.readPackageDefinition(this.proto)
      // simplerpc是proto中的package定义
      console.log(">>>1:" + packageDefinition);

      console.log(">>>3:" + grpc);
      const simplerpc = grpc.loadPackageDefinition(packageDefinition).runtime.v1

    //   for(let key in simplerpc){
    //     console.log(">>>key4:" + key);
    //     console.log(">>>value4:" + simplerpc[key]);
    //   }

      console.log(">>>2:" + simplerpc);
    //   SimpleRPC是proto中的service定义
      const service = simplerpc.Runtime.service
      return service
    })
  }
}
