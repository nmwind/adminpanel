import { EntityEditMode } from "@common/behaviours/types/entity-edit-mode";

export interface EntityEditDialogConfig<IdType> {
    id?: IdType,
    mode: EntityEditMode,
}
