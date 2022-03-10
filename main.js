
const serverUrl = "https://dwl5lgygsifp.usemoralis.com:2053/server";
const appId = "JuzLURsWRZoFNQUTI39TqO6SBeZlsG1K81Ciic1Z";
Moralis.start({ serverUrl, appId });

const CONTRACT_ADDRESS = "0xc8260dfa98f945cdb27137e2fa80fe82b2a26755";
function fetchNFTMetadata(NFTs){
    let promises = [];

    for (let i = 0; i < NFTs.length; i++){
        let nft = NFTs[i];
        let id = nft.token_id;
        console.log(id)
        //Call Moralis Cloud function -> static JSON file
        promises.push(fetch("https://dwl5lgygsifp.usemoralis.com:2053/server/functions/getNFT?_ApplicationId=JuzLURsWRZoFNQUTI39TqO6SBeZlsG1K81Ciic1Z&nftid="+id)
        .then(res => res.json())
        .then(res => JSON.parse(res.result))
        .then(res => {nft.metadata = res})
        
        .then(res => {
          const options = {address: CONTRACT_ADDRESS, token_id: id, chain:"rinkeby"};
          //return Moralis.Web3API.token.getTokenIdOwners(options)
          return Moralis.Web3API.token.getAllTokenIds(options)
        })
        .then ( (res) => {
          nft.owners = [];
          res.result.forEach(element => {
              nft.owners.push(element.owner_of);
          });
          return nft;
        }))
        //.then( () => {return nft;}))
        //.then(res => console.log(res))
    }
    return Promise.all(promises);
}

function renderIventory(NFTs){

    const parent = document.getElementById("app");
    
    for (let i = 0; i < NFTs.length; i++){
        const nft = NFTs[i];
        console.log(nft);
        let htmlString = `
        <div class="card">
            <img class="card-img-top" src="${nft.metadata.Image}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${nft.metadata.Name}</h5>
                <p class="card-text">${nft.metadata.Description}</p>
                <p class="card-text">Number of Owners: ${nft.owners.length}</p>
                <a href="/mint.html?nftId=${nft.token_id}" class="btn btn-primary">Mint</a>
            </div>
        </div>
        `;
        let col = document.createElement("div");
        col.className = "col col-md-4";
        col.innerHTML = htmlString;
        parent.appendChild(col);
    }

}
async function initializeApp(){
    let currentUser = Moralis.User.current();
    if(!currentUser){
        current = await Moralis.Web3.authenticate();        
    }
   
    const options = {address: CONTRACT_ADDRESS , chain: "rinkeby"}; 
   
    let NFTs = await Moralis.Web3API.token.getAllTokenIds(options);
    console.log(NFTs);
    let NFTWithMetadata = await fetchNFTMetadata(NFTs.result);
    renderIventory(NFTWithMetadata);
    console.log(NFTWithMetadata);
}

initializeApp();