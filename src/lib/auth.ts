
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.DB_URI as string);
const db = client.db("pizza-area");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "customer",
        input: true,
      },
      businessName: {
        type: "string",
        required: false,
        defaultValue: "",
        input: true,
      },
      isBlocked: {
        type: "boolean",
        required: false,
        defaultValue: false,
      },
      subscriptionPlan: {
        type: "string",
        required: false,
        defaultValue: "free",
      },
    },
  },

  emailAndPassword: {
    enabled: true,
  },

  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google"],
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  plugins: [
    jwt()
  ],

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24 * 7, 
    },
  },
});