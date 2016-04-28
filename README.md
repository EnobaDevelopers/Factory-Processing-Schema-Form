#Factory para armar schemas y formalarios de "Angular schema form"

Este repositorio contiene un script cuyo propósito es armar formularios y schemas basados en la respuesta de los servicios relacionados con ["angular schema form"](http://schemaform.io/).

Un ejemplo de respuesta puede verse en: schemaForms.json

El contenido de una respuesta es como lo siguiente:
```
{
	"transferSchemas" : [
		{
			"categoryId" : "sameBank",
			"categoryDisplayName" : "Transferencia Mismo Banco",
			"schema": {
				"x-placeholder" : {
					"amount" : "Monto",
					"concept" : "Concepto"
				},
				"type": "object",
				"properties": {
					"amount": {
						"type": "number",
						"required": true
					},
					"concept": {
						"type": "string"
					}
				}
			}
		},
		{
			"categoryId": "wireTransfer",
			"categoryDisplayName" : "Pagos TDC",
			"schema" :  {
				"x-condition" : {
					"otherAmount" : "model.amount==-1"
				},
				"x-placeholder": {
					"otherAmount" : "Monto"
				},
				"x-type" : {
					"amount" : "radios"
				},
				"x-titleMap": {
					"amount" :  [
						{
							"value": 18300,
							"name": "Saldo Total - Bs. 18.300,00"
						},
						{
							"value": 1300,
							"name": "Saldo Mínimo - Bs. 1.300,00"
						},
						{
							"name" : "Otro Monto",
							"value": -1
						}
					]
				},
				"type": "object",
				"properties": {
					"amount": {
						"type": "radios",
						"default": 1300
					},
					"otherAmount": {
						"type" : "number",
						"required": true
					}
				}
			}
		}
	]
}
```
##Consideraciones

Note que hay claves que tienen como prefijo "x-" por ejemplo: ```"x-condition"```. Todas las claves cuyo prefijo sea ese, son propiedades que deben colocarse en el formulario cuando se esté armando. En otras palabras, el formulario se armará en base a estas propiedades con estas características específicas.

Tome en cuenta que este ejemplo está armado para una respuesta pensanda en el módulo de transferencias y pagos. Pero la lógica de procesamiento es la misma para las secciones donde deba usarse angular-schema-form
