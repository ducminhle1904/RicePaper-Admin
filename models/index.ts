export interface RowData {
    id: string;
    productName: string;
    quantity: string;
    sold: string;
    price: string;
    productSku: string;
}

export type authContextType = {
    user: boolean | null;
    loading: boolean;
    isAuthenticated: boolean;
    login: (username: string, password: string) => void;
    logout: () => void;
};
