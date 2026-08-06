import { Inngest } from "inngest";
import UserModel from "../models/user.model.js";
import ConnectionModel from "../models/connection.model.js";
import sendEmail from "../configs/nodemailer.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "konnekta-social" });

//! Inngest Function to save user-data to the DB
const syncUserCreation = inngest.createFunction(
  {
    id: "sync-user-from-clerk",
    triggers: [{ event: "clerk/user.created" }],
  },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;

    let username = email_addresses[0].email_address.split("@")[0];

    // Check for username availability
    const user = await UserModel.findOne({ username });

    if (user) {
      username += Math.floor(Math.random() * 10000);
    }

    await UserModel.create({
      _id: id,
      email: email_addresses[0].email_address,
      //full_name: `${first_name} ${last_name}`,
      // REFACTORED: Avoid extra spaces if first_name or last_name is missing
      full_name: [first_name, last_name].filter(Boolean).join(" "),
      profile_picture: image_url,
      username,
    });
  },
);

//! Inngest Fucntion to update user data in DB
const syncUserUpdation = inngest.createFunction(
  {
    id: "update-user-from-clerk",
    triggers: [{ event: "clerk/user.updated" }],
  },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;

    const updateUserData = {
      email: email_addresses[0].email_address,
      // full_name: `${first_name} ${last_name}`,
      // REFACTORED: Avoid extra spaces in full_name if first_name or last_name is missing
      full_name: [first_name, last_name].filter(Boolean).join(" "),
      profile_picture: image_url,
    };

    await UserModel.findByIdAndUpdate(id, updateUserData);
  },
);

//! Inngest Function to delete user data from DB
const syncUserDeletion = inngest.createFunction(
  {
    id: "delete-user-from-clerk",
    triggers: [{ event: "clerk/user.deleted" }],
  },
  async ({ event }) => {
    const { id } = event.data;

    await UserModel.findByIdAndDelete(id);
  },
);

//! Inngest function() to send Reminder when a new connection request is added
const sendNewConnectionRequestReminder = inngest.createFunction(
  {
    id: "send-new-connection-request-reminder",
    triggers: [{ event: "app/connection-request" }],
  },
  async ({ event, step }) => {
    const { connectionId } = event.data;
    await step.run("send-connection-request-email", async () => {
      const connection = await ConnectionModel.findById(connectionId).populate(
        "from_user_id to_user_id",
      );

      // REFACTORED: Connection may no longer exist
      if (!connection) {
        return { message: "Connection no longer exists." };
      }

      // REFACTORED: Check if users still exist
      if (!connection.from_user_id || !connection.to_user_id) {
        return { message: "User no longer exists." };
      }

      const subject = `👋🏻 New Connection Request!`;
      const body = `<div style="font-family:Arial, sans-serif; padding:20px;">
      <h2>Hi ${connection.to_user_id.full_name},</h2>
      <p>You have a new connection request from ${connection.from_user_id.full_name} - @${connection.from_user_id.username}</p>
      <p> Click <a href="${process.env.FRONTEND_URL}/connections" style="color:#10b981;">here</a> to accept or reject the request</p>
      <br/>
      <p>Thanks, <br/>Konnekta - Stay "Konnekted"</p>
      </div>
      `;

      await sendEmail({ to: connection.to_user_id.email, subject, body });
    });

    //! Send Email-Reminder again after 24 hrs
    const in24Hrs = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await step.sleepUntil("wait-for-24-hours", in24Hrs);
    await step.run("send-connection-request-reminder", async () => {
      const connection = await ConnectionModel.findById(connectionId).populate(
        "from_user_id to_user_id",
      );

      // REFACTORED: Connection may no longer exist
      if (!connection) {
        return { message: "Connection no longer exists." };
      }

      // REFACTORED: Check if users still exist
      if (!connection.from_user_id || !connection.to_user_id) {
        return { message: "User no longer exists." };
      }

      if (connection.status === "accepted") {
        return { message: "Already accepted!" };
      }
      const subject = `👋🏻 REMINDER - New Connection Request 🔔`;
      const body = `<div style="font-family:Arial, sans-serif; padding:20px;">
      <h2>Hi ${connection.to_user_id.full_name},</h2>
      <p>You have a new connection request from ${connection.from_user_id.full_name} - @${connection.from_user_id.username}</p>
      <p> Click <a href="${process.env.FRONTEND_URL}/connections" style="color:#10b981;">here</a> to accept or reject the request</p>
      <br/>
      <p>Thanks, <br/>Konnekta - Stay "Konnekted"</p>
      </div>
      `;

      await sendEmail({ to: connection.to_user_id.email, subject, body });

      return { message: "Reminder sent." };
    });
  },
);

export const functions = [
  syncUserCreation,
  syncUserUpdation,
  syncUserDeletion,
  sendNewConnectionRequestReminder,
];
