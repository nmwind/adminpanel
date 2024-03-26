export interface PageResult<T> {
    /**
     * Список записей ограниченный фильтром и pageSize
     */
    items: Array<T>;
    /**
     * Количество записей в БД с учётом указанных в запросе фильтров
     */
    total: number;
}
