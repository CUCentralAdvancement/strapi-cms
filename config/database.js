const url = require("url");

module.exports = ({ env }) => {
  let settings = {
    client: "postgres",
    host: env("DATABASE_HOST", "127.0.0.1"),
    port: env.int("DATABASE_PORT", 5432),
    database: env("DATABASE_NAME", "strapi"),
    username: env("DATABASE_USERNAME", "strapi"),
    password: env("DATABASE_PASSWORD", "strapi"),
    ssl: env.bool("DATABASE_SSL", false),
  };

  if (process.env.DATABASE_URL) {
    const parsed = url.parse(process.env.DATABASE_URL, true);
    const [username, password] = parsed.auth.split(":");

    settings.host = parsed.hostname;
    settings.port = Number(parsed.port);
    settings.database = parsed.pathname.substr(1);
    settings.username = username;
    settings.password = password;
    settings.ssl = true;
  }

  return {
    defaultConnection: "default",
    connections: {
      default: {
        connector: "bookshelf",
        settings: settings,
        options: {},
      },
    },
  };
};
