export interface PrefectureData {
  year: number;
  value: number;
}

export interface Prefecture {
  name: string;
  data: PrefectureData[];
  value: string;
}

export interface DataObject {
  name: string;
  data: number[];
}
