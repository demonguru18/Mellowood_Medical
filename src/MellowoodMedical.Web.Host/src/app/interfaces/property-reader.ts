export interface PropertyReader {
    callRefresh<T>(): void,
    close<T>(): void,
   
}
