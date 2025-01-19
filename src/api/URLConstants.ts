import {BASE_URL} from '../axios/config';

export const WALLET_URLS = {
  REGISTER: `${BASE_URL}/register`,
  NETWORKS: `${BASE_URL}/networks`,
  WALLET_CREATION: `${BASE_URL}/wallet_generate`,
  WALLET_APPROVE: `${BASE_URL}/wallet_approve`,
  GENERATE_MNEMONIC: `${BASE_URL}/generate_mnemonic`,
  VERIFY_MNEMONIC: `${BASE_URL}/verify_mnemonic`,
};

