export interface TreeObj {
    name: string;
    parent: string | null;
    children?: TreeObj[];
}
