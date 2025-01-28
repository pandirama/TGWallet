import {authAPI} from './auth/authAPI';
import {walletAPI} from './walletAPI';

const RootAPIMiddleware = [authAPI.middleware, walletAPI.middleware];

export default RootAPIMiddleware;
