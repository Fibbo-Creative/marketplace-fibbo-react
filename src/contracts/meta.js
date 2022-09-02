import { createForwarderInstance } from "./forwarder";
import { signMetaTxRequest } from "./signer";

export const sendMetaTx = async (contract, provider, signer, txParams) => {
  const url = process.env.REACT_APP_WEBHOOK_URL;
  if (!url) throw new Error(`Missing relayer url`);

  const { functionName, args } = txParams;

  const forwarder = createForwarderInstance(provider);

  console.log(forwarder.address);
  const from = await signer.getAddress();

  const data = contract.interface.encodeFunctionData(functionName, args);
  const to = contract.address;
  const request = await signMetaTxRequest(signer.provider, forwarder, {
    to,
    from,
    data,
  });

  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(request),
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log(res);
  return res.data;
};
