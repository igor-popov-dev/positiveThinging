import { psyhologyList as lists } from '../../data/lists/psyhologyList';
export interface HeaderProps {
    handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    currentList?: typeof lists[0];
    isRandomizeList: boolean;
    toggleRundomize: () => void;
};