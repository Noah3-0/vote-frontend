const connectBtn = document.getElementById("connectWalletButton");
const warnContainer = document.getElementById("warn-container");
const questionForm = document.getElementById("pollForm");
const inputQuestion = document.getElementById("inputQuestion");

const contractAddress = "0xf6cE67D3Fe999777A1608ACE8c4a8fE9f97860eF";
const abiJson = [
  {
    _format: "hh-sol-artifact-1",
    contractName: "Vote",
    sourceName: "contracts/Vote.sol",
    abi: [
      {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "addAdmin",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "pollIndex",
            type: "uint256",
          },
        ],
        name: "closeMultiplePoll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "pollIndex",
            type: "uint256",
          },
        ],
        name: "closePoll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "string",
            name: "question",
            type: "string",
          },
          {
            internalType: "string",
            name: "answerA",
            type: "string",
          },
          {
            internalType: "string",
            name: "answerB",
            type: "string",
          },
          {
            internalType: "string",
            name: "answerC",
            type: "string",
          },
          {
            internalType: "string",
            name: "answerD",
            type: "string",
          },
        ],
        name: "createMultiplePoll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "string",
            name: "question",
            type: "string",
          },
        ],
        name: "createPoll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "getAdmins",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "pollIndex",
            type: "uint256",
          },
        ],
        name: "getMultiplePoll",
        outputs: [
          {
            internalType: "string",
            name: "question",
            type: "string",
          },
          {
            internalType: "string",
            name: "answerA",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "voteA",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "answerB",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "voteB",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "answerC",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "voteC",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "answerD",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "voteD",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "pollIndex",
            type: "uint256",
          },
        ],
        name: "getPoll",
        outputs: [
          {
            internalType: "string",
            name: "question",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "yesVotes",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "noVotes",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "togglePoll",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "getPollCount",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "pollIndex",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "answer",
            type: "uint256",
          },
        ],
        name: "multipleVote",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "multiplepolls",
        outputs: [
          {
            internalType: "string",
            name: "question",
            type: "string",
          },
          {
            internalType: "string",
            name: "answerA",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "voteA",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "answerB",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "voteB",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "answerC",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "voteC",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "answerD",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "voteD",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "togglePoll",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "owner",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "polls",
        outputs: [
          {
            internalType: "string",
            name: "question",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "yesVotes",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "noVotes",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "togglePoll",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "removeAdmin",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "pollIndex",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "voteYes",
            type: "bool",
          },
        ],
        name: "vote",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
  },
];
let account;

connectBtn.addEventListener("click", async () => {
  window.web3 = await new Web3(window.ethereum);
  window.contract = await new window.web3.eth.Contract(
    abiJson,
    contractAddress
  );
  window.ethereum
    .request({ method: "eth_requestAccounts" })
    .then((accounts) => {
      account = accounts[0];
      console.log("Account connected:", account);
    });

  if (window.ethereum) {
    const networkId = await window.ethereum.request({
      method: "net_version",
    });
    if (networkId == 421613) {
      console.log("You are connected on Arbitrum Goerli");
    } else {
      console.log("You are not connected, pls switch to Arbitrum Goerli");
    }
  } else {
    alert("install metamask");
  }
});

if (window.ethereum) {
  window.ethereum.on("accountsChanged", (accounts) => {
    account = accounts[0];
    console.log("New account connected :", account);
  });

  window.ethereum.on("chainChanged", (chainId) => {
    if (chainId == "0x66eed") {
      console.log("You are connected on Arbitrum Goerli");
    } else {
      console.log("You are not connected, pls switch to Arbitrum Goerli");
    }
  });
}
