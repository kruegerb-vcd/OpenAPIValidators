const chai = require('chai');
const path = require('path');

const chaiResponseValidator = require('..');

const dirContainingApiSpec = path.resolve('../../commonTestResources/exampleOpenApiFiles/valid/bugRecreationTemplate');
const { expect } = chai;

describe('Recreate bug (issue #XX)', function () {
  before(function () {
    const pathToApiSpec = path.join(dirContainingApiSpec, 'openapi.yml');
    chai.use(chaiResponseValidator(pathToApiSpec));
  });

  const res = {
    status: 200,
    req: {
      method: 'GET',
      path: '/recreate/bug',
    },
    body: {
      expectedProperty1: 'foo',
    },
  };

  it('passes', function () {
    expect(res).to.satisfyApiSpec;
  });

  it('fails when using .not', function () {
    const assertion = () => expect(res).to.not.satisfyApiSpec;
    expect(assertion).to.throw();
  });
});
