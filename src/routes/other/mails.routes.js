import { Router } from "express";
import transport from "../../configs/transport.config.js";
import dotenv from "dotenv";

dotenv.config();

const router = Router();

router.get("/mail", async (req, res) => {
    try {
        await transport.sendMail({
            from: "Atlas Tech <j4v1113r@gmail.com>",
            to: "j4v1113r@gmail.com",
            subject: "Prueba",
            html: "<h1>HOLA LOQUITA</h1>",
            //Envio de img
            /* attachments: [{
                filename: "buzz.jpg",
                path:"./src/public/assets/img/buzz.jpg",
                cid: "logo1"
            }] */
        })

        res.status(200).send("Todo ok")
    } catch (err) {
        res.status(500).send("Todo no ok")
    }
})

export default router;
