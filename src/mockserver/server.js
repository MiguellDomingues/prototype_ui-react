import { createServer, Model } from 'miragejs';

export function makeServer({ environment = 'test' } = {} ) {

  //seeds(server) { ... } is an function that we implement in-line and pass to createServer
  // instanitate 3 'note' objects, shaped like { title: '...' , body: '...'}
  const seeds = (server) => {

    server.create('appointment', {
      id: 0, loc_id: "0", date: "10/10/22", start: "9:00", end: "10:00"
    });

    server.create('appointment', {
      id: 1, loc_id: "0", date: "10/11/22", start: "11:00", end: "12:00"
    });

    server.create('appointment', {
      id: 2, loc_id: "1", date: "10/11/22", start: "8:00", end: "9:00"
    });
  
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

    //... end of seeds()
  };

  /*
   const seeds = (server) => {
  
    // .create( name of object 'name', obj shape)
    server.create('note', {
      title: 'Nulla sit amet',
      body:
        'Praesent congue erat  lacus sit amet orci.',
    });

    server.create('note', {
      title: 'Curabitur suscipit suscipit',
      body:
        'Fusce risus nisl, vblandit viverra.',
    });

    server.create('note', {
      title: 'Donec id justo',
      body:
        'Nulla neque dolosque posuere.',
    });

    //... end of seeds()
  };
  */

  // models: { .... } is how we define the schema of our mock key-value database used by mirage
  // here we are defining a collection called 'posts'
  // each collection is a seperate database (or table?)
  const models = {
    posts: Model,
    appointments: Model
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
      this.namespace = 'api/posts';

      console.log("inside routes():", this)
  
      //definition for /guest endpoint
      this.get('/guest', (schema, request) => {
        return schema.posts.all();
      });

      //definition for /user endpoint
      this.get('/user', (schema, request) => {
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
  
      /*
      this.get('/:id', (schema, request) => {
        let id = request.params.id;
        return schema.notes.find(id);
      });
  
      this.post('/', (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        return schema.notes.create(attrs);
      });
  
      this.patch('/:id', (schema, request) => {
        let newAttrs = JSON.parse(request.requestBody);
        let id = request.params.id;
        let note = schema.notes.find(id);
        return note.update(newAttrs);
      });
  
      this.delete('/:id', (schema, request) => {
        let id = request.params.id;
        return schema.notes.find(id).destroy();
      });
      */
  
      // ... end of routes()
    },
    //..... more params to createServer here
  })

  console.log("serber obj: ", server)


  return server;
}