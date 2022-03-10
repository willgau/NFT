const serverUrl = "https://dwl5lgygsifp.usemoralis.com:2053/server";
const appId = "JuzLURsWRZoFNQUTI39TqO6SBeZlsG1K81Ciic1Z";
Moralis.start({ serverUrl, appId });

const CONTRACT_ADDRESS = "0xc8260dfa98f945cdb27137e2fa80fe82b2a26755";


let web3;

async function init(){
    let currentUser = Moralis.User.current();
    if(!currentUser){
        window.location.pathname = "/index.html";      
    }

    await Moralis.enableWeb3();
    web3 = new Web3(Moralis.provider);
    let account = Moralis.account;
    
    console.log(account);

    const urlParams = new URLSearchParams(window.location.search);
    const nftId = urlParams.get("nftId");
  
    document.getElementById("token_id_input").value = nftId;
    document.getElementById("address_input").value = account;
}

async function mint(){
    let tokenId = parseInt(document.getElementById("token_id_input").value);
    let address = document.getElementById("address_input").value;
    let amount = parseInt(document.getElementById("amount_input").value);

    let account = Moralis.account;

    
    console.log(tokenId)
    console.log(address)
    console.log(amount)
    console.log(account)

    const contract = new web3.eth.Contract(contractAbi, CONTRACT_ADDRESS);

    contract.methods.mint(address, tokenId, amount).send({from: account, value:0})
    .on("receipt", function(receipt){
        alert("Mint done")
    })
}
document.getElementById("submit_mint").onclick = mint;
init();
