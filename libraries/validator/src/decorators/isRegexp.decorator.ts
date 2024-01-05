import { registerDecorator } from "class-validator";

export function IsRegExp(reg: RegExp): PropertyDecorator;
export function IsRegExp(reg: RegExp) {
  return (target: Object, key: string) => {
    return registerDecorator({
      name: "isRegExp",
      target: target.constructor,
      propertyName: key,
      constraints: [reg],
      options: {
        message: `${key} must be a valid regular expression`,
      },
      validator: {
        validate(value: unknown) {
          return reg.test(String(value));
        },
      },
    });
  };
}
