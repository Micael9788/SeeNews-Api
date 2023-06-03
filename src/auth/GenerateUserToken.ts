import jwt from "jsonwebtoken";

export type UserDataToken = {
  id: object;
  expiresIn: string | number;
};

export const verifyUserToken = (token: string) => {
  if (!process.env.KEY_TOKEN_PUBLIC) {
    throw new Error("KEY_TOKEN_PRIVATE must be set in environment");
  }

  return jwt.verify(token, process.env.KEY_TOKEN_PUBLIC);
};

export const generateUserToken = (data: UserDataToken): string | undefined => {
  if (!process.env.KEY_TOKEN_PRIVATE) {
    throw new Error("KEY_TOKEN_PRIVATE must be set in environment");
  }

  const tokenJwt = jwt.sign(
    {
      id: data.id,
    },
    process.env.KEY_TOKEN_PRIVATE,
    {
      algorithm: "RS256",
      expiresIn: data.expiresIn,
    }
  );

  return tokenJwt;
};
