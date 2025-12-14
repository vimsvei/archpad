import { toCamelCase, toPlural } from './naming.util';

describe('naming utils', () => {
  describe('toCamelCase', () => {
    it('преобразует snake_case в camelCase', () => {
      expect(toCamelCase('license_type')).toBe('licenseType');
      expect(toCamelCase('critical_level')).toBe('criticalLevel');
      expect(toCamelCase('map_application_component_data_object')).toBe(
        'mapApplicationComponentDataObject',
      );
    });

    it('оставляет уже camelCase как есть (но приведённый к нижнему)', () => {
      expect(toCamelCase('licenseType')).toBe('licenseType');
    });

    it('работает с _id окончанием', () => {
      expect(toCamelCase('license_type_id')).toBe('licenseTypeId');
    });
  });

  describe('toPlural', () => {
    it('простое окончание s', () => {
      expect(toPlural('component')).toBe('components');
      expect(toPlural('table')).toBe('tables');
    });

    it('окончание -y -> -ies', () => {
      expect(toPlural('category')).toBe('categories');
      expect(toPlural('entity')).toBe('entities');
    });

    it('окончание s/x/z/ch/sh -> es', () => {
      expect(toPlural('class')).toBe('classes');
      expect(toPlural('box')).toBe('boxes');
      expect(toPlural('watch')).toBe('watches');
    });
  });
});
