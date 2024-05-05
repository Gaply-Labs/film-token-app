import { Program, web3, AnchorProvider } from '@project-serum/anchor';

import { connection, commitmentLevel, filmTokenProgramId, filmTokenProgramInterface } from '../../constants/index';

export default async function NftReveelData(id, wallet, metadata) {
  const provider = new AnchorProvider(connection, wallet, {
    preflightCommitment: commitmentLevel,
  });
  if (!provider) return;

  //* create the program interface combining the idl, program Id, and provider */
  const programe = new Program(filmTokenProgramInterface, filmTokenProgramId, provider);

  try {
    //* interact with the program via rpc */
    await programe.rpc.revealNft(JSON.stringify(metadata), {
      accounts: {
        nft: id,
        authority: provider.wallet.publicKey,
        systemProgram: web3.SystemProgram.programId,
      },
    });
    const message = await programe.account.nft.all();
    return message;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
