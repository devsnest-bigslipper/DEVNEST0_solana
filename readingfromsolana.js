
//solana library: webtrade.js 
const { clusterApiUrl, Connection, PublicKey } = require("@solana/web3.js");

const connection = new Connection(clusterApiUrl("devnet"));

async function getBalanceWeb3(address){
    return connection.getBalance(address);
}

//ISSUE01: pubkey start with G return 0 balance while it's not 0 on https://explorer.solana.com
//const publickey = new PublicKey("GontTwDeBduvbW85oHyC8A7GekuT8X1NkZHDDdUWWvsV");
//const publickey = new PublicKey("2UZMvVTBQR9yWxrEdzEQzXWE61bUjqQ5VpJAGqVb3B19");
//const publickey = new PublicKey("9cYxjaVKytk8gjQsQ4ZXy6ox62EB5VtVuxGd1zEzCKhH");
const publickey = new PublicKey("4JjkJr5sMk85nKCCBkBLCu7BioYBzyyKmEY2Njjt3MBv");


//fetching balance from solana blockchain.
//getBalanceWeb3 is the function defined above.
getBalanceWeb3(publickey).then((balance) => {
    console.log(balance);
});




//making the connection with the json rpc


