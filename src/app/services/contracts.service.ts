import { Injectable } from '@angular/core';

import Web3 from 'web3';

declare let require: any;
declare let window: any;

let tokenAbi = require('./tokenContract.json');
@Injectable({
  providedIn: "root"
})
export class ContractsService {
  
  private _account: any;
  private _web3: any;

  private _tokenContract: any;
  _tokenContractAddress = '0x96c8FbF407c007A95711D9bc9423fefF92090f37';
  // private _tokenContractAddress: string = "0x4212Ca5462dde9Ebbc8Eb7b47ea58779B77CcFf1";

  constructor() {
    this._web3 = new Web3("https://rpc-mumbai.maticvigil.com");
    this._tokenContract = new this._web3.eth.Contract(tokenAbi, this._tokenContractAddress);
    this._account = this._web3.eth.accounts.privateKeyToAccount('3386b9cbe2249e40d1d0614c820b804207a930bba1fb2e6ae56a7f239d684af4');
    this._web3.eth.defaultAccount = this._account.address;
    console.log(this._account);
  }

 async signUp(name:any, username:any, password:any, teamID:any){
  let nonce = await this._web3.eth.getTransactionCount(this._web3.eth.defaultAccount, 'pending');
  let gasPrice = await this._web3.eth.getGasPrice();
  let gasLimit = 6000000;
   
  const tx = this._tokenContract.methods.addIndividual(name, username, password, teamID);
  const gas = await tx.estimateGas({from: this._web3.eth.defaultAccount});
  const data = tx.encodeABI();
  let rawTx = {
    nonce: nonce,
    gas: gas,
    gasPrice: gasPrice,
    gasLimit: gasLimit,
    to: this._tokenContractAddress, 
    from: this._web3.eth.defaultAccount,
    data: data,
};

let signedTx = await this._web3.eth.accounts.signTransaction(rawTx, '3386b9cbe2249e40d1d0614c820b804207a930bba1fb2e6ae56a7f239d684af4'); // Issue 2
let receipt = await this._web3.eth.sendSignedTransaction(signedTx.rawTransaction);

console.log(receipt);
return receipt;
 }

 async login(username:any, password:any){
  let nonce = await this._web3.eth.getTransactionCount(this._web3.eth.defaultAccount, 'pending');
  let gasPrice = await this._web3.eth.getGasPrice();
  let gasLimit = 6000000;
   
  const tx = this._tokenContract.methods.getIDByIndividualCredentials(username, password);
  const gas = await tx.estimateGas({from: this._web3.eth.defaultAccount});
  const data = tx.encodeABI();
  let rawTx = {
    nonce: nonce,
    gas: gas,
    gasPrice: gasPrice,
    gasLimit: gasLimit,
    to: this._tokenContractAddress, 
    from: this._web3.eth.defaultAccount,
    data: data,
};

let signedTx = await this._web3.eth.accounts.signTransaction(rawTx, '3386b9cbe2249e40d1d0614c820b804207a930bba1fb2e6ae56a7f239d684af4'); // Issue 2
let receipt = await this._web3.eth.sendSignedTransaction(signedTx.rawTransaction);
let individualID = await this._tokenContract.methods.globalIndividualID().call();
console.log(individualID);
return individualID;
 }

 async dashboard(individualID:any){
let IDToIndividual = await this._tokenContract.methods.IDToIndividual(individualID).call();
console.log(IDToIndividual);
return IDToIndividual;
 }

 async getIndividualTransactions(individualID:any, arrayIndex:any) {
  let transaction = await this._tokenContract.methods.individualToTransactions(individualID, arrayIndex).call();
  console.log(transaction);
  return transaction;
 }

 async getMiniPoolIndividualTransactions(individualID:any, arrayIndex:any) {
  let transaction = await this._tokenContract.methods.miniPoolIndividualToTransactions(individualID, arrayIndex).call();
  console.log(transaction);
  return transaction;
 }

