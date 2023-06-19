const connectWallet = document.getElementById("connect-wallet");
const connectContract = document.getElementById("connect-contract");
const readContract = document.getElementById("read-contract");
const testSending = document.getElementById("testSending");
console.log(connectContract, connectWallet, readContract);

let account;

connectWallet.addEventListener("click", async (e) => {
  e.preventDefault();
  if (window.ethereum !== "undefined") {
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    account = accounts[0];
    console.log("Connected: ", account);
  }
});

connectContract.addEventListener("click", async (e) => {
  e.preventDefault();
  const ABI = [
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
  ];

  const Address = "0xf6ce67d3fe999777a1608ace8c4a8fe9f97860ef";

  window.web3 = await new Web3(window.ethereum);
  window.contract = await new window.web3.eth.Contract(ABI, Address);
  console.log("Connected to smart contract");
});

readContract.addEventListener("click", async (e) => {
  e.preventDefault();

  const data = await window.contract.methods
    .getAdmins("0xDe9Cefd5f6d894e2cE51b74FDa7Bdb323972874d")
    .call();
  console.log(data);
});

testSending.addEventListener("click", async (e) => {
  e.preventDefault();
  await window.contract.methods
    .createPoll("First")
    .send({ from: account, gas: 3000000 })
    .on("transactionHash", function (hash) {
      console.log("tx Hash :", hash);
    })
    .on("receipt", async function (rec) {
      console.log(rec);
    });
});
