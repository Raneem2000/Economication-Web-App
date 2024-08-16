export type TableColumn = {
  name: string;
  key: string;
};
export type TableRow = Record<string, any>;

export type card = {
  header?: TableColumn[];
  data?: TableRow[];
  ItemAdd?: string;
  limit?: number;
  page?: number;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
  setLimit?: React.Dispatch<React.SetStateAction<number>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  isLoading?: boolean;
  isSuccess?: boolean | undefined;
  totalPages?: number;
  isError: boolean;
};
export type BikeType = {
  large_img: string;
  title: string;
  description: string;
  date_stolen: number;
  stolen_location: string;
  location: string;
  date_reported: string;
};
