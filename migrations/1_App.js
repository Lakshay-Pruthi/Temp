const MyContract = artifacts.require("App");

module.exports = function (deployer) {
    deployer.deploy(MyContract);
};