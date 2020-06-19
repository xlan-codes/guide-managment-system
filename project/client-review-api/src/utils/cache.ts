import { logger } from "./logger";

const NodeCache = require( "node-cache" );

export class Cache {

    private myCache: any;
    constructor() {
      this.myCache = new NodeCache( { stdTTL: 100 } );
    }

    public  save(key: string, obj: any){
      this.myCache.set( key, obj, function(err: any, success: any){
          if( !err && success ){
            logger.info(success);
          }
        });
    }

    public get(key: string) {
      return this.myCache.get( key, function( err: any, value: any ){
          if( !err ){
            if(value === undefined) {
              logger.info(value);
            } else {
              logger.info(value);
            }
          } else {
              logger.error(err);
          }
        });
    }
}