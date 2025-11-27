import { Type } from '@nestjs/common';
import { PartialType, PickType } from '@nestjs/swagger';
import { DirectoryObject } from '@/model/abstract/directory-object.abstract';

export function createDirectoryCreateDto<TBase extends Type<DirectoryObject>>(
  DirectoryClass: TBase,
) {
  // локальный класс, но с нормальной Swagger-схемой
  class BaseCreateDto extends PickType(DirectoryClass, [
    'parent',
    'code',
    'name',
    'description',
    'color',
    'byDefault'
  ] as const) {}
  
  return BaseCreateDto;
}

export function createDirectoryUpdateDto<TCreateDto extends Type<any>>(
  CreateDtoClass: TCreateDto,
) {
  class BaseUpdateDto extends PartialType(CreateDtoClass) {}
  return BaseUpdateDto;
}
