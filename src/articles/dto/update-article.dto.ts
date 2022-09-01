import { IsNotEmpty } from 'class-validator';

export class UpdateArticleDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;
}
