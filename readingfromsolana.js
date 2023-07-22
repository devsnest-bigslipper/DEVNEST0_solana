
//clients -> JsonRpc -> Solana (accounts)

//solana library: webtrade.js 
const { 
	clusterApiUrl, 
	Connection, 
	PublicKey,
	LAMPORTS_PER_SOL,
} = require("@solana/web3.js");

const connection = new Connection(clusterApiUrl("devnet"));

async function getBalanceWeb3(address){
    return connection.getBalance(address);
}

//copy publickey from https://explorer.solana.com 
//How? click slot number for getting into the block page. click transaction signature from a block page and then go to transaction page then copy it...

//!vvvvvvvvvv!
//! ISSUE01: !
//!^^^^^^^^^^!
//some pubkeys return 0 balance while it's not 0 on https://explorer.solana.com
//(Solved: User need to select correct cluster name at upright corner "devnet" at website https://explorer.solana.com) 
//const publickey = new PublicKey("GontTwDeBduvbW85oHyC8A7GekuT8X1NkZHDDdUWWvsV");
//const publickey = new PublicKey("2UZMvVTBQR9yWxrEdzEQzXWE61bUjqQ5VpJAGqVb3B19");
//const publickey = new PublicKey("9cYxjaVKytk8gjQsQ4ZXy6ox62EB5VtVuxGd1zEzCKhH");
//const publickey = new PublicKey("2KgowxogBrGqRcgXQEmqFvC3PGtCu66qERNJevYW8Ajh");
const publickey = new PublicKey("5U3bH5b6XtG99aVWLqwVzYPVpQiFHytBD68Rz2eFPZd7");


//fetching balance from solana blockchain.
//getBalanceWeb3 is the function defined above.
getBalanceWeb3(publickey).then((balance) => {
//1 SOLs = 1000,000,000 Lamports
    console.log(balance/LAMPORTS_PER_SOL);
});





//making the connection with the json rpc


