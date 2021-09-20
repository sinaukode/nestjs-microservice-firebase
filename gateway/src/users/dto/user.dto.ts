
import {IsEmail, IsNotEmpty, IsString, MinLength} from 'class-validator';

export class UserDTO {
 

  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  displayName: string;


  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;


   @IsString()
   @MinLength(6)
   @IsNotEmpty()
   password: string;


  @IsString()
  @MinLength(4)
  @IsNotEmpty()
   role: string;

}
