
// version 1.0.1

const express = require('express');
const app = express();
const router = express.Router();

const ton = require('./ton.js');

router.get('/', (_req, res) =>
	{
		res.status(200).json(
			{
				message: 'Hello world!',
			});
	});

router.get('/createWallet', async (_req, res) =>
	{
		var {provider, providerKey, type, jettons} = _req.query;

		try
		{
			const tonClient = new ton.TonClient(provider, providerKey, type, jettons);
			result = await tonClient.createWallet();

			res.status(200).json(
				{
					status: true,
					result: result
				});
		}
		catch (e)
		{
			res.status(400).json(
				{
					status: false,
					error: e.toString()
				});
		}
	})

router.get('/getBalance', async (_req, res) =>
{
	const {address, provider, providerKey, type, jettons} = _req.query;

	try
	{
		const tonClient = new ton.TonClient(provider, providerKey, type, jettons);
		result = await tonClient.getBalance(address);

		res.status(200).json(
			{
				status: true,
				result: result
			});
	}
	catch (e)
	{
		res.status(400).json(
			{
				status: false,
				error: e.toString()
			});
	}
});

router.get('/getTransaction', async (_req, res) =>
	{
		const {address, provider, providerKey, type, jettons} = _req.query;

		try
		{
			const tonClient = new ton.TonClient(provider, providerKey, type, jettons);
			result = await tonClient.getTransaction(address);

			res.status(200).json(
				{
					status: true,
					result: result
				});
		}
		catch (e)
		{
			res.status(400).json(
				{
					status: false,
					error: e.toString()
				});
		}
	});

router.get('/sendTransaction', async (_req, res) =>
	{
		const {mnemonics, toAddress, amount, payload, jetton, provider, providerKey, type, jettons} = _req.query;

		try
		{
			const tonClient = new ton.TonClient(provider, providerKey, type, jettons);
			result = await tonClient.createTransfer(mnemonics, toAddress, amount, payload, jetton);

			res.status(200).json(
				{
					status: true,
					result: result
				});
		}
		catch (e)
		{
			res.status(400).json(
				{
					status: false,
					error: e.toString()
				});
		}
	});

router.get('/*', (_req, res) =>
	{
		res.status(400).json(
			{
				error: 'Router not found'
			});
	});

app.use('/', router)
app.listen(80, () =>
	{
		console.log('Server run');
	});
