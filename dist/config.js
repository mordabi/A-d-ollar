var config = {
    production: {
        session: {
            key: '',
            secret: ''
        },
        database: 'mongodb://<user>:<pwd>'
    },
    default: {
        session: {
            key: '',
            secret: ''
        },
        database: 'mongodb://localhost/testdatabase'
    }
};
exports.get = function get(env) {
    return config[env] || config.default;
};
