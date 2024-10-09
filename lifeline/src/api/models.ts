export interface Dae {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    adresse_num: string;
    adresse_voie: string;
    adresse_cp: string;
    adresse_commune: string;
    acces: string;
    acces_libre: boolean;
    photo: string;
    dispo_jour: string;
    dispo_heure: string;
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
