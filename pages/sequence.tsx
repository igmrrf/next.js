import { sequence } from "0xsequence";
import { Settings } from "0xsequence/dist/declarations/src/provider";
import { ethers } from "ethers";
import Head from "next/head";
import { useEffect } from "react";
import Layout from "../components/Layout";

const networks = {
  ethereum: "mainnet",
  polygon: "polygon",
  polygonSupernets: "polygon-supernets",
  arbitrumOne: "arbitrum",
  arbitrumNova: "arbitrum-nova",
  optimism: "optimism",
  bsc: "bsc",
  avalanche: "avalanche",
};

const Sequence = () => {
  const signMessage = async () => {
    const wallet = await sequence.getWallet();

    const provider = wallet.getProvider();
    const signer = wallet.getSigner();

    // Signing Messages
    const message = "I've been to web3 and back again :D";
    const signature = await signer.signMessage(message);
    console.log({ signature });

    // Validate the signed message. The sequence utils `isValidMessageSignature`
    // method supports validating both EOA and Smart Wallet (EIP1271) signature
    // with this simple call
    const isValid = await sequence.utils.isValidMessageSignature(
      await wallet.getAddress(),
      message,
      signature,
      provider
    );

    console.log(`isValid: ${isValid}`);
    if (!isValid) {
      throw new Error("signature is invalid");
    }
  };

  const getChainIds = async () => {
    const wallet = await sequence.getWallet();
    const provider = wallet.getProvider();
    const signer = wallet.getSigner();

    // Get Chain Id
    console.log({ chainId: await wallet.getChainId() });
    console.log({ chainId: await provider?.getChainId() });
    console.log({ chainId: await signer.getChainId() });
  };

  const transferERC20Token = async () => {
    // part of the ERC20 ABI, so we can encode a `transfer` call
    const erc20Interface = new ethers.utils.Interface([
      "function transfer(address _to, uint256 _value)",
    ]);

    // Get the wallet signer interface
    const wallet = sequence.getWallet();
    const signer = wallet.getSigner();

    // USDC contract address on Polygon network
    const usdcContractAddress = "0x2791bca1f2de4661ed88a30c99a7a9449aa84174";

    // Sending to a recipient address
    const recipientAddress = "0x8b4de256180cfec54c436a470af50f9ee2813dbb";

    // Sending 1.50 USDC, note USDC has 6 decimal places
    const amount = ethers.utils.parseUnits("1.50", 6);

    // Encode an ERC-20 token transfer to recipient of the specified
    // amount
    const data = erc20Interface.encodeFunctionData("transfer", [
      recipientAddress,
      amount,
    ]);

    // Prepare Transaction object
    const tx: sequence.transactions.Transaction = {
      to: usdcContractAddress,
      data,
    };

    // Send the transaction via the signer to thee blockchain :D The signer will
    // prompt the user
    // sign+send the transaction, and once the user confirms, it will be transmitted
    const txnResp = await signer.sendTransaction(tx);

    // Wait for the transaction to be mined by the network
    await txnResp.wait();

    // We're done, print the transaction hash, and open it up in your block explorer
    console.log(`transaction hash: ${txnResp.hash}`);
  };

  const initialize = async () => {
    // Initialize
    const wallet = await sequence.initWallet(networks.ethereum);
    // Get existing initialized instance
    const getWallet = await sequence.getWallet();

    // Connect
    const connectDetails = await wallet.connect();

    // Get details
    const walletAddress = await getWallet.getAddress();
    // wallet.openWallet();
    // getWallet.openWallet();
    console.log(`Wallet Address: ${walletAddress}`);
    console.log(`=> connected? ${connectDetails.connected}`);
    console.log(`=> connected? ${connectDetails.chainId}`);
    console.log(`=> connected? ${connectDetails.email}`);
    console.log(`=> connected? ${connectDetails.session?.accountAddress}`);
    console.log(`=> connected? ${connectDetails.session?.networks?.[1].name}`);
    console.log(`=> connected? ${connectDetails.proof}`);
    console.log(`=> connected? ${connectDetails.error}`);
  };

  useEffect(() => {
    const initializeConnection = async () => {
      const wallet = sequence.initWallet(networks.ethereum);
      const settings: Settings = {
        theme: "light",
        bannerUrl:
          "https://image.binance.vision/editor-uploads/ed984d95b1d846ff894f8f275788aeca.png",
        includedPaymentProviders: ["moonpay", "ramp"],
        signInOptions: ["google"],
        defaultFundingCurrency: "eth",
        lockFundingCurrencyToDefault: false,
      };

      const connectDetails = await (
        await wallet
      ).connect({
        app: "The Lazy",
        authorize: true,
        settings,
      });

      (await wallet).openWallet();

      console.log(`user accepted connect: ${connectDetails.connected}`);
      console.log(`users signed connect proof : ${connectDetails.connected}`);
    };

    initializeConnection();
  }, []);

  return (
    <Layout>
      <Head>
        <title>Web3 JS</title>
      </Head>
      <h1>Sequence</h1>
    </Layout>
  );
};

export default Sequence;
