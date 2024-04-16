import { Program, web3, AnchorProvider } from '@project-serum/anchor';

import { connection, commitmentLevel, filmTokenProgramId, filmTokenProgramInterface } from '../../constants/index';
import { PublicKey } from '@solana/web3.js';

export default async function revelApi(wallet, messageAccount) {
  const provider = new AnchorProvider(connection, wallet, {
    preflightCommitment: commitmentLevel,
  });
  if (!provider) return;

  //* create the program interface combining the idl, program Id, and provider */
  const programe = new Program(filmTokenProgramInterface, filmTokenProgramId, provider);
  const programeId = programe.programId;
  const walletAdress = wallet.publicKey.toBase58();

  try {
    const init = PublicKey.findProgramAddressSync(
      [Buffer.from('INITIALIZE'), Uint8Array.of(walletAdress)],
      programeId
    )[0];

    //* interact with the program via rpc */
    await programe.rpc.reveal({
      accounts: {
        init: '6yRhD15XRCERqE74JsPtvTyS5fn1YCqfRDeLq2UJsm1v',
        authority: '5a37CQPn8PmzynKWJWGvn9LMRXjCkDUFxdiBgJWnZ6Ck',
        systemProgram: web3.SystemProgram.programId,
      },
    });
    const message = await programe.account.nft.fetch(messageAccount.publicKey);
    console.log('Message Acount Data : ', message);
    return message;
  } catch (error){
    console.log("new error")
    throw error;
  } 
}
