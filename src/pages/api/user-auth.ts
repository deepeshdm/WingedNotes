
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
import { NextApiRequest, NextApiResponse } from 'next'
import { isPasswordCorrect } from '../../db_utils';

const SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET;
const CookieDuration = 60 * 60 * 24 * 365; // Expiration duration of cookie on browser (1 year)


async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method not allowed' })
        return;
    }

    const { username, password, stayLoggedIn } = req.body;

    // Generate hash value for password
    const HashPassword = crypto.createHash('sha256').update(password).digest('hex');
    // Verify if user account exists & match password
    const userValid = await isPasswordCorrect(username, HashPassword)

    if (userValid) {

        if (stayLoggedIn === true) {
            // Generate JWT and save as cookie on Requesting Browser
            const payload = { loggedUser: username, createdOn: new Date().toISOString() }
            const token = jwt.sign(payload, SECRET_KEY)
            const TokenCookie = "JWTAuthToken"
            const expiresIn = CookieDuration
            console.log("Setting Long-term Cookie on Browser...")
            res.setHeader('Set-Cookie', `${TokenCookie}=${token}; Max-Age=${expiresIn}; Path=/;`);
        } else {
            // Generate JWT and save as cookie on Requesting Browser
            const payload = { loggedUser: username, createdOn: new Date().toISOString() }
            const token = jwt.sign(payload, SECRET_KEY)
            const TokenCookie = "JWTAuthToken"
            console.log("Setting Session-Only Cookie on Browser...")
            res.setHeader('Set-Cookie', `${TokenCookie}=${token}; Expires=0; Path=/;`);
        }
        res.status(200).json({ accountVerified: true });
    } else {
        res.status(200).json({ accountVerified: false });
    }

}

export default handler;
