import { Request, Response } from "express";
import { BASE_PATH } from "../constants/common";
import { ethers } from "ethers";
import { web3 } from "../utils/interact";

export const getView = (req: Request, res: Response) => {
  const path = `${BASE_PATH}/public/views/verify.html`;
  res.sendFile(path);
};

export const verifyWallet = async (req: Request, res: Response) => {
  const { account, signiture, message } = req.body;
  if (!account || !signiture || !message)
    res
      .status(400)
      .send({ status: false, message: "❌ Missing parameters", data: null });
  const decodedWallet = await web3.eth.accounts.recover(message, signiture);
  if (decodedWallet !== account)
    res
      .status(400)
      .send({ status: false, message: "❌ different accounts", data: null });
  const isAddress = await ethers.utils.isAddress(decodedWallet);
  if (!isAddress)
    throw res
      .status(500)
      .send({ status: false, message: "❌ Invalid wallet", data: null });

  res.status(200).send({
    status: true,
    message: "wallet verified ✅",
    data: {
      wallet: decodedWallet,
    },
  });

  console.log(decodedWallet);
};
