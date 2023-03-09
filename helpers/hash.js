const  {createHash} = require('crypto')
require('dotenv').config()

const createHashWithSault = (data) => {
    return createHash("sha256")
        .update(data)
        .update(createHash("sha256").update(process.env.CRYPTO_HASH_SECRATE).digest("hex"))
        .digest("hex")
}


module.exports = {createHashWithSault}