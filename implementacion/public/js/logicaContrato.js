const conectarContrato = async () => {
    const contratoVotacionJSON = await fetch("/contracts/SistemaVotacion.json").then(res => res.json());
	
	const web3 = new Web3("http://127.0.0.1:7545");
	const abi = contratoVotacionJSON.abi;
	const addressContrato = "0x89D53B382e1F9032C750d1a8D7F7Dd619fbA6C0f";
	const contratoVotacion = new web3.eth.Contract(abi, addressContrato);
	
	return contratoVotacion;

	// const contratoVotacion = TruffleContract(contratoVotacionJSON);
	
	// contratoVotacion.setProvider(window.ethereum);
	// return await contratoVotacion.deployed();
};