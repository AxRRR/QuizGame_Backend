const jwt = require('jsonwebtoken');

const GenerateJWT = ( id, name ) => {

    return new Promise( (resolve, reject) => {

        const payload = { id, name };

        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '4h'
        }, (err, token ) => {

            if ( err ){
                console.log(err);
                reject('Error: jwt dont generated');
            }

            resolve( token );

        })


    })
}

module.exports = {
    GenerateJWT
}