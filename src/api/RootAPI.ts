import {addressBookAPI} from './addressBookAPI';
import {authAPI} from './auth/authAPI';
import {walletAPI} from './walletAPI';

const RootAPIMiddleware = [
  authAPI.middleware,
  walletAPI.middleware,
  addressBookAPI.middleware,
];

export default RootAPIMiddleware;
