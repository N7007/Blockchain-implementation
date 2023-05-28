import('https://cdnjs.cloudflare.com/ajax/libs/web3/1.2.7-rc.0/web3.min.js')
  .then(() => {
    const connectContract = async () => {
        const ABI = [
            {
                "inputs": [],
                "name": "myCity",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ];
        
        const contractAddress = "0x325f099568443B6971b85e4e93051c49bd635409";
        const contractABI = [
            {
                "inputs": [],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "string",
                        "name": "mensaje",
                        "type": "string"
                    }
                ],
                "name": "EnviarMensaje",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_dni",
                        "type": "uint256"
                    }
                ],
                "name": "buscarVotante",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
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
                "name": "candidatos",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "nombre",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "numero",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "votos",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "_nombre",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "_apellido",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_dni",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_numero_candidato",
                        "type": "uint256"
                    }
                ],
                "name": "registrarVotante",
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
                "name": "votantes",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "nombre",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "apellido",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "dni",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "voto",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ]

        window.web3 = await new Web3(window.ethereum);
        window.contract = await new window.web3.eth.Contract(contractABI, contractAddress);

        document.getElementById("contractArea").innerHTML = "connected to smart contract";
    };
  });