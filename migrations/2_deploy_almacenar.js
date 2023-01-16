const Almacenar = artifacts.require("Almacenar");

module.exports = function(deployer) {
  deployer.deploy(Almacenar);
};