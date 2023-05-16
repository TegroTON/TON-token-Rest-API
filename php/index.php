<?php

require_once 'TonClient.php';

// Types of contracts for the wallet
// 'simpleR1': SimpleWalletContractR1,
// 'simpleR2': SimpleWalletContractR2,
// 'simpleR3': SimpleWalletContractR3,
// 'v2R1': WalletV2ContractR1,
// 'v2R2': WalletV2ContractR2,
// 'v3R1': WalletV3ContractR1,
// 'v3R2': WalletV3ContractR2,
// 'v4R1': WalletV4ContractR1,
// 'v4R2': WalletV4ContractR2

try
{
	/*
	* The first parameter is the IP address and port of the docker container ton-server
	* The second and third parameters are ton-http api, it can be raised by docker locally,
	* or use the public https://toncenter.com/api/v2/jsonRPC,
	* but you need to get the key via telegram bot (third parameter),
	* because there is a limit of 1 request per 1 second, several requests are used for a transaction
	*/

	// $ton = new TonClient('v4R2', 'http://127.0.0.1:5885/', 'http://ip-http-ton-server:port/jsonRPC', '');
	$ton = new TonClient('v4R2', 'http://127.0.0.1:5885/', 'https://toncenter.com/api/v2/jsonRPC', '__KEY__');

	// Create wallet
	// print_r($ton->createWallet());

	// Transfer TON
	// print_r($ton->sendTransaction(
	// 'sauce garbage magnum minor door please safe innocent life margin soap west start merge hobby real genuine penalty bridge monkey wedding increase scan parent',
	// 'EQBLjQWtorJYPNFQFflgofPMH8xmFJH6B8t1d9_RS3901wTp',
	// '0.02',
	// 'verify'));

	// Transfer TGR
	// When transferring, the balance must be greater than 0.05 TON Coin
	// print_r($ton->sendTransactionJetton(
	// 'sauce garbage dolphin minor door please safe innocent life margin obscure west start merge hobby real genuine penalty bridge monkey wedding increase scan parent',
	// 'EQBLjQWtorJYPNFQFflgofPMH8xmFJH6B8t1d9_RS6dT1wTp',
	// 	'1',
	// 'TGR'));

	// Get balance
	// print_r($ton->getBalance('EQBi4fdhHzjkIwXBEQL1cuquwnKGIyMVH1BA34VnqmAx4l7P'));

	// Get transaction
	// print_r($ton->getTransaction('EQBLjQWtorJYPNFQFflgofPMH8xmF236B8t1d9_RS6dT1wTp'));
}
catch (Exception $e)
{
	print 'ERROR: ' . $e->getMessage();
}
