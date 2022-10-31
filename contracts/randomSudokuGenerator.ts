const randomSudokuGeneratorABI: any[] = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_linkAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_wrapperAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_seedsManager",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "REQUEST_NOT_FOUND",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "UNABLE_TO_TRANSFER",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "VALUE_OUT_OF_BOUNDS",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferRequested",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "requestId",
        "type": "uint256"
      }
    ],
    "name": "RequestFulfilled",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "requestId",
        "type": "uint256"
      }
    ],
    "name": "RequestSent",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "MAX_DIFFICULTY_VALUE",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MIN_DIFFICULTY_VALUE",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "acceptOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_seedsManager",
        "type": "address"
      }
    ],
    "name": "changeSeedsManager",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint32",
        "name": "seed",
        "type": "uint32"
      },
      {
        "internalType": "uint8",
        "name": "difficulty",
        "type": "uint8"
      }
    ],
    "name": "generateSudoku",
    "outputs": [
      {
        "internalType": "string",
        "name": "sudoku",
        "type": "string"
      },
      {
        "internalType": "bytes32",
        "name": "solution",
        "type": "bytes32"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getDifficultyRange",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "min",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "max",
        "type": "uint8"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_requestId",
        "type": "uint256"
      }
    ],
    "name": "getRequestStatus",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "paid",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "fulfilled",
            "type": "bool"
          },
          {
            "internalType": "uint8",
            "name": "difficulty",
            "type": "uint8"
          },
          {
            "internalType": "string",
            "name": "sudoku",
            "type": "string"
          },
          {
            "internalType": "bytes32",
            "name": "solution",
            "type": "bytes32"
          }
        ],
        "internalType": "struct RandomSudokuGenerator.RequestStatus",
        "name": "request",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "lastRequestId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_requestId",
        "type": "uint256"
      },
      {
        "internalType": "uint256[]",
        "name": "_randomWords",
        "type": "uint256[]"
      }
    ],
    "name": "rawFulfillRandomWords",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "requestIds",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "_difficulty",
        "type": "uint8"
      }
    ],
    "name": "requestRandomSudoku",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "requestId",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "s_requests",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "paid",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "fulfilled",
        "type": "bool"
      },
      {
        "internalType": "uint8",
        "name": "difficulty",
        "type": "uint8"
      },
      {
        "internalType": "string",
        "name": "sudoku",
        "type": "string"
      },
      {
        "internalType": "bytes32",
        "name": "solution",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "seedsManager",
    "outputs": [
      {
        "internalType": "contract SeedsManager",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdrawLink",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
export default randomSudokuGeneratorABI;