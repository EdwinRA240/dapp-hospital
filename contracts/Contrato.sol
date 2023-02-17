//SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Contrato {
//------------------------------------declaracion de estructuras para variables
    struct MedicalRecord {
        address adressP;
        address adressM;
        string patientName;
        uint age;
        string diagnosis;
        string treatment;
        string date;
        string fileHash;
    }
    struct Patient {
        string   nombreP;
        string   apellidosP;
        string   telefonoP;
        address   adressP;
        string   correoP;
        string   passP;
        bool registradoP;
    }
    struct Med {
        string   nombreM;
        string   apellidosM;
        string   telefonoM;
        address   adressM;
        string   correoM;
        string   passM;
        string    idM;
        string   espM;
        bool registradoM;
    }

    string[] authorizedIDs = ["M1","M2","M3","M4","M5"];

//-------------------------------------------------------- Mapeo 
    mapping(address => MedicalRecord[]) records;
    mapping(address => Patient) public patients;
    mapping(address => Med) meds;
    mapping(address => bool) authenticatedPatients;
    mapping(address => bool) authenticatedMed;
    mapping(string => bool) idInUse;

//-----------------------------------------------------Funciones


    function addRecord(address _adressP, address _adressM, string memory _patientName, uint _age, string memory _diagnosis, 
        string memory _treatment,string memory _date,string memory _fileHash) public {
        if (patients[_adressP].registradoP) {
            MedicalRecord memory newRecord = MedicalRecord({
                                                        adressP: _adressP,
                                                        adressM: _adressM,
                                                        patientName: _patientName,
                                                        age: _age,
                                                        diagnosis: _diagnosis,
                                                        treatment: _treatment,
                                                        date: _date,
                                                        fileHash: _fileHash
                                                        });
            records[_adressP].push(newRecord);} else {
                revert("La addresd que estas ingresando no esta registrada, el paciente no existe");
            }
    }

    // Función para consultar todos los expedientes de un paciente
    function getRecords(address _adressP) public view returns (MedicalRecord[] memory) {
        return records[_adressP];
        } 

    // Función para consultar un expediente clínico
    //function getRecord(address _adressP, uint indice) public view returns (address, string, string) {
    //    Expediente memory expediente = expedientes[paciente][indice];
    //    return (expediente.paciente, expediente.historialMedico, expediente.tratamiento);
    //}

    // Evento que se desencadena al agregar un paciente
    event PatientAdded(address indexed patientAddress, string  _nombreP, string  _apellidosP, string  _telefonoP, address  _adressP,
        string  _correoP,string  _passP);

    // Función nuevo paciente
    function addPatient(string memory  _nombreP, string memory  _apellidosP, string memory  _telefonoP, address  _adressP,
        string memory  _correoP, string memory  _passP) public {
        // Comprobar si el usuario ya existe en el mapping
        if (patients[_adressP].registradoP) {
            // Enviar una excepción si el usuario ya existe
            revert("La address que estas ingresando ya esta registrada, ya existe este paciente");
        }
        // Crea una nueva instancia del paciente
        Patient memory newPatient = Patient({
                                                nombreP:_nombreP, 
                                                apellidosP:_apellidosP,
                                                telefonoP: _telefonoP,
                                                adressP:_adressP,
                                                correoP:_correoP,
                                                passP:_passP,
                                                registradoP:true});
        // Asigna el paciente al mapeo
        //patients[_id] = Patient(_name, _id, _age, _gender, _address);
        patients[msg.sender] = newPatient;
        // Desencadena el evento
        emit PatientAdded(msg.sender,_nombreP, _apellidosP, _telefonoP,_adressP,_correoP,_passP);
    }

    function patientExists(address _patientAddress) public view returns (bool) {
    return patients[_patientAddress].registradoP;
    }

    // Función Iniciar sesion paciente
    function loginPatient(address  _adress, string memory   _pass) public returns (bool) {
            require(keccak256(abi.encodePacked(patients[_adress].passP)) ==  keccak256(abi.encodePacked(_pass)), "Incorrect username or password.");
            require(keccak256(abi.encodePacked(patients[_adress].adressP)) ==  keccak256(abi.encodePacked(_adress)), "Incorrect username or password.");
            authenticatedPatients[msg.sender] = true;
            return true;      
    }

    // Función para recuperar la información paciente
    function getPatientInfo(address _patient) public view returns (string memory , string memory, string memory , address ,
        string memory , string memory ) {
        Patient memory patient = patients[_patient];
        return (patient.nombreP, patient.apellidosP, patient.telefonoP,patient.adressP, patient.correoP, patient.passP);
    }

    // Evento que se desencadena al agregar un medico
    event MedAdded(address indexed medAddress, string  _nombreM, string  _apellidosM, string  _telefonoM,address  _adressM,
        string  _correoM, string  _passM, string  _idM, string  _espM);

    // Función nuevo trabajador de la salud
    function addMed(string memory  _nombreM, string memory  _apellidosM, string memory  _telefonoM, address  _adressM,
        string memory  _correoM, string memory  _passM, string memory  _idM, string memory  _espM) public {
        // Comprobar si el usuario ya existe en el mapping
        if (meds[_adressM].registradoM) {
            // Enviar una excepción si el usuario ya existe
            revert("La addres que estas ingresando ya esta registrada, ya existe este medico");
        }
        // Verifica si el string dado está en la lista de id autorizados
        require(checkID(_idM), "El id de empleado no existe");
        require(!idInUse[_idM], "Este id ya esta en uso");
        idInUse[_idM]=true;
        // Crea una nueva instancia del paciente
        Med memory newMed = Med({
                                                nombreM:_nombreM, 
                                                apellidosM:_apellidosM,
                                                telefonoM: _telefonoM,
                                                adressM:_adressM,
                                                correoM:_correoM,
                                                passM:_passM,
                                                idM:_idM,
                                                espM:_espM,
                                                registradoM:true});
        // Asigna el paciente al mapeo
        //patients[_id] = Patient(_name, _id, _age, _gender, _address);
        meds[msg.sender] = newMed;
        // Desencadena el evento
        emit MedAdded(msg.sender,_nombreM, _apellidosM, _telefonoM,_adressM,_correoM,_passM,_idM,_espM);
    }

    function medExists(address _patientAddress) public view returns (bool) {
    return meds[_patientAddress].registradoM;
    }

    // Función Iniciar trabajador de la salud
    function loginMed(address  _adress, string memory   _pass) public returns (bool) {
            require(keccak256(abi.encodePacked(meds[_adress].passM)) ==  keccak256(abi.encodePacked(_pass)), "Incorrect username or password.");
            require(keccak256(abi.encodePacked(meds[_adress].adressM)) ==  keccak256(abi.encodePacked(_adress)), "Incorrect username or password.");
            authenticatedMed[msg.sender] = true;
            return true;
    }

    // Función para recuperar la información trabajador de la salud
    function getMedInfo(address _med) public view returns (string memory , string memory, string memory ,address ,string memory ,
        string memory, string memory, string memory ) {
        Med memory med = meds[_med];
        return (med.nombreM, med.apellidosM, med.telefonoM,med.adressM, med.correoM, med.passM, med.idM, med.espM);
    }

    // Función para comprobar si un id está en la lista de id autorizados
    function checkID(string memory _idM) public view returns (bool) {
        // Verifica si el id dado está en la lista de strings autorizados
        for (uint i = 0; i < authorizedIDs.length; i++) {
            if (keccak256(abi.encodePacked(_idM)) == keccak256(abi.encodePacked(authorizedIDs[i]))) {
                return true;
            }
        }
        return false;
    }

}