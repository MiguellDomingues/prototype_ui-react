import { createServer, Model } from 'miragejs';

export function makeServer({ environment = 'test' } = {} ) {

  //seeds(server) { ... } is an function that we implement in-line and pass to createServer
  // instanitate 3 'note' objects, shaped like { title: '...' , body: '...'}
  const seeds = (server) => {

    ////////////////////////////////////APPOINTMENTS key/values//////////////////////////////////////

    server.create('appointment', {
      id: 0, loc_id: "0", date: "10/10/22", start: "9:00", end: "10:00"
    });

    server.create('appointment', {
      id: 1, loc_id: "0", date: "10/11/22", start: "11:00", end: "12:00"
    });

    server.create('appointment', {
      id: 2, loc_id: "1", date: "10/11/22", start: "8:00", end: "9:00"
    });

    ////////////////////////////////////POST (LOCATIONS) key/values/////////////////////////////
  
    // .create( name of object 'name', obj shape)
    server.create('post', {
      id: 0,
      address: "abc ave 123456",
      LatLng: { lat: 43.919617760254686, lng: -0.8844604492},
      info: "some info stuffs 0",
      icons: ["FaWrench", "FaOilCan", "FaCarBattery", "GiMechanicGarage"],
    });

    server.create('post', {
      id: 1,
      address: "abcd ave 123456",
      LatLng: { lat: 47.919617760254686, lng: -0.7844604492},
      info: "some info stuffs 1",
      icons: ["MdLocalCarWash", "MdOutlineCarRepair", "GiMechanicGarage", "FaCarBattery"],
    });

    server.create('post', {
      id: 2,
      address: "abcdef ave 123456",
      LatLng: { lat: 50.919617760254686, lng: -0.7844604492},
      info: "some info stuffs 2",
      icons: ["MdOutlineCarRepair", "GiMechanicGarage", "FaWrench"], 
    });

    ///////////////////////////////////USER key/values///////////////////////////////////

    server.create('user', {
      id: 1,
      type: "user",
      user_name: "a",
      password: "a"
    });

    server.create('user', {
      id: 2,
      type: "user",
      user_name: "b",
      password: "b"
    });

    //... end of seeds()
  };

  // models: { .... } is how we define the schema of our mock key-value database used by mirage
  // here we are defining a collection called 'posts'
  // each collection is a seperate database (or table?)
  const models = {
    posts: Model,
    appointments: Model,
    users: Model
  }

  /*
  API for createServer func
  - the input is an object containing a variable number of keys:
    {enviroment, models, seeds(), routes()}
  */

  let server = createServer({

    environment,
    models,
    //seeds was defined earlier 
    seeds,
    //routes() { ... } is another function that we define which builds the http endpoints
    //passed to createServer
    
    routes(){

      //define the domain url
      this.namespace = 'api';

      console.log("inside routes():", this)
  
      //definition for /guest endpoint
      this.get('posts/guest', (schema, request) => {
        return schema.posts.all();
      });

      //definition for /user endpoint
      this.get('posts/user', (schema, request) => {
        console.log("miragejs: user EP")

        let response = {                                              // ..init a response object
          posts: [],
        }
        
        schema.posts.all().models.forEach((post)=>{                   //for each post in model 'posts'...

          const loc_id = post.attrs.id                                //.... get the id
          let location_appointments = []

          schema.appointments.all().models.forEach((appointment)=>{   //...for each appointment in model 'appointments'

              const apt_loc_id = appointment.attrs.loc_id             //... get the related location id

              if(apt_loc_id === loc_id){                              //... if this appointment id contains a matching location id for this post..
                let copy_apt = { ...appointment.attrs }               //  ... copy the appointment object..
                delete copy_apt.loc_id                                //  ... remove the related location id             
                location_appointments.push(copy_apt)                  //  .. add the copied appointment to a new list
              }
          });

          post.attrs.appointments = location_appointments             // ..add the related appointments to this post
          response.posts.push(post)                                   // ... add the post to the response object
        });

        //'debugger' statement will actually cause chrome dev tools to halt execution on this line
        //debugger

        console.log("response: ", response)
        return response;                                              // ... return the arr of posts with each post containing an arr of related appointments
      });

      //definition for authentication endpoint
      this.post('authenticate', (schema, request) => {

        let attrs = JSON.parse(request.requestBody);                   // parse the user name/pw from request into an object

        const request_user_name = attrs.user_name                      // add user name/pw into seperate consts
        const request_password = attrs.password

        let response = {                                              // ..init a response object that defaults to failure
          success: false,
          type: '',
          key: '',
          path: '',
        }

        // only a single match should be found so we should early-return from this function when a match is found
        // however we cant because forEach(..) takes an anonymous function, so every entry ends up getting checked
        // the users Model should have a unique string for the user name, anyways

        schema.users.all().models.forEach((user)=>{                  //iterate each entry in the 'users' model

          if( (user.attrs.user_name === request_user_name) && 
              (user.attrs.password === request_password) ){          //if there is a matching user name/pw...
                response.success = true;                             // ..update the response object with relevant info based on user type
                response.type = 'user'
                response.key = '2342fddddd2f1d131rf12'
                response.path = '/user/'
          }
         
        });

        return response
      });

      //definition for createUser endpoint
      this.post('createUser', (schema, request) => {

        let attrs = JSON.parse(request.requestBody);

        const user_name = attrs.user_name                      // add username into seperate const
       
        console.log("----------SERVER: CREATE USER-------------")
        console.log("attrs: ", attrs)

        let duplicate_username = false;

        // using .every() instead of .forEach() allows us to break out of the loop early by returning false
        schema.users.all().models.every( (user)=>{ 
          if (user_name === user.attrs.user_name){                        //..check for duplicate user_name in the users Model
            duplicate_username = true
            return false                                                  //.. and break out of the loop (every)
          }
          return true 
        });

        const response = {}

        if(!duplicate_username){                                // ...if the user name is not a duplicate
          console.log("creating new user: ", user_name)

          const new_user ={                                      //.. create a new entry to be inserted to users Model
            user_name: user_name,
            password: attrs.password,
            type: attrs.type
          }

          schema.users.create(new_user);                        

          response.success = true;                             // ...and create the response object which routes user to the correct page (w/ api key)
          response.type = 'user'
          response.key = '2342fddddd2f1d131rf12'
          response.path = '/user/'

        }else{
          response.success = false                             // ..if the name is a dupe, create a failure response object
          response.reason = 'duplicate user name'
        }

        return response;
      });
  
      // ... end of routes()
    },
    //..... more params to createServer here
  })

  console.log("serber obj: ", server)


  return server;
}