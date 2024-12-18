const {ethers} = require("ethers");

const poolABI = [
    "event Swap(address indexed sender,address indexed recipient,int256 amount0,int256 amount1,uint160 sqrtPriceX96,uint128 liquidity,int24 tick)"
];

const poolAddress = "0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640"; 
const provider = new ethers.WebSocketProvider("wss://eth-mainnet.g.alchemy.com/v2/d02qnkslydvXc4c7QA4wruO66UFF7R-F");
const wethUsdcContract = new ethers.Contract(poolAddress, poolABI, provider);

const usdcAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";       //token0
const wethAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";       //token1
const erc20ABI = [
    "function decimals() view returns (uint8)"
];
const usdcContract = new ethers.Contract(usdcAddress, erc20ABI, provider);
const wethContract = new ethers.Contract(wethAddress, erc20ABI, provider);

class Swap{
    constructor(sender, receiver, baseTokenAmount, quoteTokenAmount, txType, price){
        this.sender = sender;
        this.receiver = receiver;
        this.baseTokenAmount = baseTokenAmount;
        this.quoteTokenAmount = quoteTokenAmount;
        this.txType = txType;
        this.prie = price;
    }
}

wethUsdcContract.on(poolABI[0], async (sender,recipient,amount0,amount1,sqrtPriceX96,liquidity,tick) => {
    const price = (Number(sqrtPriceX96) ** 2)/ 2 ** 192;

    const usdcDecimals = await usdcContract.decimals();     //token0
    const wethDecimals = await wethContract.decimals();     //token1

    let txType;
    let baseTokenAmount;
    let quoteTokenAmount;
    
    if(amount1 < 0) {       //eth is bought 
        txType = "buy";
        baseTokenAmount = ethers.formatUnits(amount0, usdcDecimals);
        quoteTokenAmount = ethers.formatUnits(amount1, wethDecimals);
    } else {                //eth is sold
        txType = "sell";
        baseTokenAmount = ethers.formatUnits(amount1, wethDecimals);
        quoteTokenAmount = ethers.formatUnits(amount0, usdcDecimals);
    }

    const newSwap = new Swap(sender.toString(), recipient.toString(), baseTokenAmount, quoteTokenAmount, txType, price);
    console.log("New Swap: ", newSwap);

    // console.log(":::::::::::::::::::::Swap detected:::::::::::::::::::::");
    // console.log("Sender: ", sender);
    // console.log("Reciever: ", recipient);
    // console.log("Amount0: ", ethers.formatUnits(amount0, usdcDecimals));
    // console.log("Amount1: ", ethers.formatUnits(amount1, wethDecimals));
    // console.log("SqrtPriceX96: ", sqrtPriceX96.toString());
    // console.log("Liqudiity: ", liquidity.toString());
    // console.log("Tick: ", tick.toString());
});