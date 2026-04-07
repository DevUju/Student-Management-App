import {
  IsString,
  IsEmail,
  IsInt,
  IsNumber,
  IsOptional,
  Min,
  Max,
  IsNotEmpty,
} from 'class-validator';
export class CreateStudentDto {
  @IsNotEmpty({ message: 'Name cannot be empty' })
  @IsString()
  name!: string;

  @IsEmail({}, { message: 'Please provide a valid email' })
  email!: string;

  @IsInt({ message: 'Age must be a whole number' })
  @Min(16, { message: 'Student must be at least 16 years old' })
  @Max(60, { message: 'Age seems too high — please check' })
  age!: number;

  @IsNotEmpty()
  @IsString()
  course!: string;

  @IsOptional()
  @IsNumber({}, { message: 'GPA must be a number' })
  @Min(0)
  @Max(5)
  gpa?: number; // the ? means this property is optional in TypeScript
}
