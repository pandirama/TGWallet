import {BASE_URL} from '../axios/config';

export const NEW_WALLET_URLS = {
  REGISTER: `${BASE_URL}/register`,
  NETWORKS: `${BASE_URL}/networks`,
  WALLET_CREATION: `${BASE_URL}/wallet_generate`,
  HD_WALLET_GENERATION: `${BASE_URL}/hdwallet_generate`,
  HD_WALLET_CREATION: `${BASE_URL}/hdwallet_create`,
  WALLET_APPROVE: `${BASE_URL}/wallet_approve`,
  GENERATE_MNEMONIC: `${BASE_URL}/generate_mnemonic`,
  VERIFY_MNEMONIC: `${BASE_URL}/verify_mnemonic`,
};

export const WALLET_URLS = {
  WALLET_LIST: `${BASE_URL}/wallets`,
  WALLET_NAME_CHANGE: `${BASE_URL}/walletname_change`,
  WALLET_CHANGE_PWD: `${BASE_URL}/changepwd`,
  WALLET_RESET_PWD: `${BASE_URL}/resetpwd`,
  WALLET_VERIFY_PWD: `${BASE_URL}/verifypwd`,
  PRIVATE_KEY: `${BASE_URL}/walletimport_private`,
  SECRET_PHASE: `${BASE_URL}/walletimport_secret`,
  WATCH_ADDRESS: `${BASE_URL}/watch_address`,
  WALLET_INFO: `${BASE_URL}/wallet_info`,
  TOKEN_INFO: `${BASE_URL}/get_walletinfo`,
  SEND_WALLET_INFO: `${BASE_URL}/get_sendwallet`,
  SEND_WALLET: `${BASE_URL}/send_wallet`,
  RECEIVE_WALLET: `${BASE_URL}/receive_wallet`,
};

export const ADDRESS_BOOK_URLS = {
  ADDRESS_BOOK: `${BASE_URL}/walletbook`,
  ADD_ADDRESS_BOOK: `${BASE_URL}/addcontact`,
  ADDRESS_BOOK_INFO: `${BASE_URL}/editcontact`,
  UPDATE_ADDRESS_BOOK: `${BASE_URL}/updatecontact`,
};
