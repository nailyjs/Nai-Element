import { registerDecorator } from "class-validator";

export function IsIntArray(): PropertyDecorator;
export function IsIntArray() {
  return (target: Object, key: string) => {
    return registerDecorator({
      name: "isIntArray",
      target: target.constructor,
      propertyName: key,
      options: {
        message: `${key} is not a int array`,
      },
      validator: {
        validate(value: unknown) {
          return (
            Array.isArray(value) && value.every((item) => typeof item === "number" || (typeof item === "string" && !Number.isInteger(parseInt(item))))
          );
        },
      },
    });
  };
}
