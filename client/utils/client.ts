import { createThirdwebClient } from "thirdweb";

/* eslint-disable @typescript-eslint/no-non-null-assertion */
export const client = createThirdwebClient({
	clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || undefined,
	secretKey: process.env.NEXT_PUBLIC_THIRDWEB_SECRET_KEY || "",
});
/* eslint-enable @typescript-eslint/no-non-null-assertion */
