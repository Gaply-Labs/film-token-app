import { Program, web3, AnchorProvider } from '@project-serum/anchor';
import * as anchor from '@project-serum/anchor';
import { connection, commitmentLevel, filmTokenProgramId, filmTokenProgramInterface } from '../../constants/index';
import { Keypair } from '@solana/web3.js';

export default async function mintApi(state, wallet, messageAccount) {
  const provider = new AnchorProvider(connection, wallet, {
    preflightCommitment: commitmentLevel,
  });
  if (!provider) return;

  //* create the program interface combining the idl, program Id, and provider */
  const programe = new Program(filmTokenProgramInterface, filmTokenProgramId, provider);

  try {
    //* interact with the program via rpc */
    const mint = Keypair.generate();
    const auth = provider.wallet.publicKey;
    const destination = await anchor.utils.token.associatedAddress({ mint: mint.publicKey, owner: auth });

    await programe.rpc.mint({
      accounts: {
        state,
        nft: messageAccount.publicKey,
        imint: mint.publicKey,
        tokenAccount: destination,
        authority: auth,
        systemProgram: web3.SystemProgram.programId,
        rent: web3.SYSVAR_RENT_PUBKEY,
        tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
        associatedTokenProgram: anchor.utils.token.ASSOCIATED_PROGRAM_ID,
      },
      signers: [messageAccount, mint],
    });
    const message = await programe.account.nft.fetch(messageAccount.publicKey);
    console.log('Message Acount Data : ', message);
    return message;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
