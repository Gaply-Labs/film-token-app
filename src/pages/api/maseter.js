import { Program, web3, AnchorProvider } from '@project-serum/anchor';

import { connection, commitmentLevel, filmTokenProgramId, filmTokenProgramInterface } from '../../constants/index';

export default async function createMasterApi(state, wallet) {
  const provider = new AnchorProvider(connection, wallet, {
    preflightCommitment: commitmentLevel,
  });
  if (!provider) return;

  //* create the program interface combining the idl, program Id, and provider */
  const programe = new Program(filmTokenProgramInterface, filmTokenProgramId, provider);
  console.log(state);
  try {
    //* interact with the program via rpc */
    await programe.rpc.master({
      accounts: {
        state: state.publicKey,
        authority: provider.wallet.publicKey,
        systemProgram: web3.SystemProgram.programId,
      },
      signers: [state],
    });
    const message = await programe.account.state.all();
    return message;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
