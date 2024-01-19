import { registerDecorator } from "class-validator";

export function IsNumberOrNumberArray(): PropertyDecorator;
export function IsNumberOrNumberArray() {
  return (target: Object, key: string) => {
    return registerDecorator({
      name: "isNumberOrNumberArray",
      target: target.constructor,
      propertyName: key,
      options: {
        message: `${key} is not a number or number array!`,
      },
      validator: {
        validate(value: unknown) {
          return typeof value === "number" || (Array.isArray(value) && value.every((item) => typeof item === "number"));
        },
      },
    });
  };
}
