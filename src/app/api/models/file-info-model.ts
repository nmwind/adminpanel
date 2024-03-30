/**
 * Technonicol.Check.AdminApi
 *  ### Пользовательские ограничения полей и ошибки  #### Ограничения полей - required - поле обязательно для заполнения; - omitempty - поле может быть не указано (не будет использоваться методом, в который было передано); - unique - уникальное значение поля; - min=N - поле должно быть не менее N символов; - max=N - поле должно быть не более N символов; - gte=N - числовое поле должно быть равно или более N; - lte=N - числовое поле должно быть равно или менее N; - enum - поле должно содержать одно из ENUM значений; - UUID - поле формата UUID; - pattern=P - поле должно соответствовать регулярному выражению P;  #### Ошибки - ErrVersionInvalid - если передаваемая версия объекта не совпала с текущей версией объекта.\\   Как правило, это означает, что объект был ранее изменён другим процессом; - ErrSwitchStatusRejected - перевод в указанный статус объекта отклонён.\\   WorkFlow объекта запрещает переключение в указанный статус;
 *
 * The version of the OpenAPI document: v1
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


/**
 * DTO - информация о файле
 */
export interface FileInfoModel {
    /**
     * Тип файла
     */
    contentType?: string;
    /**
     * URL файла
     */
    url: string;
    /**
     * Размер файла в байтах
     */
    size: number;
    /**
     * Дата и время создания файла (UTC)
     */
    createdAt?: string;
    /**
     * Дата и время последней модификации файла (UTC)
     */
    updatedAt?: string;
}

