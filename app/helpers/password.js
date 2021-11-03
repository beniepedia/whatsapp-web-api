const bcrypt = require('bcrypt');

const salt = 10;

async function hash(password) {
    if(!password) {
        const error = TypeError('Password tidak boleh kosong!');
        throw error;
    }
    return bcrypt.hash(password, salt)
}

async function match(plainPassword, hashPassword) {
    if( !plainPassword || !hashPassword ) {
        const error = TypeError('Password / hash tidak boleh kosong!');
        throw error;
    }

    return bcrypt.compare(plainPassword, hashPassword);
}

module.exports = { hash, match }