 async getTeamTransactions(teamID:any, arrayIndex:any) {
  let transaction = await this._tokenContract.methods.teamToTransactions(teamID, arrayIndex).call();
  console.log(transaction);
  return transaction;
 }

 async getMiniPoolTeamTransactions(teamID:any, arrayIndex:any) {
  let transaction = await this._tokenContract.methods.miniPoolTeamToTransactions(teamID, arrayIndex).call();
  console.log(transaction);
  return transaction;
 }

 async getIndividualTransactionArraySize(individualID:any) {
  let transactionArraySize = await this._tokenContract.methods.getIndividualTransactionSize(individualID).call();
  console.log(transactionArraySize);
  return transactionArraySize;
 }

 async getMiniPoolIndividualTransactionArraySize(individualID:any) {
  let transactionArraySize = await this._tokenContract.methods.getMiniPoolIndividualTransactionSize(individualID).call();
  console.log(transactionArraySize);
  return transactionArraySize;
 }

 async getTeamTransactionArraySize(teamID:any) {
  let transactionArraySize = await this._tokenContract.methods.getTeamTransactionSize(teamID).call();
  console.log(transactionArraySize);
  return transactionArraySize;
 }

 async getMiniPoolTeamTransactionArraySize(teamID:any) {
  let transactionArraySize = await this._tokenContract.methods.getMiniPoolTeamTransactionSize(teamID).call();
  console.log(transactionArraySize);
  return transactionArraySize;
 }

 async getTeamSize(teamID:any) {
  let teamSize = await this._tokenContract.methods.getTeamSize(teamID).call();
console.log(teamSize);
return teamSize;
 }

 async getTeamDetails(teamID:any) {
  let IDToTeam = await this._tokenContract.methods.IDToTeam(teamID).call();
console.log(IDToTeam);
return IDToTeam;
 }

 async getTeamMembersByTeamID(teamID:any, arrayIndex:any) {
  let teamMembersIDs = await this._tokenContract.methods.teamIDToTeamMembersID(teamID, arrayIndex).call();
  console.log(teamMembersIDs);
  return teamMembersIDs;
 }

 async getNumberOfTeams(){
  let numberOfTeams = await this._tokenContract.methods.teamIDCount().call();
  console.log(numberOfTeams);
  return numberOfTeams;
   }

   async getMiniPoolProfitTracker(){
    let miniPoolProfitTracker = await this._tokenContract.methods.miniPoolProfitTracker().call();
    console.log(miniPoolProfitTracker);
    return miniPoolProfitTracker;
     }

   async getBelongingTeam(individualID:any) {
    let belongingTeamID = await this._tokenContract.methods.individualIDToTeamID(individualID).call();
    console.log(belongingTeamID);
    return belongingTeamID;
   }

 async topUp(individualID2:any, amount:any){
  let nonce = await this._web3.eth.getTransactionCount(this._web3.eth.defaultAccount, 'pending');
  let gasPrice = await this._web3.eth.getGasPrice();
  let gasLimit = 6000000;
   
  const tx = this._tokenContract.methods.topUp(individualID2, amount);
  const gas = await tx.estimateGas({from: this._web3.eth.defaultAccount});
  const data = tx.encodeABI();
  let rawTx = {
    nonce: nonce,
    gas: gas,
    gasPrice: gasPrice,
    gasLimit: gasLimit,
    to: this._tokenContractAddress, 
    from: this._web3.eth.defaultAccount,
    data: data,
};

let signedTx = await this._web3.eth.accounts.signTransaction(rawTx, '3386b9cbe2249e40d1d0614c820b804207a930bba1fb2e6ae56a7f239d684af4'); // Issue 2
let receipt = await this._web3.eth.sendSignedTransaction(signedTx.rawTransaction);
return receipt;
 }

