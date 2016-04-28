angular.module("app", [])
  .factory("$formFactory", $formFactory)
  .controller("myCtrl", myCtrl);

  myCtrl.$inject = ["$formFactory", "$http"];


  function myCtrl($formFactory, $http){
    var vm = this;
    var result = $http.get('schemaForms.json').then(
      function(result){
        //success case
        var data = result.data["transferSchemas"];

        console.log("Data extraída");
        console.log(data);

        var form = $formFactory.init(data[1].schema);

        console.log("Formulario");
        console.log(form);


        var extendedForm = $formFactory.extendForm(data[1].schema);

        console.log("Formulario extendido");
        console.log(extendedForm);



      }, function(error){
        //error case
      }
    );


  }


  //factory
  function $formFactory(){
    var factory  = {
      init: function(schema) {
        var form = [];
        _.forEach(Object.keys(schema.properties), function(property) {
          form[property] = {};
        })
        return form;
      },
      extendForm: function(schema) {
        // Se inicializa un arreglo con las propiedades del schema
        var properties = factory.init(schema);

        //Se obtienen las propiedades que extienden el schema
        var schemaExtraProperties =  _.filter(Object.keys(schema), function(property) {
          return property.indexOf('x')!=-1;
        });

        //Se agregan las propiedades adicionales a los campos del schema
        _.each(schemaExtraProperties, function(property) {
          _.each(Object.keys(schema[property]), function(input, index) {
            properties[input][property.slice(2,property.length)] = schema[property][input];
          });
        });

        // Se arma el objeto form final, con el key y todas las propiedades adicionales de cada campo
        var form = [];
        _.each(Object.keys(properties), function(property, index) {
          var newProperty = {
            key: property,
            title: " "
          }
          _.each(Object.keys(properties[property]), function(extraProperty) {
            newProperty[extraProperty] = properties[property][extraProperty];
          });
          form.push(newProperty);
        })

        return  {
          model: {},
          schema: schema,
          form: form
        };
      },
      setForms: function(transfers) {
        /* Se asume que el modelo del formulario siempre se va a llamar 'model' */
        _.forEach(transfers, function(transfer, index) {
          // Esta función retorna un objeto con el schema, model y form
          var form = factory.extendForm(transfer.schema);
          //Se le coloca un nombre cualquiera para validarlo
          form['name'] = "form"+index;
          //Se sobreescribe el schema de cada transferencia con el nuevo schema que contiene el modelo y form
          transfer.schema = form;
        });
      }
    }
    return factory;
  }
