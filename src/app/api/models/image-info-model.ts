/**
 * DTO - информация об изображении
 */
export interface ImageInfoModel {
    /**
     * Тип изображения
     */
    contentType?: string;
    /**
     * URL изображения
     */
    url: string;
    /**
     * Ширина изображения (px)
     */
    width?: number;
    /**
     * Высота изображения (px)
     */
    height?: number;
    /**
     * Размер файла изображения в байтах
     */
    size: number;
    /**
     * Дата и время создания изображения (UTC)
     */
    createdAt?: Date;
    /**
     * Дата и время последней модификации изображения (UTC)
     */
    updatedAt?: Date;
}

