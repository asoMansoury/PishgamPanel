import { getToken } from "next-auth/jwt";
import ChangeUserVpnPassword from "src/databse/user/repository/ChangeUserVpnPassword";



export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {

        // Allow CORS preflight request
        res.status(200).end();

        return;
    }
    if (req.method === 'POST') {
        const token = await getToken({ req });
        if (token == null) {
            res.status(200).json({ errorMsg: "شما دسترسی  به عملیات مورد نظر را ندارید.", isValid: false });
            return;
        }
        const { password, username } = req.body;
        var result = await ChangeUserVpnPassword(password, username);


        res.status(200).json({ result });
    } else {
        console.log("method not allow")
        res.status(405).json({ name: 'Method Not Allowed' });
    }
}



