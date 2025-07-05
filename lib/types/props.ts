import {Control, FieldPath, FieldValues} from "react-hook-form";

export interface InputProps<T extends FieldValues> {
    control: any;
    name: FieldPath<T>;
    placeholder?: string;
    keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
}

export type FormProps<T extends FieldValues> = {
    control: Control<T>;
    onSubmit: (data: T) => void | Promise<void>;
    isSubmitting: boolean;
    handleSubmit: any;
};