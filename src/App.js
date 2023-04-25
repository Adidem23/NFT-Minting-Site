import { ConnectWallet } from "@thirdweb-dev/react";
import { useState } from "react";
import "./styles/Home.css";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ThirdwebSDKProvider } from "@thirdweb-dev/react";
import { BigNumber } from "ethers";
import { ethers } from 'ethers';



export default function Home() {

  const [list, setlist] = useState([]);

  const getcontract = async () => {
    console.log("Clicked");
    const sdk = new ThirdwebSDK("Mumbai");
    const contract = await sdk.getContract("0x0C26c22F95752fE46EDDf0caa11e7Aa984238D1b", "marketplace");
    const listings = await contract.getActiveListings();
    setlist(listings);
    const priceOfFirstActiveListing = listings[0].price;
    console.log(listings[0].asset.name);
  }

  console.log(list);

  return (

    <>
      <ThirdwebSDKProvider
        activeChain={"Mumbai"}
        signer={new ethers.providers.Web3Provider(window.ethereum).getSigner()}
      >

        <div style={{ display: "block", margin: 'auto', width: "fit-content" }}>
          <ConnectWallet />
          <h2>Hello</h2>
          <button onClick={getcontract}>Show All NFTS</button>
          <hr />
          <div id="nftsdiv">
            {
              list && list.map((nft) => {
                return (
                  <>
                    <div style={{ display: "block", margin: 'auto', width: "fit-content", border: '3px solid red', marginTop: "30px" }}>

                      <img src={nft.asset.image} width="600px" height="250px" />
                      <h2>NFT Name: {nft.asset.name}</h2>
                      <h3>Price: {nft.buyoutCurrencyValuePerToken.displayValue} &nbsp; {nft.buyoutCurrencyValuePerToken.name}</h3>
                      <button onClick={async () => {
                        try {

                          const sdk = new ThirdwebSDK("Mumbai");
                          const contract = await sdk.getContract("0x0C26c22F95752fE46EDDf0caa11e7Aa984238D1b", "marketplace");

                          const quantityDesired = 1;

                          await contract.buyoutListing(BigNumber.from(nft.id, 1), quantityDesired);

                        } catch (err) {
                          alert("Error Has been Occured" + err);
                          console.log(err);
                        }

                      }}> BUY NOW </button>
                    </div>
                  </>
                )
              })
            }
          </div>
        </div>
      </ThirdwebSDKProvider>



    </>


  );
}
