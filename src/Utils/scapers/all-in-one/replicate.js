import "../../../../config.js";
import Replicate from "replicate";
import { getBuffer } from "../../../lib/func.js";

const replicate = new Replicate({ auth: 'r8_NHlUr8iD4j0Ah03RWAWtyAFVLweSG8T3gZD34' });

async function remini(url, upscale = 2) {
    try {
        const res = await replicate.run("cjwbw/real-esrgan:d0ee3d708c9b911f122a4ad90046c5d26a0293b99476d697f6bb7f2e251ce2d4", {
            input: {
                image: url,
                upscale
            }
        });

        const result = await getBuffer(res);

        return result
    } catch (err) {
        console.log(err)
    }
}


export {
    remini
}
