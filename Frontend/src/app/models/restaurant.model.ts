export interface Menu {
  id?: string;
  nom: string;
  description: string;
  prix: number;
}
export interface Restaurant {
  id?: string;
  nom: string;
  description?: string;
  adresse?: string;
  typeCuisine?: string;
  deleted?: boolean;
  telephone?: string;
  menu?: Menu[];
  image?: String;
}

