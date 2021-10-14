module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  // url: env("", "https://45ac-125-26-225-221.ngrok.io"),
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "0d2ba81315b16fe2602ac5af025d0b23"),
    },
  },
});
