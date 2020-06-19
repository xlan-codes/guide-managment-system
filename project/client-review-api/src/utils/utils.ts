

import * as request from 'request';
import { Options } from 'request';

export class Utils {
    public static async doRequest(options:Options) {
        return new Promise(function (resolve, reject) {
            request(options, function (error:any, res: any, body: any) {
                resolve(res);
            });
        });
    }

    public static chunk(array: Array<any>, size:number): Array<Array<any>> {
        const chunkedArr = [];
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < array.length; i++) {
          const last = chunkedArr[chunkedArr.length - 1];
          if (!last || last.length === size) {
            chunkedArr.push([array[i]]);
          } else {
            last.push(array[i]);
          }
        }
        return chunkedArr;
    }

  public static toArrayOfType<C, T>(items: Array<T>, func: (item: T) => C): Array<C> {
      const arr = items.map((obj: T) => {
          return func(obj);
      });

      return arr;
  }
}
