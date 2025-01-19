import {authAPI} from './auth/authAPI';

const RootAPIMiddleware = [authAPI.middleware];

export default RootAPIMiddleware;