 async transfer(individualID:any, teamID:any, description:any, amount:any){
  let nonce = await this._web3.eth.getTransactionCount(this._web3.eth.defaultAccount, 'pending');
  let gasPrice = await this._web3.eth.getGasPrice();
  let gasLimit = 6000000;
   
  const tx = this._tokenContract.methods.transfer(individualID, teamID, description, amount);
  const gas = await tx.estimateGas({from: this._web3.eth.defaultAccount});
  const data = tx.encodeABI();
  let rawTx = {
    nonce: nonce,
    gas: gas,
    gasPrice: gasPrice,
    gasLimit: gasLimit,
    to: this._tokenContractAddress, 
    from: this._web3.eth.defaultAccount,
    data: data,
};

let signedTx = await this._web3.eth.accounts.signTransaction(rawTx, '3386b9cbe2249e40d1d0614c820b804207a930bba1fb2e6ae56a7f239d684af4'); // Issue 2
let receipt = await this._web3.eth.sendSignedTransaction(signedTx.rawTransaction);
return receipt;
 }

 async addToMiniPoolProfit(profit:any){
  let nonce = await this._web3.eth.getTransactionCount(this._web3.eth.defaultAccount, 'pending');
  let gasPrice = await this._web3.eth.getGasPrice();
  let gasLimit = 6000000;
   
  const tx = this._tokenContract.methods.addToMiniPoolProfit(profit);
  const gas = await tx.estimateGas({from: this._web3.eth.defaultAccount});
  const data = tx.encodeABI();
  let rawTx = {
    nonce: nonce,
    gas: gas,
    gasPrice: gasPrice,
    gasLimit: gasLimit,
    to: this._tokenContractAddress, 
    from: this._web3.eth.defaultAccount,
    data: data,
};

let signedTx = await this._web3.eth.accounts.signTransaction(rawTx, '3386b9cbe2249e40d1d0614c820b804207a930bba1fb2e6ae56a7f239d684af4'); // Issue 2
let receipt = await this._web3.eth.sendSignedTransaction(signedTx.rawTransaction);
return receipt;
 }

 async subtractFromMiniPoolProfit(amount:any){
  let nonce = await this._web3.eth.getTransactionCount(this._web3.eth.defaultAccount, 'pending');
  let gasPrice = await this._web3.eth.getGasPrice();
  let gasLimit = 6000000;
   
  const tx = this._tokenContract.methods.subtractFromMiniPoolProfit(amount);
  const gas = await tx.estimateGas({from: this._web3.eth.defaultAccount});
  const data = tx.encodeABI();
  let rawTx = {
    nonce: nonce,
    gas: gas,
    gasPrice: gasPrice,
    gasLimit: gasLimit,
    to: this._tokenContractAddress, 
    from: this._web3.eth.defaultAccount,
    data: data,
};

let signedTx = await this._web3.eth.accounts.signTransaction(rawTx, '3386b9cbe2249e40d1d0614c820b804207a930bba1fb2e6ae56a7f239d684af4'); // Issue 2
let receipt = await this._web3.eth.sendSignedTransaction(signedTx.rawTransaction);
return receipt;
 }

 async prizeTransfer(individualID:any, teamID:any, description:any, amount:any){
  let nonce = await this._web3.eth.getTransactionCount(this._web3.eth.defaultAccount, 'pending');
  let gasPrice = await this._web3.eth.getGasPrice();
  let gasLimit = 6000000;
   
  const tx = this._tokenContract.methods.prizeTransfer(individualID, teamID, description, amount);
  const gas = await tx.estimateGas({from: this._web3.eth.defaultAccount});
  const data = tx.encodeABI();
  let rawTx = {
    nonce: nonce,
    gas: gas,
    gasPrice: gasPrice,
    gasLimit: gasLimit,
    to: this._tokenContractAddress, 
    from: this._web3.eth.defaultAccount,
    data: data,
};

let signedTx = await this._web3.eth.accounts.signTransaction(rawTx, '3386b9cbe2249e40d1d0614c820b804207a930bba1fb2e6ae56a7f239d684af4'); // Issue 2
let receipt = await this._web3.eth.sendSignedTransaction(signedTx.rawTransaction);
return receipt;
 }


}
