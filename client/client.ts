// src/client.ts
import { createThirdwebClient } from "thirdweb";

export const client = createThirdwebClient({
	clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
	secretKey: process.env.NEXT_PUBLIC_THIRDWEB_SECRET_KEY,
});
