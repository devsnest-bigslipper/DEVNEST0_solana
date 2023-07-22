

  //client ->tx->json rpc -> solana blockchain(PingProgram -> DataAccount)

const web3 = require("@solana/web3.js");
const fs = require("fs");
const PROGRAM_ADDRESS = "ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa";
const PROGRAM_DATA_ADDRESS = "Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod";

async function main() {
    const payer = initializeKeypair();
    const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
    await pingProgram(connection,payer);
}

function initializeKeypair(){
    const secret = JSON.parse(fs.readFileSync("secretkey.json") || "[]");
    //const secretKey = new Uint8Array(secret);
    const secretKey = Uint8Array.from(secret);
    //const ownerKeypair = Keypair.fromSecretKey(secretKey);
    const keypairFromSecretKey = web3.Keypair.fromSecretKey(secretKey);
    return keypairFromSecretKey;
}

async function pingProgram(connection,payer) {
    const transaction = new web3.Transaction();

    const programId = new web3.PublicKey(PROGRAM_ADDRESS);
    const programDataPubkey = new web3.PublicKey(PROGRAM_DATA_ADDRESS);

    const instruction = new web3.TransactionInstruction({
      keys: [
        {
          pubkey : programDataPubkey,
          isSigner : false,
          isWritable : true,
        },
      ],
        programId,
    });

    transaction.add(instruction);

	//!vvvvvvvvvv!
	//! ISSUE04: !
	//!^^^^^^^^^^!
	//SendTransactionError: failed to send transaction: Transaction simulation failed: Attempt to debit an account but found no record of a prior credit.
    
    const signature = await web3.sendAndConfirmTransaction(
      connection,
      transaction,
      [payer]
    );

    console.log(signature); //print hash to screen

}

main().catch(console.error);
