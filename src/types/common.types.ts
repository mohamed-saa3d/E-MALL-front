export type WithChildren<T extends object = object> = T & {
  children: React.ReactNode;
};