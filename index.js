const connectWallet = document.getElementById("connectWalletButton");
const submitPollBtn = document.getElementById("pollForm");
const inputPollForm = document.getElementById("inputQuestion");
const pollBox = document.getElementById("poll-box");
const txDisplay = document.getElementById("tx-display");
const displayAccountAddress = document.getElementById("accountAddress");
const accountBox = document.getElementById("accountBox");
const closePollBox = document.getElementById("close-poll-box");

let account;
let updatePollBool = false;
let counterTx = 0;
let gasPrice = 30000000;

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
const Address = "0x3DCe863Fa5fAEC626887e6f7Edc7000f5cF059a2";

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
      addAccountBox();
      displayAccount();
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
    displayAccount();
  });

  window.ethereum.on("chainChanged", async (chainId) => {
    if (chainId == "0x66eed") {
      connectWallet.innerHTML = "Connected";
      window.web3 = await new Web3(window.ethereum);
      window.contract = await new window.web3.eth.Contract(ABI, Address);
      console.log("Connected to smart contract.");
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
    .send({ from: account, gas: gasPrice })
    .on("transactionHash", function (hash) {
      addTxPending(hash);
    })
    .on("receipt", async function (rec) {
      addTxSuccess(rec);

      const data = await window.contract.methods.getPoll(pollCount).call();
      const numberPollCount = Number(pollCount);
      const newPollHtml = `
        <div class="poll-module">
          <div class="poll-number">${numberPollCount + 1}</div>
          <div class="close-button">&#10006;</div>
          <h2 class="poll-title">${data.question}</h2>
            <div class="poll-options">
              <button class="poll-option">Yes</button>
              <button class="poll-option">No</button>
            </div>
          <div class="close-button" id="closebtn">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
          </div>
        </div>
        `;

      const pollElement = document.createElement("div");
      pollElement.innerHTML = newPollHtml.trim();

      pollBox.appendChild(pollElement);

      const yesButton = pollElement.querySelector(".poll-option:first-child");
      const noButton = pollElement.querySelector(".poll-option:last-child");

      yesButton.addEventListener("click", async () => {
        await window.contract.methods
          .vote(pollCount, true)
          .send({ from: account, gas: gasPrice })
          .on("transactionHash", function (hash) {
            addTxPending(hash);
          })
          .on("receipt", function (rec) {
            addTxSuccess(rec);
          })
          .on("error", function (error) {
            addTxError(error);
          });
      });

      noButton.addEventListener("click", async () => {
        await window.contract.methods
          .vote(pollCount, false)
          .send({ from: account, gas: gasPrice })
          .on("transactionHash", function (hash) {
            addTxPending(hash);
          })
          .on("receipt", function (rec) {
            addTxSuccess(rec);
          })
          .on("error", function (error) {
            addTxError(error);
          });
      });
    })
    .on("error", function (error) {
      addTxError(error);
    });
});

pollBox.addEventListener("click", async (e) => {
  if (e.target.closest(".close-button")) {
    const pollIndex =
      e.target.closest(".poll-module").querySelector(".poll-number")
        .textContent - 1;
    await window.contract.methods
      .closePoll(pollIndex)
      .send({ from: account, gas: gasPrice })
      .on("transactionHash", function (hash) {
        addTxPending(hash);
      })
      .on("receipt", async function (rec) {
        addTxSuccess(rec);
        let button = document.querySelector(
          `button[data-poll-index="${pollIndex}"]`
        );
        if (button) {
          let div = button.closest(".poll-module");
          if (div) {
            div.remove();
            const data = await window.contract.methods
              .getPoll(pollIndex)
              .call();
            let yesNumber = parseInt(data.yesVotes, 10);
            let noNumber = parseInt(data.noVotes, 10);

            closePollBox.innerHTML += `
            <div class="poll-module">
              <div class="poll-number">${pollIndex + 1}</div>
                <h2 class="poll-title">${data.question}</h2>
                <div class="poll-options">
                <div class="poll-option">Yes ${yesNumber}</div>
                <div class="poll-option">No ${noNumber}</div>
              </div>
            <div></div>
            </div>
        `;
          }
        }
      })
      .on("error", function (error) {
        addTxError(error);
      });
  }
});

async function vote(e) {
  const pollIndex = e.target.getAttribute("data-poll-index");
  const voteYes = e.target.getAttribute("data-vote") === "true";

  await window.contract.methods
    .vote(pollIndex, voteYes)
    .send({ from: account, gas: gasPrice })
    .on("transactionHash", function (hash) {
      addTxPending(hash);
    })
    .on("receipt", function (rec) {
      addTxSuccess(rec);
    })
    .on("error", function (error) {
      addTxError(error);
    });
}

async function updatePoll() {
  if (updatePollBool == false) {
    const pollCount = await window.contract.methods.getPollCount().call();
    for (let i = 0; i < pollCount; i++) {
      const data = await window.contract.methods.getPoll(i).call();
      if (data.togglePoll == true) {
        pollBox.innerHTML += `
        <div class="poll-module">
          <div class="poll-number">${i + 1}</div>
          <div class="close-button">&#10006;</div>
          <h2 class="poll-title">${data.question}</h2>
            <div class="poll-options">
              <button class="poll-option" data-poll-index="${i}" data-vote="true">Yes</button>
              <button class="poll-option" data-poll-index="${i}" data-vote="false">No</button>
            </div>
          <div class="close-button close-poll" data-poll-index="${i}">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
        </div>
        `;

        let pollOptions = document.querySelectorAll(".poll-option");
        pollOptions.forEach((option) => {
          option.addEventListener("click", vote);
        });
      } else {
        let yesNumber = parseInt(data.yesVotes, 10);
        let noNumber = parseInt(data.noVotes, 10);
        closePollBox.innerHTML += `
        <div class="poll-module">
          <div class="poll-number">${i + 1}</div>
          <h2 class="poll-title">${data.question}</h2>
          <div class="poll-options">
            <div class="poll-option">Yes ${yesNumber}</div>
            <div class="poll-option">No ${noNumber}</div>
          </div>
          <div></div>
        </div>
        `;
      }
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

function displayAccount() {
  displayAccountAddress.innerHTML =
    account.slice(0, 5) + "..." + account.slice(-5);
  displayAccountAddress.setAttribute(
    "href",
    `https://goerli.arbiscan.io/address/${account}`
  );
}

function addAccountBox() {
  accountBox.classList.remove("hidden");
}

function addTxPending(hash) {
  counterTx++;
  let shortHash = hash.slice(0, 6) + "...." + hash.slice(-6);
  txDisplay.innerHTML += `<div id="tx-${counterTx}">In pending: <a href="https://goerli.arbiscan.io/tx/${hash}">${shortHash}</a></div>`;
  const txNumber = document.getElementById(`tx-${counterTx}`);
  txNumber.style.color = "orange";
}

function addTxSuccess(rec) {
  let shortHash =
    rec.transactionHash.slice(0, 6) + "..." + rec.transactionHash.slice(-6);
  const txNumber = document.getElementById(`tx-${counterTx}`);
  console.log(txNumber);
  txNumber.innerHTML = `Tx success: <a href="https://goerli.arbiscan.io/tx/${rec.transactionHash}">${shortHash}</a>`;
  txNumber.style.color = "green";
}

function addTxError(error) {
  const txNumber = document.getElementById(`tx-${counterTx}`);
  txNumber.innerHTML = "Tx error";
  txNumber.style.color = "red";
}
