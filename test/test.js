var expect = require('expect');

describe('sample test', function () {
  this.timeout(3000);
  var dogs = 'the best';

  it('should pass', function (done) {
    setTimeout(function () {
      expect(dogs).toBe('the best');
      done();
    }, 1000)
  });
});
