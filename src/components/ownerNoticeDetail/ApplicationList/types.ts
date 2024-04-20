export type TableDataType = {
  titles: string[];
  data: (string | undefined)[][];
};

export type ModalType = {
  type: 'none' | 'accept' | 'reject';
  onClick: () => void;
};
