const conectarContrato = async () => {
    const contratoVotacionJSON = await fetch("/contracts/SistemaVotacion.json").then(res => res.json());
	
	const web3 = new Web3("http://127.0.0.1:7545");
	const abi = contratoVotacionJSON.abi;
	const addressContrato = "0xb1539F724CECB9562E0CD87c74D9cE8da158084B";
	const contratoVotacion = new web3.eth.Contract(abi, addressContrato);
	
	return contratoVotacion;
};