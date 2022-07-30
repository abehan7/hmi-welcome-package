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
  const { decodedDiscordToken } = req;
  console.log(
    `${decodedDiscordToken.username}#${decodedDiscordToken.discriminator}`
  );
  console.log(`discord id || ${decodedDiscordToken.id}`);
  // TODO:
  // 이 아이디에 role을 주는거야 만약 HI-PLANET을 가지고 있다면
  // 그래서 예를들어 1000개 생산한 쿠폰중에서 사용안한 쿠폰을 그 아이디에 coupon number 옆에 넣어서 db에 저장하기
  // 그런 다음에 디코에서 슬래시 커맨드 하면 자기 쿠폰 보여주기
  // 사용여부 알려주는 거는 shopify에서 알아봐야 할 듯

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
