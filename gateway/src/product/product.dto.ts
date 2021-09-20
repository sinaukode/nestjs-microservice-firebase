
import {IsEmail, IsNotEmpty, IsNumber, IsString, MinLength} from 'class-validator';

export class productDTO {
 

  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  product_name: string;


  @IsNumber()
  @IsNotEmpty()
  qty: number;


}
