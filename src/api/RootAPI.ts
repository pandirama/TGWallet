import {addressBookAPI} from './addressBookAPI';
import {authAPI} from './auth/authAPI';
import {marketAPI} from './marketAPI';
import { tokenAPI } from './tokenAPI';
import {walletAPI} from './walletAPI';

const RootAPIMiddleware = [
  authAPI.middleware,
  walletAPI.middleware,
  addressBookAPI.middleware,
  marketAPI.middleware,
  tokenAPI.middleware,
];

export default RootAPIMiddleware;
