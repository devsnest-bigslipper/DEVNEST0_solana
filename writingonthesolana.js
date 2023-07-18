const {
	clusterApiUrl,
	Connection,
	PublicKey,
	LAMPORTS_PER_SOL,
	Keypair,
	Transaction,
	SystemProgram,
	sendAndConfirmTransaction,	
} = require("@solana/web3.js");

//call library? file system for helping us reading something from other files
const fs = require("fs");

async function main() {
	//why not use the prompt below after correction? 
	//const { isUint8Array } = require("util/types");
	const connection = new Connection(clusterApiUrl("devnet"));
	//prompt: solana-keygen new -o secretkey.json
	//Q:decryt? encrpt? secert key from the json file
	const secret=JSON.parse(fs.readFileSync("secretkey.json") || "[]");
	//Why? Looks like this class was not obtained from util/types
	const secretKey= new Uint8Array(secret);
	//get keypair 
	const ownerKeypair=Keypair.fromSecretKey(secretKey);
	
	//convert byte array key into 58 characters
	//(that is A-Z a-z and 1-9) and then
	//print the keypair on screen
	await console.log(ownerKeypair.publicKey.toBase58());
	
	
	const publickey=ownerKeypair.publicKey;
	const recipientAddress="2KgowxogBrGqRcgXQEmqFvC3PGtCu66qERNJevYW8Ajh";
	//const recipientAddress="";
	const recipient=new PublicKey(recipientAddress);
	const lamportsval=LAMPORTS_PER_SOL*0.1;
	const transaction = new Transaction();

	console.log(typeof(lamportsval)); //number
	console.log(publickey.toBase58());
	console.log(recipient.toBase58());

	const sendSolInstruction = SystemProgram.transfer({
		fromPubkey : publickey,
		toPubkey : recipient,
		lamports : lamportsval,	
	});

	transaction.add(sendSolInstruction);

	console.log("connection"); 
	console.log(typeof(connection)); //object
	console.log(connection); 
	console.log("transaction"); 
	console.log(typeof(transaction)); //object
	console.log(transaction); 
	console.log("ownerKeypair"); 
	console.log(typeof(ownerKeypair)); //object 
	console.log(ownerKeypair); 


	const signature= await sendAndConfirmTransaction(connection,transaction,[
		ownerKeypair,
	]);

	console.log(signature);
}

main();

//!vvvvvvvvvv!
//! ISSUE03: !
//!^^^^^^^^^^!
//Cannot air drop 1 SOL to my wallet for testing...
//I use the commands below:
//prompt:solana balance 5Mc3UvAwAZTfDH34rmt1sW9B78hiyQH8AyAajQSQTwvB 
//prompt:solana airdrop 1 5Mc3UvAwAZTfDH34rmt1sW9B78hiyQH8AyAajQSQTwvB
//prompt:solana balance 5Mc3UvAwAZTfDH34rmt1sW9B78hiyQH8AyAajQSQTwvB
