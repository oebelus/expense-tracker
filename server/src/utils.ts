import { User } from "./models/userModel"
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import axios from 'axios'
import qs from 'qs'

dotenv.config()

export const generateToken = (user: User) => {
    return jwt.sign(
        {
            _id: user._id,
            firstName: user.firstName,
            familyName: user.familyName,
            email: user.email
        },
        process.env.SESSION_SECRET || 'sdSDFSF546516àééééèè-+',
        {
            expiresIn: '30d'
        }
    )
}

interface GoogleTokensResult {
    access_token: string;
    expires_in: Number;
    refresh_token: string;
    scope: string;
    id_token: string;
  }

export async function getGoogleOAuthTokens({code}: {code: string}): Promise<GoogleTokensResult> {
    const url = 'https://oauth2.googleapis.com/token'

    const values = {
        code,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: 'http://localhost:4000/users/api/sessions/oauth/google',
        grant_type: 'authorization_code'
    }

    try {
        const res = await axios.post<GoogleTokensResult>(url, qs.stringify(values), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        return res.data
    } catch (error: any) {
        console.error(error.response.data.error)
        throw new Error(error.message)
    }
}

interface GoogleUserResult {
    id: string;
    email: string;
    verified_email: boolean;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    locale: string;
}

interface getGoogleUserProps {
    id_token: string;
    access_token: string;
}

export async function getGoogleUser({id_token, access_token}: getGoogleUserProps): Promise<GoogleUserResult> {
    try {
        const res = await axios.get<GoogleUserResult>(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
            {
                headers: {
                Authorization: `Bearer ${id_token}`,
                },
            }
        )
        return res.data;
    } catch (error: any) {
        console.error(error)
        throw new Error(error.message);
    }
}