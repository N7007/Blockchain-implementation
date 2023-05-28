//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
contract VotingContract {

    // Las struct son como diccionarios pero son diferentes
    struct Votante {
        string nombre;
        string apellido;
        uint256 dni;
        string voto;
    }
    
    struct Candidato {
        string nombre;
        uint256 numero;
        uint256 votos;
    }
    
    // Listas de los Struct
    Votante[] public  votantes;
    Candidato[] public candidatos;

    // Evento para registrar los datos en la blockchain (ver funcion "registrarVotante")
    event RegistrarData(bytes32 data);

    // Se ejecuta automáticamente una sola vez al momento de desplegar (deploy). Se utiliza para inicializar el estado del contrato
    constructor() {
        candidatos.push(Candidato("DONALD_TRUMP", 1, 0));
        candidatos.push(Candidato("MICHAEL_JACKSON", 2, 0));
        candidatos.push(Candidato("INDIO_SOLARI", 3, 0));
    }

    // En caso de que exista el votante se activará un error en la página
    function comprobarVotante(uint256 _dni) public view returns(bool) {
        for (uint256 i = 0; i < votantes.length; i++) {
            if (votantes[i].dni == _dni) {
                return true;  // El votante existe en la lista
            }
        }
        return false;  // El votante no existe en la lista
    }

    // Se registra al votante en la blockchain y se suma su voto al candidato elegido
    function registrarVotante(string memory _nombre, string memory _apellido, uint256 _dni, uint256 numero_candidato) public {
        for(uint256 i = 0; i < candidatos.length; i++){
            if (candidatos[i].numero == numero_candidato) {
                votantes.push(Votante(_nombre, _apellido, _dni, candidatos[i].nombre));
                candidatos[i].votos += 1;
                // Concatenar los datos en una sola cadena
                string memory concatenatedData = string(abi.encodePacked(_nombre, _apellido, _dni, candidatos[i].nombre));
                // Calcular el hash de los datos concatenados
                bytes32 dataHash = keccak256(bytes(concatenatedData));
                // Registrar los datos emitiento un evento
                emit RegistrarData(dataHash);
            }
        }
    }
}