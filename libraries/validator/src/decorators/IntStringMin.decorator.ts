import { registerDecorator } from "class-validator";

export function IntStringMin(min: number): PropertyDecorator;
export function IntStringMin(min: number) {
  return (target: Object, key: string) => {
    return registerDecorator({
      name: "isIntString",
      target: target.constructor,
      propertyName: key,
      constraints: [min],
      options: {
        message: `${key} is not a int string`,
      },
      validator: {
        validate(value: unknown) {
          const isIntString = typeof value === "string" && Number.isInteger(parseInt(value));
          if (!isIntString) return false;
          return parseInt(value) >= min;
        },
      },
    });
  };
}
