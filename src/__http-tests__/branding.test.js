const { expect } = require('chai')
const axios = require('axios')

describe('Branding controller', function() {
    axios.defaults.baseURL = 'https://aw1.automationintesting.online'

	it('GET /branding', async function() {        
        var response = await axios.get('/branding')
        
        var expectedContact = {
            name: 'Shady Meadows B&B',
            address: 'The Old Farmhouse, Shady Street, Newfordburyshire, NE1 410S',
            phone: '012345678901',
            email: 'fake@fakeemail.com'
            }
        //console.log(response.data);
        expect(response).to.have.property('status', 200);
        expect(response.data.name).to.eq('Shady Meadows B&B');
        expect(response.data.contact).to.be.deep.equal(expectedContact);
        
	})

})

