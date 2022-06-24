

yarn init -y
yarn add --dev hardhat
npx hardhat
yarn add -D @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai
yarn add --save-dev ts_node typescript
yarn add --save-dev chai @types/node @types/mocha @types/chai
echo "import \"nomiclabs/hardhat-waffle\"\nimport \"@nomiclabs/hardhat-ethers\n" > hardhat.config.ts
cat hardhat.config.js >> hardhat.config.ts
rm hardhat.config.js

