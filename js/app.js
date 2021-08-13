let web3Object;
var mainAccount;
let input = document.querySelector('input');
// let log = document.getElementById('log');

App = {
  web3Provider: null,
  contracts: {},

  initWeb3: async function () {
    // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      // This is for testnet 
      // App.web3Provider = new Web3.providers.HttpProvider('https://data-seed-prebsc-1-s1.binance.org:8545');
      // This is for mainnet
      App.web3Provider = new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/09f328c97dfd4ade9432da97c626a565');

    }
    // App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
    web3 = new Web3(App.web3Provider);

    return web3
  },

}

var contract;
let contractAddress = '0x6b78E8412e1F048357DD53E2d25337906020934b'

const abi = [{ "inputs": [{ "internalType": "address payable", "name": "_governance", "type": "address" }, { "internalType": "address payable", "name": "_multiwallet", "type": "address" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "purchaser", "type": "address" }, { "indexed": true, "internalType": "address", "name": "beneficiary", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "TokenPurchase", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "constant": false, "inputs": [], "name": "ClaimRefund", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }], "name": "_allowances", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "_deposits", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address[]", "name": "_contributors", "type": "address[]" }, { "internalType": "uint256[]", "name": "_balances", "type": "uint256[]" }], "name": "_multiDisperse", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_from", "type": "address" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "burn", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "beneficiary", "type": "address" }], "name": "buyQwan", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "emergencyExitForEth", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "emergencyExitForQwan", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "enableTransfers", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "endDate", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "finalize", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "isCapReached", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "isFinalize", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "price", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "saleSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "bool", "name": "_onOrOff", "type": "bool" }], "name": "setEnableTransfers", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address payable", "name": "_governance", "type": "address" }], "name": "setGovernance", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "string", "name": "_newName", "type": "string" }], "name": "setNewName", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "string", "name": "_newSymbol", "type": "string" }], "name": "setNewSymbol", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "_price", "type": "uint256" }], "name": "setPrice", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "softCap", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "startDate", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "tokensSold", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "_cap", "type": "uint256" }], "name": "updateCap", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "bool", "name": "_isReached", "type": "bool" }], "name": "updateIsCapReached", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "weiRaised", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }]


$(function () {
  $(window).load(async function () {
    web3Object = await App.initWeb3();

    contract = web3Object.eth.contract(abi).at(contractAddress);

    console.log(contract)
    console.log('WEB#', web3Object)


    await new Promise(resolve => {
      web3Object.eth.getAccounts(function (err, accounts) {

        mainAccount = accounts[0];

        jQuery("#walletAddress").text(accounts[0]);
        resolve()
      })
    })

    isLocked()
    getBalanceOfAccount()
    getTotalWeiRaised()
    getTokensSold()
    getPrice()

  });

});


input.oninput = handleInput;

function handleInput(e) {
  // log.textContent = `The field's value is
  //     ${e.target.value.length} character(s) long.`;
}

jQuery('#bnb-input').on('input', (e) => {
  if (/^(?!0\d)\d*(\.\d+)?$/.test(e.target.value)) {

    jQuery('#artex-input').attr('value', e.target.value * 4000);

  }
})

function sendBnb() {
  try {
    let address = mainAccount//jQuery("#transferaddress").val();
    let amount = 0.1//jQuery("#transferamount").val();

    web3Object.eth.sendTransaction({
      to: address,
      from: mainAccount,
      value: web3Object.toWei(amount, "ether"),
      gasPrice: web3Object.toWei(5, "Gwei"),
    },
      function (err, res) {
        if (err) {
          return console.log(err);
        }
        jQuery("#hashstatus").text(res);
      }
    );
  } catch (error) {
    // User denied account access...
    console.log("sss", error);
  }
}

function buyQwan() {
  try {

    let amount = jQuery("#bnb-input").val();

    contract.buyQwan.sendTransaction(mainAccount, {
      from: mainAccount,
      gasPrice: web3.toWei(10, "Gwei"),
      value: web3Object.toWei(amount, "ether"),
    },
      function (err, res) {
        if (err) {
          return console.log(err);
        }
        jQuery("#hash").text(
          res
        );
      }
    );
  } catch (error) {
    // User denied account access...
    console.log("sss", error);
  }
}

async function getTotalWeiRaised() {
  const data = await contract.weiRaised.call(function (error, result) {
    if (error) {
      return console.log(error);
    }
    console.log(web3.fromWei(result.toString()))
    jQuery('#weiRaised').text(web3.fromWei(result.toString()));
  });
}

// async function getLockedAmount() {
//   const data = await contract.weiRaised.call(function (error, result) {
//     if (error) {
//       return console.log(error);
//     }
//     console.log(web3.fromWei(result.toString()))
//     jQuery('#weiRaised').text(web3.fromWei(result.toString()));
//   });
// }


async function getPrice() {
  const data = await contract.price.call(function (error, result) {
    if (error) {
      return console.log(error);
    }
    console.log(web3.fromWei(result.toString()))
    jQuery('#getPrice').text((result.toString()));
  });
}

async function getTokensSold() {
  const data = await contract.tokensSold.call(function (error, result) {
    if (error) {
      return console.log(error);
    }
    console.log(web3.fromWei(result.toString()))
    jQuery('#tokenSold').text(result / 10 ** 18);
  });
}

function getBalanceOfAccount() {
  web3Object.eth.getBalance(mainAccount, function (err, res) {
    jQuery("#getBalance").text(res / 10 ** 18);
  });

}

function isLocked() {
  web3Object.eth.getAccounts(function (err, accounts) {
    if (err != null) {
      console.log(err);
      jQuery("#lock").text(err);
    } else if (accounts.length === 0) {
      console.log("MetaMask is locked");
      jQuery("#lock").text("MetaMask is locked.");
    } else {
      console.log("MetaMask is unlocked");
      jQuery("#lock").text("MetaMask is unlocked.");
    }
  });
}
