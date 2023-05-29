//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract SistemaVotacion {
    // Los structs son estructuras de datos instanciables al igual que las clases, solo que trabajan puramente con propiedades
    // y no con métodos.
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
    Votante[] public votantes;
    Candidato[] public candidatos;

    function getCandidatos() public view returns (Candidato[] memory) {
        return candidatos;
    }

    // Evento para registrar mensajes informativios (ver funcion "registrarVotante")
    event EnviarMensaje(string mensaje);

    // Se ejecuta automáticamente una sola vez al momento de desplegar (deploy). Se utiliza para inicializar el estado del contrato.
    constructor() {
        candidatos.push(Candidato("Donald Trump", 1, 0));
        candidatos.push(Candidato("Michael Jackson", 2, 0));
        candidatos.push(Candidato("Indio Solari", 3, 0));
    }

    // Devuelve un valor booleano dependiendo de si encuentra a un votante en la lista o no.
    function buscarVotante(uint256 _dni) public view returns (bool) {
        for (uint256 i = 0; i < votantes.length; i++) {
            if (votantes[i].dni == _dni) {
                return true; // El votante existe en la lista, se retorna 'true'.
            }
        }

        return false; // El votante existe en la lista, se retorna 'false'.
    }

    // Se registra al votante en la blockchain y se suma su voto al candidato elegido
    function registrarVotante(string memory _nombre, string memory _apellido, uint256 _dni, uint256 _numero_candidato) public returns (uint256) {
        bytes32 hashDNI = keccak256(abi.encode(_dni));
        string memory mensaje = string(abi.encodePacked("El votante ", hashDNI, " ha intentado emitir un voto a favor de un candidato no registrado."));
        uint256 codigo_salida = 2;

        // Verificar si el votante no ha emitido un voto antes. Si fue así, cancelar la operación.
        if (buscarVotante(_dni)) {
            mensaje = string(abi.encodePacked("Voto cancelado. El votante ", hashDNI, " ya ha emitido un voto previamente."));
            codigo_salida = 1; // Retorna 1 si ya había votado.
        } else {
            for (uint256 i = 0; i < candidatos.length; i++) {
                if (candidatos[i].numero == _numero_candidato) {
                    votantes.push(Votante(_nombre, _apellido, _dni, candidatos[i].nombre));
                    candidatos[i].votos += 1;

                    mensaje = string(abi.encodePacked("Voto satisfactorio. El votante ", hashDNI, "ha emitido un voto a favor de ", candidatos[i].nombre));
                    codigo_salida = 0;
                    emit EnviarMensaje(mensaje);
                    return codigo_salida; // Retorna 0 si salió exitosamente.
                }
            }
        }

        emit EnviarMensaje(mensaje);
        return 1; // Retorna 1 si salió exitosamente.
    }
}
