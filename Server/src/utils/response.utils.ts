import { Response } from "express";

export default class ServerResponse {
  res;
  constructor(res: Response) {
    this.res = res;
    console.log(res);
  }

  Success(
    message: string,
    data: string | object | Array<any>,
    status: number = 200
  ) {
    return this.res.status(status).json({
      success: true,
      message: message,
      data: data ? data : null,
    });
  }

  Wrong(status: number, message: string) {
    return this.res.status(status ?? 500).json({
      success: true,
      message: message,
    });
  }
}
