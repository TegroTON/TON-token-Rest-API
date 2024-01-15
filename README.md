<br/>
<p align="center">
  <h3 align="center">TON Jetton — Rest API Open-Source</h3>
  <p align="center">
    An efficient and straightforward solution for interacting with the TON Blockchain
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
* [Expanded Usage Instructions](#expanded-usage-instructions)
* [Enhanced Contribution Guidelines](#enhanced-contribution-guidelines)
* [Licensing Details](#licensing-details)
* [Acknowledgements](#acknowledgements-the-authors)

## About The Project

This project emerged from the need for a reliable and efficient way to interface with the TON Network, managing balances, payments, and transactions of TON coins and TGR tokens. It provides a user-friendly PHP interface for setting up wallet creation, balance checking, payment sending, and viewing transaction statistics.

## Built With

The project comprises a docker container developed in .JS, which interfaces with the TON network's jsonRPC. The user interface is built using PHP for ease of use and accessibility.

## Getting Started

Ensure your docker version is up to date:
```sh
docker -v
```
Example output:
Docker version 23.0.6, build ef23cbc

## Prerequisites

Docker installed on the server.
Open the necessary port in iptables, e.g., 5885.

## Installation
1. Obtain an API Key from http://toncenter.com/api or set up your own ton-http API.

2. Set up the ton-server:

- Upload ton-server to your server.
- Navigate to the ton-server folder:

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
## Expanded Usage Instructions

1. **Editing the PHP Script:**
   - Locate the `php/index.php` file in your project directory.
   - Update the following configurations:
     a) Insert your API Key for the TON API service at https://toncenter.com/api/v2/jsonRPC. Alternatively, if you are using a custom ton-http API, modify the host details accordingly.
     b) Identify the section in the script where actions are defined. Uncomment the lines corresponding to the actions you want to perform (e.g., wallet creation, balance inquiry). Ensure you input the correct parameters in these lines for accurate functioning.

2. **Deploying the Script:**
   - Once the `php/index.php` file is configured, prepare to upload it to your server.
   - Transfer the entire "php" folder to a directory on your server that is accessible via the web. This ensures that the script can be executed through a web interface.

3. **Running the Script:**
   - After uploading, navigate to the location of the `index.php` file through your web browser.
   - Execute the script by accessing its URL. The script will interact with the TON Blockchain as per the configured actions and parameters.

## Enhanced Contribution Guidelines

Contributions are a vital part of the open-source community, fostering learning, inspiration, and creativity. Here's how you can contribute:

* **Suggesting Changes:**
  - If you have ideas for improvements or notice any issues, please feel free to [open an issue](https://github.com/ShaanCoding/ReadME-Generator/issues/new) on our GitHub repository. This could include adding new features or removing existing ones.
  - When suggesting changes, please be clear and concise in your descriptions to facilitate understanding and implementation.

* **Before Contributing:**
  - Ensure your contributions are well-considered and carefully planned.
  - Pay attention to spelling and grammar in your contributions to maintain the quality of documentation.
  - For each suggestion or improvement, create a separate pull request (PR). This helps in better tracking and managing changes.

* **Adhering to Conduct:**
  - Before you submit your first contribution, please read through our [Code Of Conduct](https://github.com/ShaanCoding/ReadME-Generator/blob/main/CODE_OF_CONDUCT.md). This ensures a respectful and collaborative environment for all contributors.

### Step-by-Step Guide for Pull Requests

1. **Forking the Project:**
   - Begin by forking the repository. This creates a copy of the project in your GitHub account, allowing you to make changes without affecting the original.

2. **Creating a Feature Branch:**
   - In your forked repository, create a new branch for your feature or fix. Use the command: `git checkout -b feature/AmazingFeature` (replace 'AmazingFeature' with a descriptive name for your feature).

3. **Committing Changes:**
   - Make your changes in the new branch and commit them with a clear and descriptive message, using: `git commit -m 'Add some AmazingFeature'`.

4. **Pushing to GitHub:**
   - Push the changes to your GitHub repository using: `git push origin feature/AmazingFeature`. 

5. **Opening a Pull Request:**

   - Once your feature is ready and pushed to GitHub, navigate to the original repository you forked.
   - Click on the 'Pull Request' button and then on 'New Pull Request'.
   - Select your 'feature/AmazingFeature' branch and provide a detailed description of the changes you've made.
   - Submit the pull request for review by the project maintainers.

## Licensing Details

This project is distributed under the MIT License, offering wide-reaching flexibility and freedom for use and modification.
See [LICENSE](https://github.com/ShaanCoding/ReadME-Generator/blob/main/LICENSE.md) for more information.

## Acknowledgements the Authors

   - Primary Developer: [Lana Cool](https://github.com/lana4cool/)
   - Expertise: Development of Telegram bots using PHP.
   - GitHub Profile: Lana Cool
   - Lana has been instrumental in developing and maintaining this project, ensuring it remains a robust and user-friendly tool for interacting with the TON Blockchain.
