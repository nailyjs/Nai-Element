import { registerDecorator } from "class-validator";

/**
 * MaxPoint decorator. Check if the number of decimal places is less than the specified value.
 *
 * @author Zero <gczgroup@qq.com>
 * @date 2024/01/14
 * @export
 * @param {number} maxPoint
 * @return {*}  {PropertyDecorator}
 */
export function MaxPoint(maxPoint: number): PropertyDecorator;
export function MaxPoint(maxPoint: number) {
  return (target: Object, propertyKey: string) => {
    return registerDecorator({
      name: "maxPoint",
      target: target.constructor,
      propertyName: propertyKey,
      constraints: [maxPoint],
      options: {
        message: `${propertyKey} must be less than ${maxPoint} decimal places`,
      },
      validator: {
        validate(value) {
          if (typeof value !== "number") return false;
          const len = value.toString().split(".").pop().length;
          return len <= maxPoint;
        },
      },
    });
  };
}
