// GPT-4 indicated this was problematic and needs to transform the string to an array of strings.
import { IsArray } from 'class-validator';
import { Transform } from 'class-transformer';
import { stringToArrayTransformer } from '../../shared/utils';
export class CreateArticleDto {
  readonly title: string;
  readonly description: string;
  readonly body: string;
  @Transform(stringToArrayTransformer)
  @IsArray()
  readonly tagList: string[];
}
