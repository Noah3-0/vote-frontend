const connectWallet = document.getElementById("connectWalletButton");
const submitPollBtn = document.getElementById("pollForm");
const inputPollForm = document.getElementById("inputQuestion");
const pollBox = document.getElementById("poll-box");

let account;
let updatePollBool = false;

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

connectWallet.addEventListener("click", async (e) => {
  e.preventDefault();

  if (window.ethereum !== "undefined") {
    const networkId = await window.ethereum.request({
      method: "net_version",
    });
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    account = accounts[0];
    console.log("Connected: ", account);
    if (networkId == 421613) {
      connectWallet.innerHTML = "Connected";
      window.web3 = await new Web3(window.ethereum);
      window.contract = await new window.web3.eth.Contract(ABI, Address);
      console.log("Connected to smart contract");

      warnBoxOff();
      updatePoll();
    } else {
      warnBowOn();
      connectWallet.innerHTML = "Wrong network";
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x66eed" }],
      });
    }
  }
});

if (window.ethereum) {
  window.ethereum.on("accountsChanged", (accounts) => {
    account = accounts[0];
    console.log("Account changed. now: ", accounts[0]);
  });

  window.ethereum.on("chainChanged", async (chainId) => {
    if (chainId == "0x66eed") {
      connectWallet.innerHTML = "Connected";
      window.web3 = await new Web3(window.ethereum);
      window.contract = await new window.web3.eth.Contract(ABI, Address);
      console.log("Connected to smart contract");
      warnBoxOff();

      updatePoll();
    } else {
      warnBowOn();
      connectWallet.innerHTML = "Wrong network";

      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x66eed" }],
      });
    }
  });
}

submitPollBtn.addEventListener("submit", async (e) => {
  e.preventDefault();
  const pollCount = await window.contract.methods.getPollCount().call();
  await window.contract.methods
    .createPoll(inputPollForm.value)
    .send({ from: account, gas: 3000000 })
    .on("transactionHash", function (hash) {
      console.log("tx Hash :", hash);
    })
    .on("receipt", async function (rec) {
      console.log(rec);

      const data = await window.contract.methods.getPoll(pollCount).call();
      const newPollHtml = `
          <div class="poll-module">
          <h2 class="poll-title">${data.question}</h2>
              <div class="poll-options">
                  <button class="poll-option">Yes</button>
                  <button class="poll-option">No</button>
              </div>
          </div>
        `;

      console.log(document.querySelectorAll(".poll-option"));
      const pollElement = document.createElement("div");
      pollElement.innerHTML = newPollHtml.trim();

      const yesButton = pollElement.querySelector(".poll-option:first-child");
      const noButton = pollElement.querySelector(".poll-option:last-child");

      yesButton.addEventListener("click", async () => {
        await window.contract.methods
          .vote(pollCount, true)
          .send({ from: account, gas: 3000000 })
          .on("transactionHash", function (hash) {
            console.log("Vote submitted: ", hash);
          })
          .on("receipt", function (receipt) {
            console.log("Vote receipt: ", receipt);
          });
      });

      noButton.addEventListener("click", async () => {
        await window.contract.methods
          .vote(pollCount, false)
          .send({ from: account, gas: 3000000 })
          .on("transactionHash", function (hash) {
            console.log("Vote submitted: ", hash);
          })
          .on("receipt", function (receipt) {
            console.log("Vote receipt: ", receipt);
          });
      });

      pollBox.appendChild(pollElement.firstChild);
    });
});

async function vote(e) {
  const pollIndex = e.target.getAttribute("data-poll-index");
  const voteYes = e.target.getAttribute("data-vote") === "true";

  await window.contract.methods
    .vote(pollIndex, voteYes)
    .send({ from: account, gas: 3000000 })
    .on("transactionHash", function (hash) {
      console.log("tx Hash :", hash);
    })
    .on("receipt", function (rec) {
      console.log(rec);
    });
}

async function updatePoll() {
  if (updatePollBool == false) {
    const pollCount = await window.contract.methods.getPollCount().call();
    for (let i = 0; i < pollCount; i++) {
      const data = await window.contract.methods.getPoll(i).call();
      pollBox.innerHTML += `
          <div class="poll-module">
          <h2 class="poll-title">${data.question}</h2>
                  <div class="poll-options">
                      <button class="poll-option" data-poll-index="${i}" data-vote="true">Yes</button>
                      <button class="poll-option" data-poll-index="${i}" data-vote="false">No</button>
                  </div>
          </div>
          `;

      let pollOptions = document.querySelectorAll(".poll-option");
      pollOptions.forEach((option) => {
        option.addEventListener("click", vote);
      });
    }
    updatePollBool = true;
  } else {
    console.log("Poll is update.");
  }
}

function warnBowOn() {
  const warnBox = document.getElementById("warn-box");
  warnBox.classList.remove("hidden");
}
function warnBoxOff() {
  const warnBox = document.getElementById("warn-box");
  warnBox.classList.add("hidden");
}
