function config() {
    if (!process.env.course_jwtPrivateKey) {
        throw new Error('FATAL ERROR: jwt private key is not defined.');
    }
}
module.exports = config