import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'xorConstraint', async: false })
export class OrConstraint implements ValidatorConstraintInterface {
  validate(propertyValue: string | number, args: ValidationArguments) {
    return !(
      (propertyValue === undefined || propertyValue === null) &&
      (args.object[args.constraints[0]] === undefined ||
        args.object[args.constraints[0]] === null)
    );
  }

  defaultMessage(args: ValidationArguments) {
    return `At least one field must be defined in the body`;
  }
}
