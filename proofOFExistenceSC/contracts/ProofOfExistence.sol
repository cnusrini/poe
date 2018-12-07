pragma solidity ^0.4.18;

contract ProofOfExistence {

  mapping(bytes32 => bool) public proofs;

  function storeProof(bytes32 proof) public{
    proofs[proof] = true;
  }
  function notarize(string document) public {
    bytes32 proof = proofFor(document);
    storeProof(proof);
  }
  function proofFor(string document) public pure returns(bytes32 proof){
    return sha256(document);
  }

  function checkDocument(string document) public constant returns(bool){
    bytes32 proof = proofFor(document);
    return hasProof(proof);
  }
  function hasProof(bytes32 proof) public constant returns(bool){

    return proofs[proof];
  }
  
}
