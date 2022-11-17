import { createServer, Model } from 'miragejs';

export function makeServer({ environment = 'test' } = {} ) {

  //seeds(server) { ... } is an function that we implement in-line and pass to createServer
  // instanitate 3 'note' objects, shaped like { title: '...' , body: '...'}
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

  // models: { .... } is how we define the schema of our mock key-value database used by mirage
  // here we are defining a collection called 'notes'
  // each collection is a seperate database
  const models = {
    notes: Model,
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
      this.namespace = 'api/notes';
  
      //define the method and url for each endpoint
      this.get('/', (schema, request) => {
        return schema.notes.all();
      });
  
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
  
      // ... end of routes()
    },
    //..... more params to createServer here
  })

  console.log("serber obj: ", server)


  return server;
}