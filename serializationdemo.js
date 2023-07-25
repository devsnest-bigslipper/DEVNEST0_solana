
//client side( structure{?} -> buffer -> program or smart contract
const web3=require("@solana/web3.js");
//what is borsh library?
const borsh=require("@project-serum/borsh");

const equipPlayerSchema=borch.struct([
    borsh.u8('variant'),
    borsh.u16('playerId'),
    borsh.u256('itemId')
]
//8+16+256=280bits for allocating to the buffer

const buffer = Buffer.alloc(1000);

//create buffer and put encoded data into that buffer
equipPlayerSchema.encode({variant:0,playerId:1223,itemId:38438748734},buffer)


//resize the memory space of the buffer
const instructionBuffer=buffer.slice(0,equipPlayerSchema.getSpan(buffer));

//make new transaction
const transaction=new web3.Transaction();
//make instruction buffer:
//this instruction contain account we are going to interact
//defining instructionBuffer as data? 
const instruction= new web3.TransactionInstruction({

    keys:[
      (
        pubkey: player.publicKey,
        isSigner: true,
        isWritable: false,
      ),
      (
        pubkey: playerInfoAccount,
        isSigner: true,
        isWritable: false,
      ),
      (
        pubkey: web3.SystemProgram.programId,
        isSigner: true,
        isWritable: false,
      )
    ],
    data: instructionBuffer
    programId: PROGRAM_ID
});

//add new instruction into the transaction
transaction.add(instruction);

web3sendAndConfirmTransaction(connection,transaction,[player]).then((txid) => {
    console.log("Transaction simulated : https://explorer.solana.com/tx/${txid}?cluster=devnet")
});
