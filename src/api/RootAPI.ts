import {addressBookAPI} from './addressBookAPI';
import {authAPI} from './auth/authAPI';
import {marketAPI} from './marketAPI';
import { profileAPI } from './profileAPI';
import { tokenAPI } from './tokenAPI';
import {walletAPI} from './walletAPI';

const RootAPIMiddleware = [
  authAPI.middleware,
  walletAPI.middleware,
  addressBookAPI.middleware,
  marketAPI.middleware,
  tokenAPI.middleware,
  profileAPI.middleware,
];

export default RootAPIMiddleware;
