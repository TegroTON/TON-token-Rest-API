<?php

/*
 * version 1.0.1
 */
class TonClient
{
	private $type;
	private $SDKServer;
	private $provider;
	private $providerKey;
	private $types = ['simpleR1', 'simpleR2', 'simpleR3', 'v2R1', 'v2R2', 'v3R1', 'v3R2', 'v4R1', 'v4R2'];
	public $jettons =
	[
		'TGR' =>
		[
			'address' => 'EQAvDfWFG0oYX19jwNDNBBL1rKNT9XfaGP9HyTb5nb2Eml6y'
		],
	];


	public function __construct($type, $SDKServer, $provider, $providerKey)
	{
		if (!in_array($type, $this->types))
		{
			throw new Exception('Unknown type of wallet contract');
		}

		$this->type = $type;
		$this->SDKServer = $SDKServer;
		$this->provider = $provider;
		$this->providerKey = $providerKey;
	}

	/*
	 * Создание кошелька
	 */
	public function createWallet()
	{
		return $this->send('createWallet');
	}

	/*
	 * Получение баланса кошелька
	 */
	public function getBalance($address)
	{
		return $this->send('getBalance',
			[
				'address' => $address,
			]);
	}

	/*
	 * Получение транзакций кошелька
	 */
	public function getTransaction($address)
	{
		return $this->send('getTransaction',
			[
				'address' => $address,
			]);
	}

	/*
	 * Создание транзации
	 */
	public function sendTransaction($mnemonics, $toAddress, $amount, $payload = null)
	{
		return $this->send('sendTransaction',
			[
				'mnemonics' => $mnemonics,
				'toAddress' => $toAddress,
				'amount' => $amount,
				'payload' => $payload,
			]);
	}

	/*
	 * Создание транзации TGR
	 */
	public function sendTransactionJetton($mnemonics, $toAddress, $amount, $jetton)
	{
		if (!array_key_exists($jetton, $this->jettons))
		{
			throw new Exception('Unknown jetton');
		}

		return $this->send('sendTransaction',
			[
				'mnemonics' => $mnemonics,
				'toAddress' => $toAddress,
				'amount' => $amount,
				'jetton' => $jetton,
			]);
	}

	private function send($method, $data = [])
	{
		$json = json_decode($this->request($this->SDKServer . $method . '?' . http_build_query($data +
			[
				'provider' => $this->provider,
				'providerKey' => $this->providerKey,
				'type' => $this->type,
				'jettons' => $this->jettons,
			])));

		if (!isset($json->status) OR !$json->status OR !isset($json->result) OR !$json->result)
		{
			if (isset($json->error))
			{
				throw new Exception($json->error);
			}

			throw new Exception('Unknown server response');
		}

		return $json->result;
	}

	private function request($url)
	{
		$ch = curl_init($url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		$response = curl_exec($ch);

		curl_close($ch);

		return $response;
	}
}
