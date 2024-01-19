import { registerDecorator } from "class-validator";

export function IsIntStringOrIntStringArray(): PropertyDecorator;
export function IsIntStringOrIntStringArray() {
  return (target: Object, key: string) => {
    return registerDecorator({
      name: "isIntStringOrIntStringArray",
      target: target.constructor,
      propertyName: key,
      options: {
        message: `${key} is not a Int or Int array!`,
      },
      validator: {
        validate(value: unknown) {
          if (typeof value === "number") return true;
          if (typeof value === "string" && Number.isInteger(parseInt(value))) return true;
          if (Array.isArray(value) && value.every((item) => typeof item === "number")) return true;
          if (Array.isArray(value) && value.every((item) => typeof item === "string" && Number.isInteger(parseInt(item)))) return true;
          return false;
        },
      },
    });
  };
}
