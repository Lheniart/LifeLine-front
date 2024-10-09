export interface Dae {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    adresseNum: string;
    adresseVoie: string;
    adresseCp: string;
    adresseCommune: string;
    acces: string;
    accesLibre: boolean;
    photo: string;
    dispoJour: string;
    dispoHeure: string;
    etat_fonctionnement: string;
}
export interface DaeWithDistance {
    daeEntity : Dae;
    distance: number | null;
}

export interface FindNearDaeDto {
    latitude: number;
    longitude: number;
    range: number;
    userLatitude: number | null;
    userLongitude: number | null;
}
