export interface Product {
  _id: string;
  name: string;
  description?: string;
  composition?: string;
  dosage?: string;
  indications?: string[] | string;
  category?: string;
  imageUrl?: string;
}
