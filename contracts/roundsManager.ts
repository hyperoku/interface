const roundsManagerABI: any[] = [
	{
		"inputs": [
		{
			"internalType": "address",
			"name": "_random_sudoku_generator",
			"type": "address"
		}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "DIFFICULTY_NAME_ALREADY_EXISTS",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "DIFFICULTY_NAME_NOT_FOUND",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "DIFFICULTY_VALUE_ALREADY_EXISTS",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "DIFFICULTY_VALUE_OUT_OF_BOUNDS",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "GAME_ALREADY_SOLVED",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "PLAYER_IS_NOT_THE_OWNER",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "ROUND_ENDS_SOON",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "SOLUTION_IS_WRONG",
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
			"internalType": "uint64",
			"name": "game_id",
			"type": "uint64"
		}
		],
		"name": "gameCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
		{
			"indexed": true,
			"internalType": "uint64",
			"name": "game_id",
			"type": "uint64"
		}
		],
		"name": "gameSolved",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
		{
			"indexed": true,
			"internalType": "uint32",
			"name": "round_id",
			"type": "uint32"
		}
		],
		"name": "roundCreated",
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
			"internalType": "string",
			"name": "_name",
			"type": "string"
		},
		{
			"internalType": "uint8",
			"name": "_value",
			"type": "uint8"
		}
		],
		"name": "addNewDifficulty",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
		{
			"internalType": "address",
			"name": "_new_random_sudoku_generator",
			"type": "address"
		}
		],
		"name": "changeRandomSudokuGenerator",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
		{
			"internalType": "string",
			"name": "_difficulty",
			"type": "string"
		}
		],
		"name": "createGame",
		"outputs": [
		{
			"internalType": "uint64",
			"name": "game_id",
			"type": "uint64"
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
		"name": "difficulty_names",
		"outputs": [
		{
			"internalType": "string",
			"name": "",
			"type": "string"
		}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
		{
			"internalType": "string",
			"name": "",
			"type": "string"
		}
		],
		"name": "difficulty_values",
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
		"name": "getDifficultyNames",
		"outputs": [
		{
			"internalType": "string[]",
			"name": "",
			"type": "string[]"
		}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
		{
			"internalType": "uint64",
			"name": "_game_id",
			"type": "uint64"
		}
		],
		"name": "getGame",
		"outputs": [
		{
			"components": [
			{
				"internalType": "uint256",
				"name": "request_id",
				"type": "uint256"
			},
			{
				"internalType": "uint64",
				"name": "id",
				"type": "uint64"
			},
			{
				"internalType": "uint32",
				"name": "round_id",
				"type": "uint32"
			},
			{
				"internalType": "address",
				"name": "player",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "start_blockNumber",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "end_blockNumber",
				"type": "uint256"
			}
			],
			"internalType": "struct RoundsManager.Game",
			"name": "",
			"type": "tuple"
		}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
		{
			"internalType": "string",
			"name": "_difficulty",
			"type": "string"
		}
		],
		"name": "getLastActiveRound",
		"outputs": [
		{
			"components": [
			{
				"internalType": "uint32",
				"name": "id",
				"type": "uint32"
			},
			{
				"internalType": "string",
				"name": "difficulty",
				"type": "string"
			},
			{
				"internalType": "uint64[]",
				"name": "game_ids",
				"type": "uint64[]"
			},
			{
				"internalType": "uint256",
				"name": "start_blockNumber",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "end_blockNumber",
				"type": "uint256"
			}
			],
			"internalType": "struct RoundsManager.Round",
			"name": "",
			"type": "tuple"
		}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
		{
			"internalType": "uint32",
			"name": "_round_id",
			"type": "uint32"
		}
		],
		"name": "getRound",
		"outputs": [
		{
			"components": [
			{
				"internalType": "uint32",
				"name": "id",
				"type": "uint32"
			},
			{
				"internalType": "string",
				"name": "difficulty",
				"type": "string"
			},
			{
				"internalType": "uint64[]",
				"name": "game_ids",
				"type": "uint64[]"
			},
			{
				"internalType": "uint256",
				"name": "start_blockNumber",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "end_blockNumber",
				"type": "uint256"
			}
			],
			"internalType": "struct RoundsManager.Round",
			"name": "",
			"type": "tuple"
		}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
		{
			"internalType": "string",
			"name": "",
			"type": "string"
		}
		],
		"name": "last_active_round_ids",
		"outputs": [
		{
			"internalType": "uint32",
			"name": "",
			"type": "uint32"
		}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "min_game_duration_in_blocks",
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
		"inputs": [],
		"name": "random_sudoku_generator",
		"outputs": [
		{
			"internalType": "contract RandomSudokuGenerator",
			"name": "",
			"type": "address"
		}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "round_duration_in_blocks",
		"outputs": [
		{
			"internalType": "uint32",
			"name": "",
			"type": "uint32"
		}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
		{
			"internalType": "uint64",
			"name": "_game_id",
			"type": "uint64"
		},
		{
			"internalType": "string",
			"name": "_player_solution",
			"type": "string"
		}
		],
		"name": "solveGame",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "total_games",
		"outputs": [
		{
			"internalType": "uint64",
			"name": "",
			"type": "uint64"
		}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "total_rounds",
		"outputs": [
		{
			"internalType": "uint32",
			"name": "",
			"type": "uint32"
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
	}
]
export default roundsManagerABI;