import RequestIp from 'request-ip';
import {Request,Response,NextFunction} from 'express';

const IpAddressMiddleware = function (req:any,res:Response,next:NextFunction){
  try {
    req.ip = RequestIp.getClientIp(req);
  next()
  } catch (error:any) {
    next(error)
  }
  
}

export {
  IpAddressMiddleware
}