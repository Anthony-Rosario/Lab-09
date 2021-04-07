const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('Lab-09', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should create a strain', () => { 
    return request(app)
      .post('/api/v1/strains')
      .send({ 
        name: 'Afghan',
        genetics: 'Sativa',
        thc: '%24.08',
        cbd: '%2.4',
        effect: 'Cerebral/Uplifting',
        grow_climate: 'indoor'
     })
      .then((res) => { 
        expect(res.body).toEqual({ 
          id: '1',
          name: 'Afghan',
          genetics: 'Sativa',
          thc: '%24.08',
          cbd: '%2.4',
          effect: 'Cerebral/Uplifting',
          grow_climate: 'indoor'
       });
      });

  });
});

it('should retrieve all strains', async () => { 
  const res = await request(app)
    .get('/api/v1/strains')

    expect(res.body).toEqual([{ 
      id: '1',
      name: 'Afghan',
      genetics: 'Sativa',
      thc: '%24.08',
      cbd: '%2.4',
      effect: 'Cerebral/Uplifting',
      grow_climate: 'indoor'
    }]);
});

it('should get a strain by its id', async () => { 
  const expectation = {
    id: '1',
      name: 'Afghan',
      genetics: 'Sativa',
      thc: '%24.08',
      cbd: '%2.4',
      effect: 'Cerebral/Uplifting',
      grow_climate: 'indoor'
  };

  return request(app)
    .get('/api/v1/strains/1')
    .then((res) => {
      expect(res.body).toEqual(expectation)
    })

});

it('should update a strain', async () => {
   await request(app)
    .put('/api/v1/strains/1')
    .send({ 
    id: '1',
    name: 'Gumbo Kush',
    genetics: 'Sativa',
    thc: '%24.08',
    cbd: '%2.4',
    effect: 'Cerebral/Uplifting',
    grow_climate: 'indoor'});

  const result = await request(app)
    .get('/api/v1/strains/1');

    expect(result.body).toEqual({ 
      id: '1',
      name: 'Afghan',
      genetics: 'Sativa',
      thc: '%24.08',
      cbd: '%2.4',
      effect: 'Cerebral/Uplifting',
      grow_climate: 'indoor'
   })
})

it('should delete a strain', async () => { 
  const response = await request(app)
    .delete('/api/v1/strains/1')

    expect(response.body).toEqual({})
})