module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "084198",
    DB: "seekdocs",
    dialect: "postgres",
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};