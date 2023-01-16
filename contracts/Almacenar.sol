pragma solidity 0.5.0;

contract Almacenar {
    string hash;
    function set (string memory _hash)public{
        hash = _hash;
    }
    function obtener () public view returns (string memory){
        return hash;
    }
}