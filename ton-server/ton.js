
// version 1.0.1

const TonWeb = require('tonweb');
const tonMnemonic = require('tonweb-mnemonic');

class TonClient
{
    constructor(provider, key, type, jettons)
	{
		this.tonweb = new TonWeb(new TonWeb.HttpProvider(provider, {apiKey: key}));
		this.jettons = [];
		this.type = type;
		this.jettonsInfo = jettons;
	}

	async getTransaction(address)
	{
		return await this.tonweb.provider.getTransactions(address, 20);
	}

	async getBalance(address)
	{
		let ret =
		{
			balance: await this.getBalanceTON(address),
			jettons: await this.getBalanceJettons(address)
		};

		return ret;
	}

	async getBalanceTON(address)
	{
		return (await this.tonweb.getBalance(address)) / 1000000000;
	}

	async getBalanceJettons(address, jettonName = false)
	{
		await this.prepare(address);

		if (jettonName)
		{
			let balance;
			try
			{
				balance = (await this.jettons[jettonName].jettonWallet.getData()).balance.toString() / 1000000000;;
			}
			catch (error)
			{
				balance = 0;
			}

			return balance;
		}

		let jettons = {};
		for (const name in this.jettons)
		{
			let balance;
			try
			{
				balance = (await this.jettons[name].jettonWallet.getData()).balance.toString() / 1000000000;;
			}
			catch (error)
			{
				balance = 0;
			}

			jettons[name] = balance;
		}

		return jettons;
	}

	async prepare(address)
	{
		const hotWalletAddress = new TonWeb.utils.Address(address);

		for (const name in this.jettonsInfo)
		{
			const info = this.jettonsInfo[name];
			const jettonMinter = new TonWeb.token.jetton.JettonMinter(this.tonweb.provider,
				{
					address: info.address
				});
			const jettonWalletAddress = await jettonMinter.getJettonWalletAddress(hotWalletAddress);
			const jettonWallet = new TonWeb.token.jetton.JettonWallet(this.tonweb.provider,
				{
					address: jettonWalletAddress
				});
			this.jettons[name] =
			{
				jettonMinter: jettonMinter,
				jettonWalletAddress: jettonWalletAddress,
				jettonWallet: jettonWallet
			};
		}
	}

	async createWallet()
	{
		tonMnemonic.wordlists.EN;
		const mnemonic = await tonMnemonic.generateMnemonic();
		const keyPair = await tonMnemonic.mnemonicToKeyPair(mnemonic);
		const WalletClass = this.tonweb.wallet.all[this.type];
		const wallet = new WalletClass(this.tonweb.provider,
			{
				publicKey: keyPair.publicKey
			});

		const address = await wallet.getAddress();
		const jettonsAddress = await this.getAddressJettons(address);

		const ret =
		{
			address: address.toString(true, true, true),
			jettons: jettonsAddress,
			mnemonic: mnemonic,
			mnemonicStr: mnemonic.join(' '),
			publicKey: TonWeb.utils.bytesToHex(keyPair.publicKey),
			privateKey: TonWeb.utils.bytesToHex(keyPair.secretKey)
		};

		return ret;
	}

	async getAddressJettons(address, jettonName = false)
	{
		await this.prepare(address);

		if (jettonName)
		{
			return this.jettons[jettonName].jettonWalletAddress.toString(true, true, true);
		}

		let jettons = {};
		for (const name in this.jettons)
		{
			jettons[name] = this.jettons[name].jettonWalletAddress.toString(true, true, true);
		}

		return jettons;
	}

	async createTransfer(mnemonics, toAddress, amount, payload = null, jetton = null)
	{
		const arrMnemonics = mnemonics.split(' ');
		if (arrMnemonics.length != 24)
		{
			throw new Error('Incorrect number of mnemonics phrases');
		}
		const keyPair = await tonMnemonic.mnemonicToKeyPair(arrMnemonics);

		const WalletClass = this.tonweb.wallet.all[this.type];
		const wallet = new WalletClass(this.tonweb.provider,
			{
				publicKey: keyPair.publicKey
			});

		const fromAddress = (await wallet.getAddress()).toString(true, true, true);

		let balance;
		let jettonWallet, jettonAddress;
		const jettonAmountTon = '0.05';
		if (jetton !== null)
		{
			balance = await this.getBalanceJettons(fromAddress, jetton);

			jettonWallet = this.jettons[jetton].jettonWallet;
			jettonAddress = await this.getAddressJettons(fromAddress, jetton);

			const balanceTon = await this.getBalanceTON(fromAddress);
			if (balanceTon < jettonAmountTon)
			{
				throw new Error('The balance of TON Coin must be greater than 0.05');
			}
		}
		else
		{
			balance = await this.getBalanceTON(fromAddress);
		}

		if (amount > balance)
		{
			throw new Error('There is not enough balance to process the withdrawal');
		}

		const info = await this.tonweb.provider.getAddressInfo(toAddress);
		if (info.state !== 'active')
		{
			toAddress = new TonWeb.utils.Address(toAddress).toString(true, true, false);
		}

		const seqno = await wallet.methods.seqno().call() || 0;

		if (jetton !== null)
		{
			payload = await jettonWallet.createTransferBody(
				{
					jettonAmount: TonWeb.utils.toNano(amount),
					toAddress: new TonWeb.utils.Address(toAddress),
					responseAddress: new TonWeb.utils.Address(fromAddress)
				});

			toAddress = jettonAddress;
			amount = jettonAmountTon;
		}

		const transfer = await wallet.methods.transfer(
			{
				secretKey: keyPair.secretKey,
				toAddress: toAddress,
				amount: TonWeb.utils.toNano(amount),
				seqno: seqno,
				payload: payload,
				sendMode: 3
			});

		const transferSended = await transfer.send();

		return transferSended;
	}
}

module.exports = { TonClient };
