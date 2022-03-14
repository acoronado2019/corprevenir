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
// const JWT = require('jsonwebtoken')
// const secretWord = 'Samus#Aran'

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
	user: 'conexion',
	password: 'Janda2022',
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
		  "INSERT INTO dbpuntosdorados.resultado (cedula, nombre, cargo, empresa, email, perfil, item, anno, trimestre, fecha_cargue, puntos ) VALUES ? ";
		  connection.query(query, [csvData], (error, response) => {
			console.log(error || response);
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
	const query = `SELECT u.*, r.name as rol, r.description as rol_description
									FROM user as u
									INNER JOIN rol as r
									on u.rol_id = r.idRol
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

	const idPersona = req.params.id

	//params query person
	const paramQueryPersona = [idPersona]
	let resultQueryPersona

 // connection DB
	const connection = mysql.createConnection(credentials)

	const query = `select r.* , i.descripcion as item
									from dbpuntosdorados.persona as p
									inner join dbpuntosdorados.resultado as r
									on r.cedula = p.identificacion
									inner join item i on r.item = i.iditem
									where p.idpersona = ?`

	//resultQueryPersona = connection.query("SELECT identificacion FROM dbpuntosdorados.persona WHERE idpersona = ?", paramQueryPersona, (err, result) => {
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
