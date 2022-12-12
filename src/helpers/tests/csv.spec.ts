import { json2Csv } from '@/helpers';

describe('Csv helper', () => {
  describe('json2Csv', () => {
    it('should return only the columns when no data', () => {
      const columns = ['c1', 'c2', 'c3'];
      expect('"c1","c2","c3"').toEqual(json2Csv(columns, []));
    });

    it('should return columns and rows with only included data', () => {
      const columns = ['c1', 'c2', 'c3'];
      const data = [
        { c1: '1-1', c3: '1-3'},
        { c2: '2-2'},
        { c2: '3-2', c3: '3-3', c1: '3-1' },
        { c4: 9 }
      ];
      expect('"c1","c2","c3"\n' +
        '"1-1",,"1-3"\n' +
        ',"2-2",\n' +
        '"3-1","3-2","3-3"\n' +
        ',,').toEqual(json2Csv(columns, data));
    });

    it('should return columns with empty body when no match', () => {
      const columns = ['c1', 'c2', 'c3'];
      const data = [{ c4: 4 }, {c5: 5}];
      expect('"c1","c2","c3"\n' +
        ',,\n' +
        ',,').toEqual(json2Csv(columns, data));
    });

    it('should use custom values for separatos, undefined and null', () => {
      const columns = ['c1', 'c2', 'c3'];
      const data = [{ c3: 4 }, {c1: 5}, { c1: null, c2: '3-3'}];
      expect('"c1";"c2";"c3"\n' +
        'undef;undef;4\n' +
        '5;undef;undef\n' +
        'empty;"3-3";undef')
        .toEqual(json2Csv(columns, data, ';', {
          undefined: 'undef',
          null: 'empty',
      }))
    });
  });
});
