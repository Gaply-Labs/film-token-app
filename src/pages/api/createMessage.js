import { Program, web3, AnchorProvider } from '@project-serum/anchor';

import { commitmentLevel, connection, filmTokenProgramId, filmTokenProgramInterface } from '../../constants/index';

export default async function createMessage(inputedMessage, wallet, messageAccount) {
  const provider = new AnchorProvider(connection, wallet, { preflightCommitment: commitmentLevel });
  if (!provider) return;

  const program = new Program(filmTokenProgramInterface, filmTokenProgramId, provider);
  try {
    console.log(messageAccount);
    await program.rpc.createMessage(inputedMessage, {
      accounts: {
        message: messageAccount.publicKey,
        author: provider.wallet.publicKey,
        systemProgram: web3.SystemProgram.programId,
      },
      signers: [messageAccount],
    });
    console.log(program.account.message)
    const message = await program.account.message.fetch(messageAccount.publicKey);
    console.log('Message created', message);
    return message;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
