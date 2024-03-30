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
import { ImageInfoModel } from "@api/models/image-info-model";
import { StorySlideModel } from '../story-slides/story-slide-model';


export interface StoryModel {
    /**
     * Идентификатор записи
     */
    id: string;
    /**
     * Заголовок записи
     */
    title: string;
    /**
     * Описание записи
     */
    description: string;
    /**
     * Идентификатор языка (модуль - Dictionaries.Language)
     */
    languageId: number;
    /**
     * Порядок следования записи
     */
    orderIndex: number;
    /**
     * Признак, что запись опубликована
     */
    isPublished: boolean;
    /**
     * Признак, что запись удалена
     */
    isDeleted: boolean;
    /**
     * Дата и время создания записи (UTC)
     */
    createdAt: string;
    /**
     * Дата и время обновления записи (UTC)
     */
    updatedAt: string;
    /**
     * Дата и время начала (UTC)
     */
    activityStart: string;
    /**
     * Дата и время завершения (UTC)
     */
    activityEnd?: string;

    image?: ImageInfoModel;

    slides?: Array<StorySlideModel>;
}

