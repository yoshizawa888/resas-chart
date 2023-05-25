export interface PrefectureData {
  year: number;
  value: number;
}

export interface Prefecture {
  name: string;
  data: PrefectureData[];
}

export interface DataObject {
  name: string;
  data: number[];
}
