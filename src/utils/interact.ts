import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import config from "../config";

export const web3 = createAlchemyWeb3(config.ALCHEMY_RPC_URL);
