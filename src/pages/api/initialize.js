import { Program, web3, AnchorProvider } from '@project-serum/anchor';

import { connection, commitmentLevel, filmTokenProgramId, filmTokenProgramInterface } from '../../constants/index';

export default async function createInitApi(init, wallet, args) {
  const provider = new AnchorProvider(connection, wallet, {
    preflightCommitment: commitmentLevel,
  });
  if (!provider) return;

  //* create the program interface combining the idl, program Id, and provider */
  const programe = new Program(filmTokenProgramInterface, filmTokenProgramId, provider);
  const { start1, end1, start2, end2 } = args;
  try {
    //* interact with the program via rpc */
    await programe.rpc.initialize(start1, end1, start2, end2, {
      accounts: {
        init: init.publicKey,
        authority: provider.wallet.publicKey,
        systemProgram: web3.SystemProgram.programId,
      },
      signers: [init],
    });
    const message = await programe.account.init.all();
    return message;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
