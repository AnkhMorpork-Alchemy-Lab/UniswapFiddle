const { expect } = require("chai")
const { ethers } = require("hardhat")

const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F"
const WETH9 = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"

describe("Swaps", () => {
  let swapExamples
  let accounts
  let weth
  let dai
  let usdc

  before(async () => {
    accounts = await ethers.getSigners(1)

    const Swaps = await ethers.getContractFactory("Swaps")
    swaps = await Swaps.deploy()
    await swaps.deployed()

    weth = await ethers.getContractAt("IWETH", WETH9)
    dai = await ethers.getContractAt("IERC20", DAI)
    usdc = await ethers.getContractAt("IERC20", USDC)
  })

  it("swapExactInputSingle", async () => {
    const amountIn = 10n ** 18n

    // Deposit WETH
    await weth.connect(accounts[0]).deposit({ value: amountIn })
    await weth.connect(accounts[0]).approve(swaps.address, amountIn)

    // Swap
    await swaps.connect(accounts[0]).swapExactInputSingle(amountIn)

    console.log("DAI balance", await dai.balanceOf(accounts[0].address))
  })

  it("swapExactOutputSingle", async () => {
    const wethAmountInMax = 10n ** 18n
    const daiAmountOut = 100n * 10n ** 18n

    // Deposit WETH
    await weth.connect(accounts[0]).deposit({ value: wethAmountInMax })
    await weth.connect(accounts[0]).approve(swaps.address, wethAmountInMax)

    // Swap
    await swaps.connect(accounts[0]).swapExactOutputSingle(daiAmountOut, wethAmountInMax)

    console.log("DAI balance", await dai.balanceOf(accounts[0].address))
  })

  it("swapExactInputMultihop", async () => {
    const amountIn = 10n ** 18n

    // Deposit WETH
    await weth.connect(accounts[0]).deposit({ value: amountIn })
    await weth.connect(accounts[0]).approve(swaps.address, amountIn)

    // Swap
    await swaps.connect(accounts[0]).swapExactInputMultihop(amountIn)

    console.log("DAI balance", await dai.balanceOf(accounts[0].address))
  })

  it("swapExactOutputMultihop", async () => {
    const wethAmountInMax = 10n ** 18n
    const daiAmountOut = 100n * 10n ** 18n

    // Deposit WETH
    await weth.connect(accounts[0]).deposit({ value: wethAmountInMax })
    await weth.connect(accounts[0]).approve(swaps.address, wethAmountInMax)

    // Swap
    await swaps.connect(accounts[0]).swapExactOutputMultihop(daiAmountOut, wethAmountInMax)

    console.log("DAI balance", await dai.balanceOf(accounts[0].address))
  })
})