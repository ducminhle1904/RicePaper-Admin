export interface RowData {
    id: string;
    name: string;
    stock: string;
    sold: string;
    price: string;
}

export type authContextType = {
    user: boolean | null;
    loading: boolean;
    isAuthenticated: boolean;
    login: (username: string, password: string) => void;
    logout: () => void;
};
