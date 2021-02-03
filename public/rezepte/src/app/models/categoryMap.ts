export interface CategoryMap {
  id: string;
  name: string;
  children?: CategoryMap[];
}
