var config  ={
    production: {
        session:
        {
            key:'',
            secret:''
        },
        database:'mongodb://mor:a123654789@ds137283.mlab.com:37283/adollar'

    },
    default:{
        session:
        {
            key:'',
            secret:''
        },
        database:'mongodb://localhost/testdatabase'
    }
}
exports.get = function get(env){
    return config[env] || config.default;
}