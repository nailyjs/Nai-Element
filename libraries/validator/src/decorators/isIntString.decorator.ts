import { registerDecorator } from "class-validator";

export function IsIntString(): PropertyDecorator;
export function IsIntString() {
  return (target: Object, key: string) => {
    return registerDecorator({
      name: "isIntString",
      target: target.constructor,
      propertyName: key,
      options: {
        message: `${key} is not a int string`,
      },
      validator: {
        validate(value: unknown) {
          return typeof value === "string" && Number.isInteger(parseInt(value));
        },
      },
    });
  };
}
