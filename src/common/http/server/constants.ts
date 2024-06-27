import { v7 as uuidv7 } from 'uuid';
import { NodeEnv } from './enum';

export const DEFAULT_APP_HOST: string = '0.0.0.0';
export const DEFAULT_APP_PORT: number = 4000;
export const DEFAULT_APP_INSTANCE_ID: string = uuidv7();
export const DEFAULT_NODE_ENV: NodeEnv = NodeEnv.PRODUCTION;
