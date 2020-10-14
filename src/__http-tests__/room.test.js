const { expect } = require('chai')
const axios = require('axios')

describe('Room controller', function() {
    axios.defaults.baseURL = 'https://aw1.automationintesting.online'

	it('POST, GET /room create room and assert it has been created', async function() {

        var credentials = { "username": "admin", "password": "password"}
        //auth
        var authTokenResponse = await axios.post('/auth/login/', credentials)
          .catch(error => {
            console.log(error)
          })
        expect(authTokenResponse.status).to.eq(200);
        var token = authTokenResponse.data.token

        //create room
        const options = { 
            headers: {'Cookie': `token=${token}`}
        };

        var newRoom = {
            "accessible": true,
            "description": "a newly created room through api",
            "features": [
              "TV",
              "Air Conditioning"
            ],
            "image": "some image link",
            "roomNumber": 888,
            "roomPrice": 125,
            "type": "Family"
          }
  
        var postResponse = await axios.post('/room/', newRoom, options)
    
        expect(postResponse.status).to.eq(201);

        var expectedRoomId = postResponse.data.roomid

        //fetch room and assert
        var getResponse = await axios.get(`/room/${expectedRoomId}/`)
        var expectedRoom = newRoom
        expectedRoom['roomid'] = expectedRoomId

        expect(getResponse.status).to.eq(200);
        expect(getResponse.data).to.be.deep.equal(expectedRoom)        
    })    
})