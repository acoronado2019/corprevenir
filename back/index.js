const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: '10mb' }))
const multer = require('multer');
const fs = require("fs");
const fastcsv = require("fast-csv");
const { Console } = require('console')

const storage = multer.diskStorage({
	destination: 'uploads/',
	filename: function(req, file, cb){
		cb("", "cargue.csv");
	}
})
const upload = multer({
	storage: storage
})

const credentials = {
	host: 'localhost',
	user: 'root',
	password: 'M87eMhS-r#JL]#CE',
	database: 'dbpuntosdorados'
}

app.get('/', (req, res) => {
	res.send('hola desde tu primera ruta de la Api')
})


app.post('/api/cargue', upload.single('file') , (req, res) => {
let stream = fs.createReadStream("uploads/cargue.csv");
let csvData = [];
let csvStream = fastcsv
  .parse()
  .on("data", function(data) {
    csvData.push(data);
  })
  .on("end", function() {
	  console.log(csvData);
    // remove the first line: header
    csvData.shift();
    // connect to the MySQL database
	var connection = mysql.createConnection(credentials)
    connection.connect(error => {
		if (error) {
		  console.error(error);
		} else {
		  let query =
		  "REPLACE INTO dbpuntosdorados.resultado (cedula, nombre, cargo, empresa, email, perfil, item, anno, trimestre, fecha_cargue, puntos ) VALUES ? ";
		  connection.query(query, [csvData], (error, response) => {
			if (error) {
				console.error(err)
			} 
		  });
		}
	  });
  });
stream.pipe(csvStream);
connection.end()
})

app.post('/api/carguePersonas', upload.single('file') , (req, res) => {
	console.log("llega persona")
	let stream = fs.createReadStream("uploads/cargue.csv");
	let csvData = [];
	let csvStream = fastcsv
	  .parse()
	  .on("data", function(data) {
		csvData.push(data);
	  })
	  .on("end", function() {
		  console.log(csvData);
		// remove the first line: header
		csvData.shift();
		// connect to the MySQL database
		var connection = mysql.createConnection(credentials)
		connection.connect(error => {
			if (error) {
			  console.error(error);
			
			} else {
			  let query =
			  "INSERT IGNORE INTO dbpuntosdorados.persona (numero_empleado, codigo_compania, nombre_compania, nombre_completo, cargo, subdivision_personal, ceco, cdco_descripcion, identificacion, clase_nomina, nombre_vicepresidencia, nombre_area_funcional, clasificacion) VALUES ?";
			  connection.query(query, [csvData], (err, result) => {
				if (err) {
					console.error(err)
				} 
			  });

			  let queryUser =
			  "INSERT INTO dbpuntosdorados.user (idpersona, name, password, rol_id) SELECT idpersona, identificacion, identificacion as password, IF(clasificacion = 'Conductor', 3, 2) as rol_id FROM dbpuntosdorados.persona ON DUPLICATE KEY UPDATE password = identificacion";
			  connection.query(queryUser, (err, result) => {
				if (err) {
					console.error(err)
				} 
			  });

			}
		  });
	  });
	stream.pipe(csvStream);
	connection.end()
	})

app.post('/api/login', (req, res) => {
	const { username, password } = req.body
	const values = [username, password]
	var connection = mysql.createConnection(credentials)
	const query = `SELECT u.*, r.name as rol, r.idRol as idRol, r.description as rol_description, persona.nombre_completo as nombre_completo
						FROM user as u
						INNER JOIN rol as r
						on u.rol_id = r.idRol
						INNER JOIN persona as persona
						on u.idPersona = persona.idPersona
						WHERE u.name = ? AND u.password = ?`
	connection.query(query, values, (err, result) => {
		if (err) {
			res.status(500).send(err)
		} else {
			if (result.length > 0) {
				delete result[0].password
				res.status(200).send(result[0])
			} else {
				res.status(400).send('Usuario no existe')
			}
		}
	})
	connection.end()
})

app.post('/api/updatePassword', (req, res) => {
	const { username, password, newPassword } = req.body
	const values = [newPassword, username, password]
	var connection = mysql.createConnection(credentials);
	const query = `UPDATE dbpuntosdorados.user as u set u.password= ? 
									WHERE u.name = ? AND u.password = ?`
	connection.query(query, values, (err, result) => {
		if (err) {
			res.status(500).send(err)
		} else {
			
				res.status(200).send('Contraseña Cambiada')
			
		}
	})
	connection.end()
})

app.get('/api/resultado/:id', (req, res) => {

	const idPersonar = req.params.id
	const idPersona = idPersonar.substring(0, idPersonar.length - 1);
	//const idRolr = req.params.idRol
	const idRol = idPersonar.substr(-1);
console.log("idRol" + idRol)
console.log("idPersona" + idPersona)
	//params query person
	const paramQueryPersona = [idPersona]
	let  query 

	//resultQueryPersona = connection.query("SELECT identificacion FROM dbpuntosdorados.persona WHERE idpersona = ?", paramQueryPersona, (err, result) => {


 // connection DB
	const connection = mysql.createConnection(credentials)

	if(idRol==="2"){
		query = 	`select r.* , i.descripcion as item from dbpuntosdorados.persona as p
									inner join dbpuntosdorados.resultado as r
									on r.cedula = p.identificacion
									inner join dbpuntosdorados.item i on r.item = i.iditem
                                    inner join dbpuntosdorados.user us on us.idpersona = p.idpersona
									where p.idpersona = ?  and i.iditem in (7,3,4,6)`
	}
	else
	{
		query = `select r.* , i.descripcion as item
									from dbpuntosdorados.persona as p
									inner join dbpuntosdorados.resultado as r
									on r.cedula = p.identificacion
									inner join item i on r.item = i.iditem
									where p.idpersona = ?`
	}

	

	connection.query(query, paramQueryPersona, (err, result) => {
		if (err) {
			res.status(500).send(err)
		} else {
			if (result.length > 0) {
				console.log(result[0])
				res.status(200).send(result)
			} else {
				res.status(404).send('Usuario no existe')
			}
		}
	})

	connection.end()
})

app.listen(4000, () => console.log('Servidor Arriba'))
