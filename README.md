<br/>
<p align="center">

  <h3 align="center">TON/TGR Rest API </h3>

  <p align="center">
    A simple and efficient solution for interacting with the TON Network
    <br/>
    <br/>
    <a href="https://github.com/ShaanCoding/ReadME-Generator/issues">Report Bug</a>
    .
    <a href="https://github.com/ShaanCoding/ReadME-Generator/issues">Request Feature</a>
  </p>
</p>

![Downloads](https://img.shields.io/github/downloads/ShaanCoding/ReadME-Generator/total) ![Contributors](https://img.shields.io/github/contributors/ShaanCoding/ReadME-Generator?color=dark-green) ![License](https://img.shields.io/github/license/ShaanCoding/ReadME-Generator) 

## Table Of Contents

* [About the Project](#about-the-project)
* [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Contributing](#contributing)
* [License](#license)
* [Authors](#authors)
* [Acknowledgements](#acknowledgements)

## About The Project

This development was the result of a long unsuccessful process of finding a workable solution for interfacing with the TON Network and servicing balances, payments and transactions of TON coins and TGR tokens.
This solution allows you to easily set up wallet creation, balance checking, payment sending, and transaction statistics output in PHP.

## Built With

The docker container is written in .JS and communicates with the jsonRPC of the TON network. The user part is implemented in PHP.

## Getting Started

Check the version of docker, it must be the latest version
```sh
docker -v
```
For example:
Docker version 23.0.6, build ef23cbc

### Prerequisites

Docker must be installed on the server.
If iptables is used, one of the ports that will be used in the script must be open in it. 
For example: 5885

### Installation

1. Get an API Key at [http://toncenter.com/api](http://toncenter.com/api) if you do not plan to setup your own ton-http API.

2. Installing and running the ton-server
Upload ton-server to your server.

Go to the ton-server folder:
```sh
cd ton-server
```
Build and run docker:
```sh
docker build -t ton-server .
```
```sh
docker run -d -p 127.0.0.1:5881:80 ton-server
```

3. Install ton-http-api if you don't want to use https://toncenter.com/:
```sh
chmod +x /usr/local/bin/docker-compose
```
```sh
git clone https://github.com/toncenter/ton-http-api
```
```sh
cd ton-http-api/
```
```sh
mkdir private
```
```sh
curl -sL https://ton-blockchain.github.io/global.config.json > private/mainnet.json
```
```sh
./configure.py
```

4. Open .env and change the TON_API_HTTP_PORT port to any free port, for example 5885.

5. If you do not have docker-compose installed, you can do it with the command below:
```sh
curl -L "https://github.com/docker/compose/releases/download/v2.6.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

```sh
docker-compose build
```
```sh
docker-compose up -d
```

## Usage

1. Edit the file php/index.php by filling the following:
a) API KEY for https://toncenter.com/api/v2/jsonRPC or change the host to your own ton-http API;
b) uncomment the lines for required action and edit the proper values.

2. Upload the "php" folder to the web-accessible place on your server.

3. Run the script and get the rest.

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.
* If you have suggestions for adding or removing projects, feel free to [open an issue](https://github.com/ShaanCoding/ReadME-Generator/issues/new) to discuss it, or directly create a pull request after you edit the *README.md* file with necessary changes.
* Please make sure you check your spelling and grammar.
* Create individual PR for each suggestion.
* Please also read through the [Code Of Conduct](https://github.com/ShaanCoding/ReadME-Generator/blob/main/CODE_OF_CONDUCT.md) before posting your first idea as well.

### Creating A Pull Request

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See [LICENSE](https://github.com/ShaanCoding/ReadME-Generator/blob/main/LICENSE.md) for more information.

## Authors

* **Lana Cool** - *Developer* - [Lana Cool](https://github.com/lana4cool/) - *Telegram bots on PHP*


