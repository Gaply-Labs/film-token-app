import idl from '../pages/api/idl/film_token.json';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';

//* Constants for RPC Connection the Solana Blockchain */

export const commitmentLevel = 'processed';

export const endPoint = process.env.NEXT_PUBLIC_RPC_URL || clusterApiUrl('devnet');

export const connection = new Connection(endPoint, commitmentLevel);

//* Constants for the Deployed "Film Token" Program */

export const filmTokenProgramId = new PublicKey(process.env.NEXT_PUBLIC_SOLONA_ID);
export const filmTokenProgramInterface = JSON.parse(JSON.stringify(idl));
