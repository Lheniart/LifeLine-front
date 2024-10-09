import axios, {AxiosError} from "axios";
import type {DaeWithDistance, FindNearDaeDto} from "@/api/models";

const backend_link = "http://localhost:8080";


export async function findAllDaeNear(dto : FindNearDaeDto): Promise<DaeWithDistance[]> {
    const url = `${backend_link}/dae/near`;
    try {
        const response = await axios.post(url, dto)
        return response.data;
    } catch (err: any) {
        if (err.response.status === 400) {
            throw "Bad request"
        } else if (err.response.status === 403) {
            throw "Accès refusé !"
        }else if (err.response.status === 404) {
            throw "Aucun Dae n'a été trouvé"
        } else {
            throw "Une erreur est survenue, merci de contacter l'administrateur."
        }
    }
}