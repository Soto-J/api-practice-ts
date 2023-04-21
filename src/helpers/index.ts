import crypto from "crypto";
// Authentication helpers

const SECRET = "JOHN-REST-API";

export const random = () => crypto.randomBytes(128).toString("base64");

export const authentication = (salt: string, password: string) => {
  return crypto
    .createHmac("sha256", `${salt}/${password}`)
    .update(SECRET)
    .digest("hex");
};
