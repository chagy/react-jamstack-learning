module.exports = ({ env }) => ({
  email: {
    provider: "sendgrid",
    providerOptions: {
      apiKey: env("SENDGRID_API_KEY"),
    },
    settings: {
      defaultFrom: "chagyza@gmail.com",
      defaultTo: "chagyza@gmail.com",
    },
  },
});
